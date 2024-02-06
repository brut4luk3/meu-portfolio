import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import SecondaryContainer from './components/SecondaryContainer/SecondaryContainer';
import ThirdContainer from './components/ThirdContainer/ThirdContainer';
import FloatingChat from './components/FloatingChat';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Importe o tema criado

function App() {
  return (
    // Envolve o aplicativo com ThemeProvider aqui
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <div className="content">
          <MainContainer />
          <SecondaryContainer />
          <ThirdContainer />
          <FloatingChat />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;