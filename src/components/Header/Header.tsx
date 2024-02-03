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
      <ProfileImage />
    </div>
  );
}

export default Header;