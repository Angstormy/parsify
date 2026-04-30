import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Globe2, Cpu, Activity, ArrowRight, X } from 'lucide-react';
import OcrEngine from '../components/OcrEngine';

const Home = ({ showEngine, setShowEngine }) => {
  const navigate = useNavigate();
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
      transition: 'padding-top 0.4s ease'
    }}>
      <div className="container">
        
        {!showEngine ? (
          /* Landing View */
          <div className="bento-grid" style={{ 
            marginTop: 0, 
            animation: 'fadeIn 0.8s ease-out',
            transform: 'translateY(0)',
            transition: 'transform 0.4s ease'
          }}>
            <div className="bento-card span-12" style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', 
              padding: isMobile ? '40px 20px' : '48px 40px',
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-subtle)',
              borderRadius: isMobile ? '24px' : '32px'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--bg-surface-hover)', borderRadius: '999px', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Parsify Engine 2.0 Live</span>
              </div>
              
              <h1 style={{ 
                fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5vw, 5rem)', 
                marginBottom: '16px', 
                letterSpacing: '-0.04em', 
                lineHeight: 1.1 
              }}>
                Decode the Unreadable.<br />
                <span className="text-gradient">At the Speed of Thought.</span>
              </h1>
              
              <p style={{ 
                fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 1.5vw, 1.125rem)', 
                color: 'var(--text-secondary)', 
                maxWidth: '650px', 
                margin: '0 auto 32px auto', 
                lineHeight: 1.6 
              }}>
                By fusing ResNet 50 feature extraction with a decoupled edge-cloud architecture, we turn chaotic handwriting into structured intelligence.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={() => setShowEngine(true)} style={{ width: isMobile ? '100%' : 'auto' }}>
                  Initialize Engine <ArrowRight size={18} />
                </button>
                <button className="btn-outline" onClick={() => navigate('/docs')} style={{ width: isMobile ? '100%' : 'auto' }}>
                  Read Documentation
                </button>
              </div>
            </div>

            {/* Sub Bento Cards */}
            <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
                <Globe2 size={24} color="var(--accent-primary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>Cognitive Polyglot</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Shatter language barriers. From English cursive to Hindi Devanagari, Parsify reads with near-human awareness.</p>
            </div>

            <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glow)' }}>
                <Cpu size={24} color="var(--accent-secondary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>Zero-Latency Edge</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Heavyweight intelligence, featherweight footprint. Multi-gigabyte models streamed for instantaneous local inference.</p>
            </div>

            <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--bg-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                <Activity size={24} color="var(--text-primary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '16px' }}>X-Ray Vision Matrix</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Don't just get an answer—watch the AI think. Peer directly into attention layers with real-time beam search decoding.</p>
            </div>
          </div>
        ) : (
          /* Engine View */
          <div style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transform: 'translateY(0)', transition: 'transform 0.4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '16px' : '0', textAlign: isMobile ? 'center' : 'left' }}>
              <div>
                <h2 style={{ fontSize: isMobile ? '1.75rem' : '2rem', marginBottom: '4px' }}>Neural Engine <span className="text-gradient">Core</span></h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>System status: Optimal • Neural paths connected</p>
              </div>
              <button 
                onClick={() => setShowEngine(false)}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', padding: '10px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' }}
                title="Exit Engine"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="bento-grid" style={{ marginTop: 0 }}>
              <div className="bento-card span-12" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--accent-glow)', boxShadow: '0 0 40px rgba(0, 240, 255, 0.1)', borderRadius: '24px' }}>
                <OcrEngine />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
