import React, { useState } from 'react';
import TestingMenuAnim from './TestingMenuAnim';
import brIcon from '../../assets/br.png';
import usIcon from '../../assets/us.png';
import './LanguageSelector.css';

const LanguageSelector = () => {
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
            const translations = await response.json();

            Object.keys(translations).forEach(originalText => {
                document.body.innerHTML = document.body.innerHTML.replace(new RegExp(originalText, 'g'), translations[originalText]);
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