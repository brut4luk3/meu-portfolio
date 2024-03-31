import React from 'react';
import { Trans } from 'react-i18next';
import './MainContainer.css';
import rightImage from '../../assets/right.png';
import okImage from '../../assets/ok.png';
import loveImage from '../../assets/love.png';

const MainContainer: React.FC = () => {
  return (
    <div className="main-container">
      <div className="bio">
        <div className="bio-section" id="par1">
          <img src={rightImage} alt="Right" className="bio-img left" />
          <p>
            <Trans i18nKey="greeting">
              Me chamo <span className='emphasis'>Lucas G. Reinert</span> e sou o <span className='emphasis'>Full-Stack Developer</span> que você precisa!
            </Trans>
          </p>
        </div>
        <div className="bio-section" id="par2">
          <p>
            <Trans i18nKey="experience">
              Com mais de <span className='emphasis'>04 anos de experiência</span> em desenvolvimento de sites, apps e aplicações desktop, sou capaz de criar projetos funcionais, escaláveis e de fácil manutenção.
            </Trans>
          </p>
          <img src={okImage} alt="OK" className="bio-img right" />
        </div>
        <div className="bio-section" id="par3">
          <img src={loveImage} alt="Love" className="bio-img left" />
          <p>
            <Trans i18nKey="passion">
              Amo meu trabalho e minha maior inspiração é lhe ajudar a <span className='emphasis'>alcançar seus objetivos!</span>
            </Trans>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;