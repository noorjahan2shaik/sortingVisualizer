import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

// Function to get the digit at a specific position in a number
const getDigit = (num, place) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;

// Function to count the number of digits in the largest number in the array
const digitCount = (num) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

// Function to get the number of digits in the largest number in the array
const mostDigits = (nums) => {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
};

const radixSort = (array) => {
  const animations = [];
  const maxDigitCount = mostDigits(array);
  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < array.length; i++) {
      const digit = getDigit(array[i], k);
      digitBuckets[digit].push(array[i]);
    }
    array = [].concat(...digitBuckets);
    animations.push(array.slice()); // Store intermediate steps for visualization
  }
  return { animations, sortedArray: array };
};

const RadixSorting = () => {
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

  const animateRadixSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const { animations, sortedArray } = radixSort(array);

    for (let i = 0; i < animations.length; i++) {
      const currentArray = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let j = 0; j < currentArray.length; j++) {
        const barStyle = arrayBars[j].style;
        setTimeout(() => {
          barStyle.height = `${currentArray[j]}px`;
          if (i === animations.length - 1 && j === currentArray.length - 1) {
            setArray(sortedArray);
            setSorted(true);
            const endTime = performance.now();
            setSortTime(endTime - startTime);
          }
        }, i * 10); // Adjust the delay as needed
      }
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
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateRadixSort}>Radix Sort</button>

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

export default RadixSorting;

