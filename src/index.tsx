import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchIPAndSendEmail = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        const payload = {
          ip_address: `${ipData.ip}`,
          email: '',
          telefone: '',
        };

        await fetch('https://multiroleapi-production.up.railway.app/api/send_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error('Erro ao obter IP ou enviar e-mail:', error);
      }
    };

    fetchIPAndSendEmail();
  }, []);

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