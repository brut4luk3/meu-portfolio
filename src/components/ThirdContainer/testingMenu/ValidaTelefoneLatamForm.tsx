import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const ValidaTelefoneLatamForm = () => {
    const { t } = useTranslation();
    const [telefone, setTelefone] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('https://multirole-api.vercel.app/api/valida_telefone_latam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    telefone,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const respostaApi = await response.json();
            const mensagemResultado = `${t('region')}: ${respostaApi.regiao}, ${t('valid')}: ${respostaApi.valid ? t('yes') : t('no')}`;
            setResultado(mensagemResultado);
        } catch (error) {
            const message = (error instanceof Error) ? error.message : t('unknownError');
            setResultado(t('requestError') + message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            {loading && <TestingMenuAnim />}
            <form onSubmit={handleSubmit}>
                <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder={t('enterPhone')}
                    className="input-data lone-field"
                />
                <br />
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ValidaTelefoneLatamForm;