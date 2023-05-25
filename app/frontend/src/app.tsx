import './app.css';
import WelcomePage from './pages/welcome-page/welcome-page';
import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

const App = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={<LoginPage />}
      />
      <Route
        path={'/welcome'}
        element={<WelcomePage />}
      />
      <Route
        path={'/main'}
        element={<MainPage />}
      />
    </Routes>
  );
}

export default App;
