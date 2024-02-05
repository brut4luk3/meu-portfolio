import React from 'react';
import './SecondaryContainer.css';
import WordCloudComponent from '../anims/WordCloud';

const SecondaryContainer = () => {
  return (
    <div className="secondary-container">
      <div className="stacks">
        <h1>Stacks</h1>
        <WordCloudComponent />
      </div>
    </div>
  );
};

export default SecondaryContainer;