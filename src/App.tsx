import './styles/App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import SecondaryContainer from './components/SecondaryContainer/SecondaryContainer';
import ThirdContainer from './components/ThirdContainer/ThirdContainer';
import FloatingChat from './components/anims/FloatingChat';
import FloatingContact from './components/anims/FloatingContact';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <MainContainer />
        <SecondaryContainer />
        <ThirdContainer />
      </div>
      <FloatingChat />
      <FloatingContact />
    </div>
  );
}

export default App;