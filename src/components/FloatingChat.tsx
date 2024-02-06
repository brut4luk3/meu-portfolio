import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import './FloatingChat.css';
import chatIcon from '../assets/3d.png';

const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="floating-chat" onClick={handleClickOpen}>
        <img src={chatIcon} alt="Quer saber mais sobre mim?" />
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogContent>
          <h1>Minha maior paixão:</h1>
          <p>Minha família querida ❤️</p>
          <h1>Meu esporte favorito:</h1>
          <p>Ciclismo 🚴</p>
          <h1>Meu biscoito favorito:</h1>
          <p>Piraquê recheado 🍪</p>
          <h1>Gênero favorito:</h1>
          <p>Ficção Científica 🎥</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChat;