import React, { useState } from 'react';
import BubbleSorting from './BubbleSorting'; // Import your sorting algorithm components
import InsertionSorting from './InsertionSorting';
import SelectionSorting from './SelectionSorting';
import QuickSorting from './QuickSorting';
import MergeSorting from './MergeSorting';
import RadixSorting from './RadixSorting';
import CountSorting from './CountSorting';
import './HomePage.css'
// Import other sorting algorithm components
const HomePage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const renderAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return <BubbleSorting />;
      case 'insertion':
        return <InsertionSorting />;
      case 'selection':
        return <SelectionSorting />;
      case 'quick':
        return <QuickSorting/>;
      case 'merge':
        return<MergeSorting/>;
      case 'radix':
        return <RadixSorting/>;
      case 'count':
        return <CountSorting/>;
      // Render other sorting algorithm components
      default:
        return <div>Please select a sorting algorithm</div>;
    }
  };

  return (
    <div>
      <h2>Sorting Algorithms</h2>
      <div className="container" style={{display: 'flex',flexDirection:'row'}}>
        <button onClick={() => setSelectedAlgorithm('bubble')}>Bubble Sort</button>
        <button onClick={() => setSelectedAlgorithm('insertion')}>Insertion Sort</button>
        <button onClick={() => setSelectedAlgorithm('selection')}>Selection Sort</button>
        <button onClick={() => setSelectedAlgorithm('quick')}>Quick Sort</button>
        <button onClick={() => setSelectedAlgorithm('merge')}>Merge Sort</button>
        <button onClick={() => setSelectedAlgorithm('radix')}>Radix Sort</button>
        <button onClick={() => setSelectedAlgorithm('count')}>Count Sort</button>
        {/* Add buttons for other sorting algorithms */}
      </div>
      {renderAlgorithm(selectedAlgorithm)}
    </div>
  );
};

export default HomePage;
