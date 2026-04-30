import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import DocsPage from './pages/DocsPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showEngine, setShowEngine] = useState(false);
  const isDocsPage = location.pathname.startsWith('/docs');

  const handleEngineClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    setShowEngine(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setShowEngine(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isDocsPage && <div className="animated-bg"></div>}
      <Navbar onEngineClick={handleEngineClick} onHomeClick={handleHomeClick} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home showEngine={showEngine} setShowEngine={setShowEngine} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </main>
      <Footer onEngineClick={handleEngineClick} onHomeClick={handleHomeClick} />
    </div>
  );
}

export default App;
