import React, { useEffect, useRef, useState } from 'react';
import './SecondaryContainer.css';
import TypingAnimStacks from '../anims/TypingAnimStacks';

const SecondaryContainer: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkVisibility = () => {
    if (!hasAnimated && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const isVis = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVis) {
        setHasAnimated(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  return (
    <div
      className={`secondary-container ${hasAnimated ? 'fadeIn' : ''}`}
      ref={containerRef}
    >
      <div className="stacks">
        <h1>Stacks</h1>
        <TypingAnimStacks />
        <div className='cloud1'></div>
        <div className='cloud2'></div>
        <div className='cloud3'></div>
      </div>
    </div>
  );
};

export default SecondaryContainer;