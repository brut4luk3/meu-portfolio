import React, { useState } from 'react';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const translateContent = async () => {
    setIsLoading(true);
    const siteUrl = window.location.href;

    try {
      const response = await fetch('https://translaterum-production.up.railway.app/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: siteUrl }),
      });

      if (!response.ok) throw new Error('Falha na tradução');
      const translations: Record<string, string> = await response.json();

      Object.entries(translations).forEach(([original, translated]) => {
        // Encontra todos os elementos que contêm o texto original e atualiza para o texto traduzido
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, label').forEach(element => {
          if (element.textContent === original) {
            element.textContent = translated;
          }
        });
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