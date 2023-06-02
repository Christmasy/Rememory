import './app.css';
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
        path={'/main'}
        element={<MainPage />}
      />
    </Routes>
  );
}

export default App;
