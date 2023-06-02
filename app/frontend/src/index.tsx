import * as React from 'react';
import './index.css';
import App from './app';
import AppContext from './components/app-context/app-context';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
