import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import contactIcon from '../../assets/contact.png';
import copyIcon from '../../assets/copy.png';
import './FloatingContact.css';
import '../ThirdContainer/testingMenu/GeneralFormStyle.css';
import TestingMenuAnim from './TestingMenuAnim';
import Draggable from 'react-draggable';

const FloatingContact = () => {
    const { t } = useTranslation();
    const [showDialog, setShowDialog] = useState(false);
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nome, setNome] = useState('');
    const [emailValido, setEmailValido] = useState(true);
    const [telefoneValido, setTelefoneValido] = useState(true);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        setEmailValido(re.test(email));
    };

    const validateTelefone = (telefone) => {
        const re = /^\d{12,13}$/;
        setTelefoneValido(re.test(telefone));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(t('copiedToClipboard'));
        }).catch(err => {
            console.error(t('copyFailed'), err);
            alert(t('copyFailed') + err);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            nome,
            email,
            telefone
        };

        try {
            const response = await fetch('https://multiroleapi-production.up.railway.app/api/send_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(t("submitFailure"));

            alert(t("submitSuccessful"));
        } catch (error) {
            console.error(t("requestError") + error);
            alert(t("submitFailure"));
        } finally {
            setLoading(false);
        }
    };

    const handleContactClick = () => {
        setShowDialog(true);
    };

    return (
        <>
            <Draggable>
                <div className="floating-contact">
                    <img src={contactIcon} alt="Contact" onClick={() => handleContactClick()} onTouchEnd={() => handleContactClick()} />
                    <div className='tooltip-contact'>
                        <span><h4>{t('moveMe')}</h4></span>
                    </div>
                </div>
            </Draggable>

            {showDialog && (
                <div className="dialog-overlay" onClick={() => setShowDialog(false)}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="contact-links">
                            <h3>{t('followMe')}</h3>
                            <h4>Whatsapp:</h4>
                            <p>+5547999751383 <img src={copyIcon} alt="Copy" onClick={() => copyToClipboard('+5547999751383')} /></p>
                            <h4>E-mail:</h4>
                            <p>lucasreinert96@gmail.com <img src={copyIcon} alt="Copy" onClick={() => copyToClipboard('lucasreinert96@gmail.com')} /></p>
                            <p><a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/lucas-g-reinert-605b471a0/">LinkedIn</a></p>
                            <p><a target='_blank' rel='noreferrer' href="https://github.com/brut4luk3">GitHub</a></p>
                        </div>
                        <div>
                            <h3>{t('orFillForm')}</h3>
                        </div>
                        {loading && <TestingMenuAnim />}
                        <form onSubmit={handleSubmit} className="contact-form">
                            <input className='input-data input-data-top' type="text" placeholder={t('fullNamePlaceholder')} value={nome} onChange={(e) => setNome(e.target.value)} />
                            <input className='input-data' type="text" placeholder={t('emailPlaceholder')} value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }} />
                            {!emailValido && <span className="error">{t('invalidEmail')}</span>}
                            <input className='input-data input-data-bottom' type="text" placeholder={t('phonePlaceholder')} value={telefone} onChange={(e) => { setTelefone(e.target.value); validateTelefone(e.target.value); }} />
                            {!telefoneValido && <span className="error">{t('invalidPhone')}</span>}
                            <button className='submit-btn' type="submit" disabled={!emailValido || !telefoneValido}>{t('submit')}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingContact;