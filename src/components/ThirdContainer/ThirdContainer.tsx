import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ThirdContainer.css';
import TestingMenu from './testingMenu/TestingMenu';

const ThirdContainer = () => {
  const { t } = useTranslation();
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
      className={`third-container ${hasAnimated ? 'fadeIn' : ''}`}
      ref={containerRef}
    >
      <div className='header5Image'></div>
      <h1>{t('testProducts')}</h1>
      <TestingMenu />
    </div>
  );
};

export default ThirdContainer;