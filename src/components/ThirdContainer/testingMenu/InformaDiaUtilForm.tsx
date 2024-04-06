import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const estados = [
  "Todos", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", 
  "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const InformaDiaUtilForm = () => {
    const { t } = useTranslation();
    const [dataAtual, setDataAtual] = useState('');
    const [estado, setEstado] = useState('all');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/informa_dia_util', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data_atual: dataAtual.split('-').reverse().join('/'),
                    estado: estado === "Todos" ? "all" : estado,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            setResultado(respostaApi.result);
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
                    type="date"
                    value={dataAtual}
                    onChange={(e) => setDataAtual(e.target.value)}
                    className="input-data input-data-top"
                />
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value === "Todos" ? "all" : e.target.value)}
                    className="input-data input-data-bottom"
                >
                    <option value="all">{t('chooseState')}</option>
                    {estados.slice(1).map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                    ))}
                </select>
                <br></br>
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default InformaDiaUtilForm;