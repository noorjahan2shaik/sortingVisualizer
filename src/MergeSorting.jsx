import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

const mergeSort = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return { animations, sortedArray: array };
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const merge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // Comparing indices for animation
    animations.push([i, j]);
    // Comparing values for animation
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
};

const MergeSorting = () => {
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

  const animateMergeSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const { animations, sortedArray } = mergeSort(array);

    for (let i = 0; i < animations.length; i++) {
      const [idx1, idx2] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      const barStyle = arrayBars[idx1].style;
      setTimeout(() => {
        barStyle.height = `${idx2}px`;
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
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateMergeSort}>Merge Sort</button>
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

export default MergeSorting;
