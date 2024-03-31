import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <footer className='footer'>
      <div>
        <div>
          <div>
            <p>Endereço: Rua Alwin Beckmann, 127, Blumenau, Brasil</p>
            <p>Contato: lucasreinert96@gmail.com | Telefone: +55 (47) 99975-1383</p>
            <p>&copy; 2024 Portfolio. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();