import './styles/App.css';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import SecondaryContainer from './components/SecondaryContainer/SecondaryContainer';
import WebsitesContainer from './components/WebsitesContainer/WebsitesContainer';
import ThirdContainer from './components/ThirdContainer/ThirdContainer';
import FloatingChat from './components/anims/FloatingChat';
import FloatingContact from './components/anims/FloatingContact';
import LanguageSelector from './components/anims/LanguageSelector';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  return (
    <div className={`App app-fade-in`} key={i18n.language}>
      <Header />
      <div className="content">
        <LanguageSelector />
        <MainContainer />
        <SecondaryContainer />
        <WebsitesContainer />
        <ThirdContainer />
      </div>
      <FloatingChat />
      <FloatingContact />
    </div>
  );
}

export default App;