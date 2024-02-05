import React, { useState } from 'react';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const ValidacaoDocumentoForm = () => {
    const [documento, setDocumento] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/valida_cpf_cnpj', {
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
            setResultado(`O documento é ${respostaApi.result ? "válido" : "inválido"}.`);
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
                    type="text"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    placeholder="Digite o CPF ou CNPJ"
                    className="input-data lone-field"
                />
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ValidacaoDocumentoForm;