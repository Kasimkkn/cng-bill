
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BillProvider } from './BillContext';
import './index.css';
ReactDOM.render(
  <BillProvider>
    <App />
  </BillProvider>,
  document.getElementById('root')
);
