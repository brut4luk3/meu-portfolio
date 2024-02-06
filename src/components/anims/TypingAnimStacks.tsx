import React, { useState, useEffect } from 'react';
import './TypingAnimStacks.css';

const stacksList = [
  'Flutter', 'Django', 'Bootstrap', 'Flask API', 'Java',
  'JavaScript', 'Typescript', 'React.js', 'Docker', 'AWS',
  'Automated Tests', 'Selenium', 'SQL', 'Tesseract OCR', 'Git', 'Github',
];

const TypingAnimStacks = () => {
  const [visibleStacks, setVisibleStacks] = useState<string[]>([]);
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    if (currentStackIndex < stacksList.length) {
      const currentStack = stacksList[currentStackIndex];
      if (currentLetterIndex <= currentStack.length) {
        const timeoutId = setTimeout(() => {
          setVisibleStacks(stacks => [...stacks.slice(0, currentStackIndex), currentStack.slice(0, currentLetterIndex + 1)]);
          setCurrentLetterIndex(currentLetterIndex + 1);
        }, 50);
        return () => clearTimeout(timeoutId);
      } else {
        setCurrentStackIndex(currentStackIndex + 1);
        setCurrentLetterIndex(0);
      }
    }
  }, [currentStackIndex, currentLetterIndex]);

  return (
    <div className="typewriter-container">
      {visibleStacks.map((stack, index) => (
        <div key={index} className="stack">
          {stack}
          {index === currentStackIndex - 1 && <span className="cursor"></span>}
        </div>
      ))}
    </div>
  );
};

export default TypingAnimStacks;