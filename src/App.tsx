import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import SecondaryContainer from './components/SecondaryContainer/SecondaryContainer';
import ThirdContainer from './components/ThirdContainer/ThirdContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <MainContainer />
        <SecondaryContainer />
        <ThirdContainer />
      </div>
    </div>
  );
}

export default App;