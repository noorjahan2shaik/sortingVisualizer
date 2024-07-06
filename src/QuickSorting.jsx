import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

const quickSort = (array) => {
  const animations = [];
  let auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return { animations, sortedArray: auxiliaryArray };
};

const quickSortHelper = (array, startIdx, endIdx, animations) => {
  if (startIdx < endIdx) {
    let partitionIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, partitionIdx - 1, animations);
    quickSortHelper(array, partitionIdx + 1, endIdx, animations);
  }
};

const partition = (array, startIdx, endIdx, animations) => {
  let pivot = array[endIdx];
  let partitionIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx]); // Marking comparison
    if (array[i] <= pivot) {
      animations.push([i, partitionIdx]); // Marking swap
      [array[i], array[partitionIdx]] = [array[partitionIdx], array[i]];
      partitionIdx++;
    }
  }
  animations.push([partitionIdx, endIdx]); // Marking final swap
  [array[partitionIdx], array[endIdx]] = [array[endIdx], array[partitionIdx]];
  return partitionIdx;
};

const QuickSorting = () => {
  const [array, setArray] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [arraySize, setArraySize] = useState(10);
  const [sortTime, setSortTime] = useState(null);
  const [barWidth, setBarWidth] = useState(35);
  const [barValue, setBarValue] = useState();

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
      setBarValue(12);
    } else {
      setBarWidth(35);
      setBarValue(17);
    }
  }, [arraySize]);

  const animateQuickSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const { animations, sortedArray } = quickSort(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [idx1, idx2] = animations[i];
      const barOneStyle = arrayBars[idx1].style;
      const barTwoStyle = arrayBars[idx2].style;
      setTimeout(() => {
        [barOneStyle.height, barTwoStyle.height] = [`${sortedArray[idx2]}px`, `${sortedArray[idx1]}px`];
        if (i === animations.length - 1) {
          setArray(sortedArray);
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
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateQuickSort}>Quick Sort</button>
        <h3 style={{ color: 'white', fontWeight: '400', fontSize: '20px' }}>Time taken to sort: </h3>
        {sortTime !== null && <div style={{ height: '40px', width: '30', marginBottom: '25px', backgroundColor: 'rgb(3, 95, 95)', borderRadius: '10px', fontWeight: '500', color: 'white', textAlign: 'center' }}>Time: {sortTime.toFixed(2)} ms</div>}
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px`, width: `${barWidth}px` }}>
            <p className='bar-value' style={{ height: `${value}px`, width: `${barWidth}px`, fontSize: `${barValue}px` }}>{value}</p>
            <p className='bar-idx'>{idx}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSorting;