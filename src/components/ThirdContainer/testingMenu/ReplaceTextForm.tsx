import React, { useState } from 'react';
import './ReplaceTextForm.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';

const ReplaceTextForm = () => {
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
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/replace_text', {
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
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Texto"
                    className="input-data input-data-top"
                />
                <input
                    type="text"
                    value={itemParaSubstituir}
                    onChange={(e) => setItemParaSubstituir(e.target.value)}
                    placeholder="Item para substituir"
                    className="input-data"
                />
                <input
                    type="text"
                    value={itemSubstituto}
                    onChange={(e) => setItemSubstituto(e.target.value)}
                    placeholder="Item substituto"
                    className="input-data"
                />
                <input
                    type="number"
                    value={casoParcialQuantidade}
                    onChange={(e) => setCasoParcialQuantidade(e.target.value)}
                    placeholder="Caso Parcial Quantidade"
                    className="input-data input-data-bottom"
                />
                <br></br>
                <select
                    value={modo}
                    onChange={(e) => setModo(e.target.value)}
                    className="input-data modo-dropdown"
                >
                    <option value="parcial">Parcial</option>
                    <option value="completo">Completo</option>
                </select>
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default ReplaceTextForm;