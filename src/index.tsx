import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import SplashScreen from './components/anims/SplashScreen';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { useTranslation } from 'react-i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <div>
        <p>{t('developerInfo')}</p>
        <p>{t('contactInfo')}</p>
        <p>{t('rightsReserved')}</p>
      </div>
    </footer>
  );
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <SplashScreen setIsLoading={setIsLoading} /> : <>
        <App />
        <Footer />
      </>}
    </>
  );
};

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

reportWebVitals();