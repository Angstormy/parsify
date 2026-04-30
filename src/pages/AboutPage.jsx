import React, { useState, useEffect, useRef } from 'react';

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="section" style={{ 
      paddingTop: isMobile ? '80px' : '110px', 
      minHeight: '100vh',
      background: 'var(--bg-base)',
      transition: 'padding-top 0.4s ease'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ 
          textAlign: 'center', 
          marginBottom: isMobile ? '32px' : '48px',
          transform: 'translateY(0)',
          transition: 'all 0.4s ease'
        }}>
          <h1 style={{ 
            fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '16px', 
            fontWeight: 900 
          }}>
            The Anatomy of a <span className="text-gradient">Paradigm Shift</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: isMobile ? '0.95rem' : '1.1rem', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Parsify wasn't just built; it was engineered to solve the "Cold Start" crisis in AI. By surgically severing the heavy neural weights from the application logic, we've birthed an ecosystem that updates instantly.
          </p>
        </div>

        <div className="bento-grid" style={{ gap: isMobile ? '16px' : '24px' }}>
          <div className="bento-card span-12" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: isMobile ? '24px' : '32px' }}>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>1. The React Edge Client</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: 1.6 }}>
              A hyper-optimized presentation layer that executes in milliseconds. It doesn't just upload images; it serializes raw visual data into secure payloads, acting as the frictionless bridge between human intent and machine execution.
            </p>
          </div>

          <div className="bento-card span-6" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: isMobile ? '24px' : '32px' }}>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.5rem', color: 'var(--accent-secondary)', fontWeight: 800 }}>2. The Synaptic Core</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '0.95rem', lineHeight: 1.6 }}>
              Stripped of bloat, this lightweight FastAPI microservice acts as the pure neurological center. It catches incoming tensor arrays, orchestrates PyTorch inference, and returns deterministic JSON.
            </p>
          </div>

          <div className="bento-card span-6" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: isMobile ? '24px' : '32px', background: 'var(--bg-surface)' }}>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.5rem', color: 'var(--text-primary)', fontWeight: 800 }}>3. The Knowledge Vault</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '0.95rem', lineHeight: 1.6 }}>
              The dormant giants. Deep learning models exceeding 2.5GB rest in Hugging Face LFS. Upon waking, the Synaptic Core dynamically streams these optimized weights directly into volatile memory.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
