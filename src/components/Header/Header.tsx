// components/Header/Header.tsx
import React from 'react';
import './Header.css';
import ProfileImage from '../ProfileImage/ProfileImage';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-cover">
        <h1>OLÁ MUNDO!</h1>
      </div>
      <div className='header3Image'></div>
      <ProfileImage />
    </div>
  );
}

export default Header;