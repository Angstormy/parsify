import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';


const Footer = ({ onEngineClick, onHomeClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'var(--bg-base)', 
      borderTop: '1px solid var(--border-subtle)',
      padding: '80px 0 40px 0',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div className="bento-grid" style={{ marginTop: 0 }}>
          {/* Brand Section */}
          <div className="span-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <NavLink 
              to="/" 
              onClick={onHomeClick}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              <img 
                src="/logo.png" 
                alt="Parsify Logo" 
                style={{ width: '32px', height: '32px', borderRadius: '8px' }} 
              />
              <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                Parsify<span style={{ color: 'var(--accent-primary)' }}>.</span>
              </span>
            </NavLink>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px' }}>
              The next generation of OCR technology. Deciphering the world's most complex handwriting with neural intelligence.
            </p>
          </div>

          {/* Links Sections */}
          <div className="span-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NavLink to="/" onClick={onHomeClick} className="footer-link">Features</NavLink>
              <NavLink to="/about" className="footer-link">Architecture</NavLink>
              <button onClick={onEngineClick} className="footer-link" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', color: 'inherit' }}>Engine</button>
            </div>
          </div>

          <div className="span-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NavLink to="/team" className="footer-link">Team</NavLink>
              <NavLink to="/about" className="footer-link">Our Mission</NavLink>
            </div>
          </div>

          <div className="span-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NavLink to="/docs" className="footer-link">Documentation</NavLink>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div style={{ 
          marginTop: '60px', 
          paddingTop: '30px', 
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            © {currentYear} Parsify AI Technologies. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }
        .footer-link:hover {
          color: var(--accent-primary);
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .bento-grid {
            gap: 32px 10px !important;
          }
          .span-6 {
            grid-column: span 12 !important;
            text-align: center;
            align-items: center !important;
            margin-bottom: 20px;
          }
          .span-2 {
            grid-column: span 4 !important;
            text-align: center;
            align-items: center !important;
          }
          .footer-link {
            justify-content: center;
          }
          .footer-link:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
