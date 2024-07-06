import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

const countSort = (array, max) => {
  const count = Array(max + 1).fill(0);
  const sortedArray = Array(array.length);
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
  }
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) {
    sortedArray[count[array[i]] - 1] = array[i];
    count[array[i]]--;
  }
  return sortedArray;
};

const CountSorting = () => {
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

  const animateCountSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const max = Math.max(...array);
    const sortedArray = countSort(array, max);
    const endTime = performance.now();
    setSortTime(endTime - startTime);
    setArray(sortedArray);
    setSorted(true);
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
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateCountSort}>Count Sort</button>
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

export default CountSorting;
