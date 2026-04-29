import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import logo from '../../assets/Parsify.png';

const Navbar = ({ activeSection, onSectionChange, onEngineClick, isMobile }) => {
  const [theme, setTheme] = useState(localStorage.getItem('parsify-theme') || 'light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('parsify-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Architecture' },
    { id: 'team', label: 'Team' },
    { id: 'docs', label: 'Docs' },
  ];

  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  // Don't render on mobile - mobile uses sidebar
  if (isMobile) return null;

  return (
    <nav
      className={`floating-nav ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: scrolled ? '6px 20px' : '8px 24px',
        zIndex: 1000,
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}
    >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            transition: 'transform 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          className="logo-hover"
        >
          <img
            src={logo}
            alt="Parsify Logo"
            style={{
              width: scrolled ? '28px' : '32px',
              height: scrolled ? '28px' : '32px',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
          />
          <span style={{
            fontSize: scrolled ? '1.1rem' : '1.2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            transition: 'all 0.3s ease'
          }}>
            Parsify<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </span>
        </button>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: scrolled ? '16px' : '24px',
          alignItems: 'center',
          borderLeft: '1px solid var(--border-subtle)',
          paddingLeft: scrolled ? '16px' : '24px',
          transition: 'all 0.3s ease'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{
                color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Engine Button */}
          <button
            onClick={onEngineClick}
            className="btn-primary btn-engine-glow"
            style={{
              padding: scrolled ? '6px 16px' : '8px 20px',
              fontSize: '0.85rem',
              borderRadius: '999px',
              transition: 'all 0.3s ease',
              background: 'var(--text-primary)',
              color: 'var(--bg-base)',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Engine
          </button>

          {/* Theme Toggle */}
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
      </nav>
  );
};

export default Navbar;
