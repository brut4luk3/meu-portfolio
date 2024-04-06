import React, { useState } from 'react';
import './GeneralFormStyle.css';
import TestingMenuAnim from '../../anims/TestingMenuAnim';
import { useTranslation } from 'react-i18next';

const GeolocalizacaoForm = () => {
    const { t } = useTranslation();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/geolocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const respostaApi = await response.json();
            const cidade = respostaApi.cidade || t('notAvailable', { defaultValue: 'Não disponível' });
            const estado = respostaApi.estado || t('notAvailable', { defaultValue: 'Não disponível' });
            const pais = respostaApi.pais || t('notAvailable', { defaultValue: 'Não disponível' });
            const mensagemResultado = t('locationResult', { city: cidade, state: estado, country: pais });
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
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    className="input-data input-data-top"
                />
                <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    className="input-data input-data-bottom"
                />
                <br />
                <button type="submit" className="submit-btn">{t('submit')}</button>
            </form>
            {resultado && <div className="resultado">{resultado}</div>}
        </div>
    );
};

export default GeolocalizacaoForm;