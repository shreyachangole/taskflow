import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LandingPage } from './pages/landing-page';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import Dashboard from './pages/dashboard.jsx';
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/layout/navbar.jsx';
import Footer from './components/layout/footer.jsx';
function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;