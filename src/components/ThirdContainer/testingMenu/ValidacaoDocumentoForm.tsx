import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const ValidacaoDocumentoForm = () => {
    const { t } = useTranslation();
    const [documento, setDocumento] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://multirole-api.vercel.app/api/valida_cpf_cnpj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documento,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            setResultado(respostaApi.result ? t('documentIsValid') : t('documentIsInvalid'));
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
                    type="text"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    placeholder={t('enterCpfCnpj')}
                    className="input-data lone-field"
                />
                <br />
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ValidacaoDocumentoForm;