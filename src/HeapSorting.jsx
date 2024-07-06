import React, { useState, useEffect } from 'react';
import './BubbleSorting.css';

const heapSort = (array) => {
  const animations = [];
  buildMaxHeap(array, animations);
  let n = array.length;
  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]);
    [array[0], array[i]] = [array[i], array[0]];
    n--;
    maxHeapify(array, 0, n, animations);
  }
  return { animations, sortedArray: array };
};

const buildMaxHeap = (array, animations) => {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxHeapify(array, i, n, animations);
  }
};

const maxHeapify = (array, i, heapSize, animations) => {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]);
    [array[i], array[largest]] = [array[largest], array[i]];
    maxHeapify(array, largest, heapSize, animations);
  }
};

const HeapSorting = () => {
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

  const animateHeapSort = async () => {
    if (sorted) {
      alert("Array is sorted!");
      return;
    }
    const startTime = performance.now();
    const { animations, sortedArray } = heapSort(array);

    for (let i = 0; i < animations.length; i++) {
      const [idx1, idx2] = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      const barStyle1 = arrayBars[idx1].style;
      const barStyle2 = arrayBars[idx2].style;
      const barValue1 = arrayBars[idx1].getElementsByClassName('bar-value')[0];
      const barValue2 = arrayBars[idx2].getElementsByClassName('bar-value')[0];
      const value1 = parseInt(barValue1.innerHTML);
      const value2 = parseInt(barValue2.innerHTML);
      setTimeout(() => {
        [barStyle1.height, barStyle2.height] = [barStyle2.height, barStyle1.height];
        barValue1.innerHTML = value2;
        barValue2.innerHTML = value1;
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
        <button style={{ backgroundColor: 'rgb(3, 95, 95)', marginBottom: '5px' }} onClick={animateHeapSort}>Heap Sort</button>
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
    
    export default HeapSorting;