import { Cpu, Database, Zap, Globe2, Shield, Sparkles } from 'lucide-react';

export default function About() {
  const accentColor = 'var(--accent-primary)';
  const accentSecondary = 'var(--accent-secondary)';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '16px',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)'
        }}>
          The Anatomy of a <span style={{ color: accentColor }}>Paradigm Shift</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Parsify wasn't just built; it was engineered to solve the "Cold Start" crisis in AI.
          By surgically severing the heavy neural weights from the application logic, we've birthed
          an ecosystem that updates instantly.
        </p>
      </div>

      {/* Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Main Card - Full Width */}
        <div style={{
          gridColumn: 'span 12',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
              border: `1px solid ${accentColor}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={24} color={accentColor} />
            </div>
            <h2 style={{
              fontSize: '1.75rem',
              color: accentColor,
              fontWeight: 800,
              fontFamily: 'var(--font-display)'
            }}>
              1. The React Edge Client
            </h2>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>
            A hyper-optimized presentation layer that executes in milliseconds. It doesn't just upload images;
            it serializes raw visual data into secure payloads, acting as the frictionless bridge between
            human intent and machine execution.
          </p>
        </div>

        {/* Two Column Cards */}
        <div style={{
          gridColumn: 'span 6',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${accentSecondary}33, ${accentSecondary}11)`,
              border: `1px solid ${accentSecondary}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={22} color={accentSecondary} />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              color: accentSecondary,
              fontWeight: 800,
              fontFamily: 'var(--font-display)'
            }}>
              2. The Synaptic Core
            </h2>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            Stripped of bloat, this lightweight FastAPI microservice acts as the pure neurological center.
            It catches incoming tensor arrays, orchestrates PyTorch inference, and returns deterministic JSON.
          </p>
        </div>

        <div style={{
          gridColumn: 'span 6',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--bg-surface-hover)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Database size={22} color="var(--text-primary)" />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)'
            }}>
              3. The Knowledge Vault
            </h2>
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            The dormant giants. Deep learning models exceeding 2.5GB rest in Hugging Face LFS.
            Upon waking, the Synaptic Core dynamically streams these optimized weights directly into volatile memory.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Globe2 size={28} color={accentColor} />
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)'
          }}>
            Multi-Language Support
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Seamlessly handles both Hindi (Devanagari) and English text in a single document.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Shield size={28} color={accentSecondary} />
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)'
          }}>
            High Accuracy
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Achieves &gt;95% accuracy on handwritten text through ensemble voting.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Sparkles size={28} color="var(--text-primary)" />
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)'
          }}>
            Vector Diagnostic Matrix
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Visualize the inference process with step-by-step character recognition analysis.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: '32px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          marginBottom: '16px'
        }}>
          Our Mission
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.7,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          We believe in breaking language barriers through AI. Our mission is to make document
          digitization accessible to everyone, regardless of the language they write in. By
          focusing on Indic languages like Hindi, we're building technology that serves
          billions of people who have been underserved by traditional OCR solutions.
        </p>
      </div>
    </div>
  );
}
