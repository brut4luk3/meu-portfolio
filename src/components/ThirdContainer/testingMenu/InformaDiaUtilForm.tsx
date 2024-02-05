import React, { useState } from 'react';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const estados = [
  "Todos", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", 
  "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const InformaDiaUtilForm = () => {
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
                    data_atual: dataAtual.split('-').reverse().join('/'), // Converte YYYY-MM-DD para DD/MM/YYYY
                    estado: estado === "Todos" ? "all" : estado,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            setResultado(respostaApi.result);
        } catch (error) {
            const message = (error instanceof Error) ? error.message : 'Ocorreu um erro desconhecido';
            setResultado('Erro ao realizar a requisição: ' + message);
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
                    {estados.map((estado, index) => (
                        <option key={index} value={estado === "Todos" ? "all" : estado}>{estado}</option>
                    ))}
                </select>
                <br></br>
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default InformaDiaUtilForm;