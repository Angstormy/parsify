import { useState } from 'react';
import { Zap, Code, Database, Brain } from 'lucide-react';

const teamMembers = [
  {
    name: 'Atharva',
    role: 'Hindi ML Architect',
    initial: 'A',
    color: '#2563eb',
    bio: 'The visionary behind Parsify\'s core Devanagari recognition engine. Atharva spearheaded the development of our recognition pipeline using a high-precision ResNet 50 architecture. By leveraging deep residual learning, he optimized the model to extract complex spatial features from the Devanagari script, achieving over 98% accuracy.',
    achievement: 'Optimized ResNet 50 feature extraction for low-resource Hindi datasets.',
    icon: Zap
  },
  {
    name: 'Omkar',
    role: 'Lead Interface Designer',
    initial: 'O',
    color: '#7c3aed',
    bio: 'A master of modern web aesthetics, Omkar designed the seamless, \'Sophisticated Slate\' interface that defines the Parsify experience. He specializes in creating high-performance, accessible, and motion-rich UIs that make complex AI tasks feel effortless. His \'Bento-Box\' layout system provides clarity for professional document management.',
    achievement: 'Implemented a custom animation engine for the entire platform.',
    icon: Code
  },
  {
    name: 'Shirish',
    role: 'Systems & DevOps Lead',
    initial: 'S',
    color: '#00f0ff',
    bio: 'Shirish is the backbone of Parsify\'s infrastructure. He engineered our distributed backend architecture using FastAPI and optimized model serving through Docker and Kubernetes. His focus on security and high-availability ensures that Parsify can handle thousands of concurrent document scans without downtime.',
    achievement: 'Architected a zero-downtime deployment pipeline for ML models.',
    icon: Database
  },
  {
    name: 'Shivansh',
    role: 'English ML Specialist',
    initial: 'S',
    color: '#ec4899',
    bio: 'Shivansh leads the English language OCR division, focusing on high-precision recognition for diverse document types. By implementing advanced beam-search decoding and custom image preprocessing pipelines, he significantly improved recognition for complex handwritten annotations and degraded documents.',
    achievement: 'Achieved state-of-the-art results on the ICDAR handwriting dataset.',
    icon: Brain
  }
];

export default function TeamMembers() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '12px',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)'
        }}>
          Meet Our <span style={{ color: 'var(--accent-primary)' }}>Team</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          The expert architects and engineers behind Parsify.
        </p>
      </div>

      {/* Team Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {teamMembers.map((member, index) => {
          const Icon = member.icon;
          const isHovered = hoveredCard === index;

          return (
            <div
              key={member.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: 'var(--bg-surface)',
                backdropFilter: 'blur(24px)',
                border: `1px solid ${isHovered ? member.color + '66' : 'var(--border-subtle)'}`,
                borderRadius: '24px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                boxShadow: isHovered ? `0 20px 40px -10px ${member.color}33` : 'none',
                cursor: 'default'
              }}
            >
              {/* Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${member.color}33, ${member.color}11)`,
                  border: `1px solid ${member.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: member.color,
                  flexShrink: 0
                }}>
                  {member.initial}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    color: member.color,
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                flex: 1
              }}>
                {member.bio}
              </p>

              {/* Achievement */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '12px 16px',
                borderRadius: '12px',
                borderLeft: `2px solid ${member.color}`,
                marginTop: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                  opacity: 0.7
                }}>
                  <Icon size={16} color={member.color} />
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)'
                  }}>
                    Achievement
                  </span>
                </div>
                <p style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}>
                  {member.achievement}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
