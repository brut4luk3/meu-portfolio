// components/Header/Header.tsx
import React from 'react';
import './Header.css';
import ProfileImage from '../ProfileImage/ProfileImage';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-cover">
        <div className="typewriter">
          <span><h1>HELLO WORLD!</h1></span>
        </div>
      </div>
      <div className='header4Image'></div>
      <ProfileImage />
    </div>
  );
}

export default Header;