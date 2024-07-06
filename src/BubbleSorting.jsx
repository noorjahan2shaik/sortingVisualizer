import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

const bubbleSort = (array) => {
  const animations = [];
  let auxiliaryArray = array.slice();
  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, j + 1]);
        [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
      }
    }
  }
  return { animations, sortedArray: auxiliaryArray };
};

const BubbleSorting = () => {
  const [array, setArray] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [arraySize, setArraySize] = useState(10);
  const [sortTime, setSortTime] = useState(null);
  const [barWidth, setBarWidth] = useState(35);
  const [barValueFontSize, setBarValueFontSize] = useState(17);

  useEffect(() => {
    resetArray();
  }, []);

  const handleSizeChange = (event) => {
    setArraySize(Number(event.target.value));
  };

  const resetArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 400));
    setArray(newArray);
    setSorted(false);
    setSortTime(0);
  };

  useEffect(() => {
    if (arraySize > 23) {
      setBarWidth(10);
      setBarValueFontSize(12);
    } else {
      setBarWidth(35);
      setBarValueFontSize(17);
    }
  }, [arraySize]);

  const animateBubbleSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const { animations, sortedArray } = bubbleSort(array);
  
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const barOneValueElement = arrayBars[barOneIdx].getElementsByClassName('bar-value')[0];
      const barTwoValueElement = arrayBars[barTwoIdx].getElementsByClassName('bar-value')[0];
      setTimeout(() => {
        [barOneStyle.height, barTwoStyle.height] = [barTwoStyle.height, barOneStyle.height];
        [barOneValueElement.innerHTML, barTwoValueElement.innerHTML] = [barTwoValueElement.innerHTML, barOneValueElement.innerHTML];
        if (i === animations.length - 1) {
          setSorted(true);
          const endTime = performance.now();
          setSortTime(endTime - startTime);
        }
      }, i * 10); // Adjust the delay as needed
    }
  };
  

  return (
    <div className='container'>
      <div className='buttons'>
        <label htmlFor="arraySize" style={{ color: 'white', fontWeight: '500', fontSize: '20px' }}>Enter Array Size:</label>
        <input
          type="number"
          id="arraySize"
          value={arraySize}
          onChange={handleSizeChange}
          placeholder="Enter the size of an array..."
          min="1"
          style={{ margin: '10px', marginBottom: '25px', border: 'solid', color: 'white', width: '180px', height: '30px', borderRadius: '5px', borderWidth: '2px', backgroundColor: 'rgb(3, 95, 95)' }}
        />
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '25px' }} onClick={resetArray}>Generate New Array</button>
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateBubbleSort}>Bubble Sort</button>
        <h3 style={{ color: 'white', fontWeight: '400', fontSize: '20px' }}>Time taken to sort: </h3>
        {sortTime !== null && <div style={{ height: '40px', width: '30', marginBottom: '25px', backgroundColor: 'rgb(3, 95, 95)', borderRadius: '10px', fontWeight: '500', color: 'white', textAlign: 'center' }}>Time: {sortTime.toFixed(2)} ms</div>}
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px`, width: `${barWidth}px`, position: 'relative' }}>
            <p className='bar-value' style={{ fontSize: `${barValueFontSize}px`, position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -100%)', color: 'white' }}>{value}</p>
            <p className='bar-idx' style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translate(-50%, 0)', color: 'white' }}>{idx}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSorting;
