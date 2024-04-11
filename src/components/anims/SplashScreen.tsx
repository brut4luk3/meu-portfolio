import React, { useEffect, useState } from 'react';
import splashImage from '../../assets/splash-image.png';
import './SplashScreen.css';

const SplashScreen = ({ setIsLoading }: { setIsLoading: (isLoading: boolean) => void }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 3000);

    const endTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [setIsLoading]);

  return (
    <div className={`splash-container ${startAnimation ? 'animate' : ''}`}>
      <div className="left-door"></div>
      <div className="right-door"></div>
      <img src={splashImage} alt='Logo' className="logo" />
    </div>
  );
};

export default SplashScreen;