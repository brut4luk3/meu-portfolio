import React from 'react';
import { useTranslation } from 'react-i18next';
import chatIcon from '../../assets/3d.png';
import './FloatingChat.css';

const FloatingChat = () => {
  const { t } = useTranslation();

  return (
    <div className="floating-chat">
      <img src={chatIcon} alt={t('chatTooltip')} />
      <div className="tooltip">
        <h3>{t('myPassion')}</h3>
        <p>{t('myFamily')}</p>
        <h3>{t('myFavoriteSport')}</h3>
        <p>{t('cycling')}</p>
        <h3>{t('myFavoriteCookie')}</h3>
        <p>{t('cookie')}</p>
        <h3>{t('favoriteGenre')}</h3>
        <p>{t('sciFi')}</p>
      </div>
    </div>
  );
};

export default FloatingChat;