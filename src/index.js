import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Đường dẫn mới cho index.css
import App from './pages/App'; // Đường dẫn mới cho App.js


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



