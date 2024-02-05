import React, { useState } from 'react';
import './GeneralFormStyle.css'; // Importando o CSS global para o estilo do formulário
import TestingMenuAnim from '../../anims/TestingMenuAnim'; // Ajuste o caminho conforme necessário

const ValidaTelefoneLatamForm = () => {
    const [telefone, setTelefone] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/valida_telefone_latam', {
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
            const mensagemResultado = `Região: ${respostaApi.regiao}, Válido: ${respostaApi.valid ? "Sim" : "Não"}`;
            setResultado(mensagemResultado);
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
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Digite o telefone completo com DDD"
                    className="input-data lone-field"
                />
                <br></br>
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ValidaTelefoneLatamForm;