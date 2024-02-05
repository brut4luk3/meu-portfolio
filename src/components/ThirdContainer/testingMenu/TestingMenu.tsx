import React, { useState } from 'react';
import './TestingMenu.css';
import ComparacaoDatasForm from './ComparacaoDatasForm';
import ReplaceTextForm from './ReplaceTextForm';
import InformaDiaUtilForm from './InformaDiaUtilForm';
import ValidaTelefoneLatamForm from './ValidaTelefoneLatamForm';
import GeolocalizacaoForm from './GeolocalizacaoForm';
import ValidacaoDocumentoForm from './ValidacaoDocumentoForm';

const menuItems = [
  { name: "Comparação de Datas", component: <ComparacaoDatasForm /> },
  { name: "Replace Text", component: <ReplaceTextForm /> },
  { name: "Verificação de Dias Úteis", component: <InformaDiaUtilForm /> },
  { name: "Validação de Telefone", component: <ValidaTelefoneLatamForm /> },
  { name: "Geolocalização", component: <GeolocalizacaoForm /> },
  { name: "Validação de Documento", component: <ValidacaoDocumentoForm /> },
];

const TestingMenu = () => {
  const [isOpen, setIsOpen] = useState(Array(menuItems.length).fill(false));

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
            {isOpen[index] ? '-' : '+'} {item.name}
          </div>
          {isOpen[index] && (
            <div className="dropdown-content">
              {item.component}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TestingMenu;