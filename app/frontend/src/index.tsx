/*import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);*/

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { TelegramLoginButton } from './components/telegram-login-btn/telegram-login-btn';
 
const handleTelegramResponse = (response: any) => {
  console.log(response);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="rememory_local_bot" buttonSize= "large" requestAccess= "write" usePic={true} lang= "en" widgetVersion={9}/>,
  //document.getElementById('telegramButton')
);
