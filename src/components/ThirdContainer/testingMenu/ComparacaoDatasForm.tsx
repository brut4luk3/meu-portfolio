import React, { useState } from 'react';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';
import { useTranslation } from 'react-i18next';

const ComparacaoDatasForm = () => {
    const { t } = useTranslation();
    const [data1, setData1] = useState('');
    const [data2, setData2] = useState('');
    const [modo, setModo] = useState('diferenca');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    interface RespostaApiDiferenca {
        result: number;
    }

    interface RespostaApiComparacao {
        result: string;
    }

    const interpretarResultado = (respostaApi: RespostaApiDiferenca | RespostaApiComparacao, modo: string): string => {
        if (modo === 'diferenca') {

            return t('dateDifference1') + `${respostaApi.result}` + t('dateDifference2')
        } else if (modo === 'comparacao') {

            switch (respostaApi.result) {
                case "0":
                    return t('dateEqual');
                case "-1":
                    return t('date1LessThanDate2');
                case "1":
                    return t('date1GreaterThanDate2');
                default:
                    return t('unknownResult');
            }
        }
        return t('notSpecifiedMode');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formatarData = (data: string) => {
            const [ano, mes, dia] = data.split("-");
            return `${dia}/${mes}/${ano}`;
        };

        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/compara_datas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data1: formatarData(data1),
                    data2: formatarData(data2),
                    modo,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            const mensagemResultado = interpretarResultado(respostaApi, modo);
            setResultado(mensagemResultado);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setResultado(t('errorRequest') + error);
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
                    value={data1}
                    onChange={(e) => setData1(e.target.value)}
                    placeholder="Data 1"
                    className="input-data input-data-top"
                />
                <input
                    type="date"
                    value={data2}
                    onChange={(e) => setData2(e.target.value)}
                    placeholder="Data 2"
                    className="input-data"
                />
                <select
                    value={modo}
                    onChange={(e) => setModo(e.target.value)}
                    className="input-data input-data-bottom"
                >
                    <option value="diferenca">{t('difference')}</option>
                    <option value="comparacao">{t('comparison')}</option>
                </select>
                <br></br>
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ComparacaoDatasForm;