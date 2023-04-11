import './app.css';
import WelcomePage from './pages/welcome-page/welcome-page';
import MainPage from './pages/main-page/main-page';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route
        path={'/'}
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
