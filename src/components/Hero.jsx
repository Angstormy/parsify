import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '150px' }}>
      
      <div className="container">
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '24px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Decode the Unreadable.<br />
          <span style={{ color: 'var(--accent-primary)' }}>At the Speed of Thought.</span>
        </h1>
        
        <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
          Parsify transcends traditional OCR. By fusing state-of-the-art Vision Transformers with a dynamic, decoupled edge-cloud architecture, we turn chaotic handwriting into structured intelligence instantly.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('/app')}>
            Try the Engine <ArrowRight size={18} />
          </button>
          <button className="btn-outline" onClick={() => navigate('/docs')}>
            View Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
