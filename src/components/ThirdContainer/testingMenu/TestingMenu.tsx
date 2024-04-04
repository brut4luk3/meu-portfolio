import React, { useState } from 'react';
import './TestingMenu.css';
import { useTranslation } from 'react-i18next';
import ComparacaoDatasForm from './ComparacaoDatasForm';
import ReplaceTextForm from './ReplaceTextForm';
import InformaDiaUtilForm from './InformaDiaUtilForm';
import ValidaTelefoneLatamForm from './ValidaTelefoneLatamForm';
import GeolocalizacaoForm from './GeolocalizacaoForm';
import ValidacaoDocumentoForm from './ValidacaoDocumentoForm';

const TestingMenu = () => {
  const { t } = useTranslation();
  const menuItems = [
    { name: t("dateComparison"), component: <ComparacaoDatasForm /> },
    { name: t("textReplacement"), component: <ReplaceTextForm /> },
    { name: t("businessDayCheck"), component: <InformaDiaUtilForm /> },
    { name: t("phoneValidation"), component: <ValidaTelefoneLatamForm /> },
    { name: t("geolocation"), component: <GeolocalizacaoForm /> },
    { name: t("documentValidation"), component: <ValidacaoDocumentoForm /> },
  ];

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