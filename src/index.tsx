import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
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
        <div>
          <div>
            <p>{t('developerInfo')}</p>
            <p>{t('contactInfo')}</p>
            <p>{t('rightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

root.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();