import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const changeLanguage = (lng: string) => {
    setIsChangingLanguage(true);

    setTimeout(() => {
      i18n.changeLanguage(lng).then(() => {
        setIsChangingLanguage(false);
      });
    }, 2000);
  };

  return (
    <div className='LanguageSelector'>
      {isChangingLanguage && <TestingMenuAnim />}
      <img src={usIcon} alt="Translate to English" onClick={() => changeLanguage('en')} />
      <img src={brIcon} alt="Translate to Portuguese" onClick={() => changeLanguage('pt')} />
    </div>
  );
};

export default LanguageSelector;