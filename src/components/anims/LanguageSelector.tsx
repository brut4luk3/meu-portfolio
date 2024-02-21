import React, { useState } from 'react';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css';

interface Translations {
  [key: string]: string;
}

const LanguageSelector: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const translateContent = async () => {
    setIsLoading(true);
    const htmlContent = document.documentElement.outerHTML;

    try {
      const response = await fetch('https://translaterum-production.up.railway.app/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: htmlContent }),
      });

      if (!response.ok) throw new Error('Falha na tradução');
      const translations: Translations = await response.json();

      Object.entries(translations).forEach(([original, translated]) => {
        const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedOriginal, "g");
        document.body.innerHTML = document.body.innerHTML.replace(regex, translated);
      });

    } catch (error) {
      console.error('Erro ao traduzir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='LanguageSelector'>
      {isLoading && <TestingMenuAnim />}
      <img src={usIcon} alt="Translate to English" onClick={translateContent} />
      <img src={brIcon} alt="Translate to Portuguese" onClick={() => window.location.reload()} />
    </div>
  );
};

export default LanguageSelector;