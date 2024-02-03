// components/ProfileImage/ProfileImage.tsx
import React from 'react';
import './ProfileImage.css';
import profilePic from '../../assets/me.png';

const ProfileImage: React.FC = () => {
  return (
    <div className="profile-image">
      <img src={profilePic} alt="Profile" />
    </div>
  );
}

export default ProfileImage;