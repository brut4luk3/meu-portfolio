import React, { useState } from 'react';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';
import { useTranslation } from 'react-i18next';

const ReplaceTextForm = () => {
    const { t } = useTranslation();
    const [texto, setTexto] = useState('');
    const [itemParaSubstituir, setItemParaSubstituir] = useState('');
    const [itemSubstituto, setItemSubstituto] = useState('');
    const [casoParcialQuantidade, setCasoParcialQuantidade] = useState('');
    const [modo, setModo] = useState('parcial');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://multirole-api.vercel.app/api/replace_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    texto,
                    item_para_substituir: itemParaSubstituir,
                    item_substituto: itemSubstituto,
                    CasoParcialQuantidade: parseInt(casoParcialQuantidade, 10),
                    modo,
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
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder={t('text')}
                    className="input-data input-data-top"
                />
                <input
                    type="text"
                    value={itemParaSubstituir}
                    onChange={(e) => setItemParaSubstituir(e.target.value)}
                    placeholder={t('itemToReplace')}
                    className="input-data"
                />
                <input
                    type="text"
                    value={itemSubstituto}
                    onChange={(e) => setItemSubstituto(e.target.value)}
                    placeholder={t('replacementItem')}
                    className="input-data"
                />
                <input
                    type="number"
                    value={casoParcialQuantidade}
                    onChange={(e) => setCasoParcialQuantidade(e.target.value)}
                    placeholder={t('partialCaseQuantity')}
                    className="input-data"
                />
                <select
                    value={modo}
                    onChange={(e) => setModo(e.target.value)}
                    className="input-data input-data-bottom"
                >
                    <option value="parcial">{t('partial')}</option>
                    <option value="completo">{t('complete')}</option>
                </select>
                <br></br>
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ReplaceTextForm;