import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ onEngineClick, onHomeClick }) => {
  const [theme, setTheme] = useState(localStorage.getItem('parsify-theme') || 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('parsify-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav 
        className={`floating-nav ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          top: isMobile ? '16px' : (scrolled ? '12px' : '24px'),
          left: '50%',
          width: isMobile ? 'calc(100% - 32px)' : 'auto',
          maxWidth: isMobile ? '500px' : 'none',
          padding: isMobile ? '10px 16px' : (scrolled ? '6px 20px' : '8px 24px'),
          transform: 'translateX(-50%) translateY(0)',
          opacity: 1,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto',
          justifyContent: 'space-between',
          gap: isMobile ? '0' : '32px'
        }}
      >
        
        <NavLink 
          to="/" 
          onClick={() => { onHomeClick(); setIsMenuOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'transform 0.3s ease' }} 
          className="logo-hover"
        >
          <img 
            src="/logo.png" 
            alt="Parsify Logo" 
            style={{ 
              width: (scrolled || isMobile) ? '24px' : '28px', 
              height: (scrolled || isMobile) ? '24px' : '28px', 
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }} 
          />
          <span style={{ 
            fontSize: (scrolled || isMobile) ? '1.05rem' : '1.2rem', 
            fontWeight: 800, 
            fontFamily: 'var(--font-display)', 
            letterSpacing: '-0.02em',
            transition: 'all 0.3s ease'
          }}>
            Parsify<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: scrolled ? '16px' : '24px', alignItems: 'center', borderLeft: '1px solid var(--border-subtle)', paddingLeft: scrolled ? '16px' : '24px', transition: 'all 0.3s ease' }}>
            <NavLink 
              to="/" 
              onClick={() => { onHomeClick(); }}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              style={({ isActive }) => ({ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' })}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              style={({ isActive }) => ({ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' })}
            >
              Architecture
            </NavLink>
            <NavLink 
              to="/team" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              style={({ isActive }) => ({ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' })}
            >
              Team
            </NavLink>
            <NavLink 
              to="/docs" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
              style={({ isActive }) => ({ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' })}
            >
              Docs
            </NavLink>
            
            <button 
              onClick={() => { onEngineClick(); }}
              className="btn-primary btn-engine-glow"
              style={{ 
                padding: scrolled ? '6px 16px' : '8px 20px', 
                fontSize: '0.85rem', 
                borderRadius: '999px',
                transition: 'all 0.3s ease'
              }}
            >
              Engine
            </button>

            <button 
              onClick={toggleTheme} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              className="nav-link"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <div style={{ 
                transform: `rotate(${theme === 'dark' ? '0deg' : '360deg'}) scale(${theme === 'dark' ? 1 : 1})`, 
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {theme === 'dark' ? (
                  <Moon size={18} style={{ filter: 'drop-shadow(0 0 5px var(--accent-primary))' }} />
                ) : (
                  <Sun size={18} />
                )}
              </div>
            </button>
          </div>
        )}

        {/* Mobile Actions */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                padding: '8px'
              }}
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={toggleMenu}
              style={{ 
                background: 'var(--bg-surface-hover)', 
                border: '1px solid var(--border-subtle)', 
                color: 'var(--text-primary)', 
                padding: '8px', 
                borderRadius: '10px' 
              }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--bg-base)',
          zIndex: 1150,
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 32px 32px 32px',
          gap: '24px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <NavLink to="/" onClick={() => { onHomeClick(); setIsMenuOpen(false); }} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'var(--text-primary)' }}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'var(--text-primary)' }}>Architecture</NavLink>
          <NavLink to="/team" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'var(--text-primary)' }}>Team</NavLink>
          <NavLink to="/docs" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'var(--text-primary)' }}>Docs</NavLink>
          
          <button 
            onClick={() => { onEngineClick(); setIsMenuOpen(false); }}
            className="btn-primary"
            style={{ marginTop: 'auto', width: '100%', padding: '20px' }}
          >
            Launch Engine
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
