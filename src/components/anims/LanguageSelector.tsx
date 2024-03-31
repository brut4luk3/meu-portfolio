import React from 'react';
import { useTranslation } from 'react-i18next';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const isLoading = i18n.isInitialized && i18n.language !== 'en';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='LanguageSelector'>
      {isLoading && <TestingMenuAnim />}
      <img src={usIcon} alt="Translate to English" onClick={() => changeLanguage('en')} />
      <img src={brIcon} alt="Translate to Portuguese" onClick={() => window.location.reload()} />
    </div>
  );
};

export default LanguageSelector;