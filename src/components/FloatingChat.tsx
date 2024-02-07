import React from 'react';
import chatIcon from '../assets/3d.png';
import './FloatingChat.css';

const FloatingChat = () => {
  return (
    <div className="floating-chat">
      <img src={chatIcon} alt="Quer saber mais sobre mim?" />
      <div className="tooltip">
        <h3>Minha maior paixão:</h3>
        <p>Minha família querida ❤️</p>
        <h3>Meu esporte favorito:</h3>
        <p>Ciclismo 🚲</p>
        <h3>Meu biscoito favorito:</h3>
        <p>Piraquê recheado 🍪</p>
        <h3>Gênero favorito:</h3>
        <p>Ficção Científica 🎬</p>
      </div>
    </div>
  );
};

export default FloatingChat;