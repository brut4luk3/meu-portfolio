import React from 'react';
import './SecondaryContainer.css';
import WordCloudComponent from '../anims/TypingAnimStacks';

const SecondaryContainer = () => {
  return (
    <div className="secondary-container">
      <div className="stacks">
        <div className='cloud1'></div>
        <div className='cloud2'></div>
        <div className='cloud3'></div>
        <h1>Stacks</h1>
        <WordCloudComponent />
      </div>
    </div>
  );
};

export default SecondaryContainer;