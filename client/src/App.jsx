import { useState, useEffect } from 'react';
import { LandingPage } from './pages/landing-page';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Apply dark theme by default
    document.documentElement.classList.add('dark');
    
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic
  const renderPage = () => {
    switch (currentPath) {
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      default:
        return <LandingPage />;
    }
  };

  return renderPage();
}

export default App;
