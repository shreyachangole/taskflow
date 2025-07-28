import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LandingPage } from './pages/landing-page';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import './App.css';
import { useEffect } from 'react';

function App() {
  // Apply dark theme by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;