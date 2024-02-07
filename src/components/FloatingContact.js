import React, { useState } from 'react';
import contactIcon from '../assets/contact.png';
import copyIcon from '../assets/copy.png';
import './FloatingContact.css';
import '../components/ThirdContainer/testingMenu/GeneralFormStyle.css'
import TestingMenuAnim from '../components/anims/TestingMenuAnim';
import Draggable from 'react-draggable';

const FloatingContact = () => {
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
            alert("Copiado para a área de transferência!");
        }).catch(err => {
            console.error("Falha ao copiar: ", err);
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
    
            if (!response.ok) throw new Error('Falha ao enviar as informações.');
    
            alert('Informações enviadas com sucesso!');
        } catch (error) {
            console.error("Erro ao enviar as informações: ", error);
            alert("Falha ao enviar as informações.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Draggable>
                <div className="floating-contact" onClick={() => setShowDialog(true)}>
                    <img src={contactIcon} alt="Contact" />
                </div>
            </Draggable>

            {showDialog && (
                <div className="dialog-overlay" onClick={() => setShowDialog(false)}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="contact-links">
                            <h3>Me siga nas redes:</h3>
                            <h4>Whatsapp:</h4>
                            <p>+5547999751383 <img src={copyIcon} alt="Copy" onClick={() => copyToClipboard('+5547999751383')} /></p>
                            <h4>E-mail:</h4>
                            <p>lucasreinert96@gmail.com <img src={copyIcon} alt="Copy" onClick={() => copyToClipboard('lucasreinert96@gmail.com')} /></p>
                            <p><a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/lucas-g-reinert-605b471a0/">LinkedIn</a></p>
                            <p><a target='_blank' rel='noreferrer' href="https://github.com/brut4luk3">GitHub</a></p>
                        </div>
                        <div>
                            <h3>Ou preencha este formulário:</h3>
                        </div>
                        {loading && <TestingMenuAnim />}
                        <form onSubmit={handleSubmit} className="contact-form">
                            <input className='input-data input-data-top' type="text" placeholder="Digite seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <input className='input-data' type="text" placeholder="Digite seu e-mail" value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }} />
                            {!emailValido && <span className="error">Email inválido</span>}
                            <input className='input-data input-data-bottom' type="text" placeholder="Digite seu telefone" value={telefone} onChange={(e) => { setTelefone(e.target.value); validateTelefone(e.target.value); }} />
                            {!telefoneValido && <span className="error">Telefone inválido</span>}
                            <button className='submit-btn' type="submit" disabled={!emailValido || !telefoneValido}>Enviar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingContact;