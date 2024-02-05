import React, { useState } from 'react';
import './TestingMenu.css';
import ComparacaoDatasForm from './ComparacaoDatasForm';
import ReplaceTextForm from './ReplaceTextForm';

const menuItems = [
    "Comparação de Datas",
    "Replace Text",
    "Verificação de Dias Úteis",
    "Validação de Telefone",
    "Geolocalização",
    "Validação de Documento"
  ];

  const TestingMenu = () => {
    const [isOpen, setIsOpen] = useState(Array(6).fill(false));
  
    const toggleItem = (index: number) => {
      const newState = [...isOpen];
      newState[index] = !newState[index];
      setIsOpen(newState);
    };
  
    return (
      <div className="testing-menu">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="menu-item" onClick={() => toggleItem(index)}>
              {isOpen[index] ? '-' : '+'} {item}
            </div>
            {isOpen[index] && (
              <div className="dropdown-content">
                {index === 0 ? <ComparacaoDatasForm /> : ""}
                {index === 1 ? <ReplaceTextForm /> : ""}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };  
  
  export default TestingMenu;