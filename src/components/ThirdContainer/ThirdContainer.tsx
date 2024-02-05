import React from 'react';
import './ThirdContainer.css';
import TestingMenu from './testingMenu/TestingMenu';

const ThirdContainer = () => {
  return (
    <div className="third-container">
      <div className='header1Image'></div>
      <div className='header5Image'></div>
      <h1>Teste alguns dos meus produtos:</h1>
      <TestingMenu />
    </div>
  );
};

export default ThirdContainer;