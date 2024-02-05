import React, { useState } from 'react';
import './ComparacaoDatasForm.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const ComparacaoDatasForm = () => {
    const [data1, setData1] = useState('');
    const [data2, setData2] = useState('');
    const [modo, setModo] = useState('diferenca');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    interface RespostaApiDiferenca {
        result: number; // Resultado sempre será um número para modo "diferenca"
    }

    interface RespostaApiComparacao {
        result: string; // Resultado pode ser "0", "-1", ou "1" para modo "comparacao"
    }

    const interpretarResultado = (respostaApi: RespostaApiDiferenca | RespostaApiComparacao, modo: string): string => {
        if (modo === 'diferenca') {

            return `A diferença é de ${respostaApi.result} dia(s).`;
        } else if (modo === 'comparacao') {

            switch (respostaApi.result) {
                case "0":
                    return "A Data1 é igual a Data2.";
                case "-1":
                    return "A Data1 é menor que a Data2.";
                case "1":
                    return "A Data1 é maior que a Data2.";
                default:
                    return "Resultado desconhecido.";
            }
        }
        return "Modo não especificado.";
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

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            console.log(respostaApi);

            const mensagemResultado = interpretarResultado(respostaApi, modo);
            setResultado(mensagemResultado);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setResultado('Erro ao realizar a requisição: ' + error);
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
                    className="input-data input-data-bottom"
                />
                <select
                    value={modo}
                    onChange={(e) => setModo(e.target.value)}
                    className="input-data modo-dropdown" // Adicione 'modo-dropdown' aqui
                >
                    <option value="diferenca">Diferença</option>
                    <option value="comparacao">Comparação</option>
                </select>

                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ComparacaoDatasForm;