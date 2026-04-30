import React, { useState, useRef, useEffect } from 'react';
import { User, Globe, Mail, Code, Zap, Database, Brain } from 'lucide-react';

const teamMembers = [
  {
    name: "Atharva",
    role: "Hindi ML Architect",
    initial: "A",
    color: "#2563eb",
    bio: "The visionary behind Parsify's core Devanagari recognition engine. Atharva spearheaded the development of our recognition pipeline using a high-precision ResNet 50 architecture. By leveraging deep residual learning, he optimized the model to extract complex spatial features from the Devanagari script, achieving over 98% accuracy.",
    achievement: "Optimized ResNet 50 feature extraction for low-resource Hindi datasets.",
    icon: <Zap size={20} />
  },
  {
    name: "Omkar",
    role: "Lead Interface Designer",
    initial: "O",
    color: "#7c3aed",
    bio: "A master of modern web aesthetics, Omkar designed the seamless, 'Sophisticated Slate' interface that defines the Parsify experience. He specializes in creating high-performance, accessible, and motion-rich UIs that make complex AI tasks feel effortless. His 'Bento-Box' layout system provides clarity for professional document management.",
    achievement: "Implemented a custom 3D animation engine for the entire platform.",
    icon: <Code size={20} />
  },
  {
    name: "Shirish",
    role: "Systems & DevOps Lead",
    initial: "S",
    color: "#00f0ff",
    bio: "Shirish is the backbone of Parsify's infrastructure. He engineered our distributed backend architecture using FastAPI and optimized model serving through Docker and Kubernetes. His focus on security and high-availability ensures that Parsify can handle thousands of concurrent document scans without downtime.",
    achievement: "Architected a zero-downtime deployment pipeline for ML models.",
    icon: <Database size={20} />
  },
  {
    name: "Shivansh",
    role: "English ML Specialist",
    initial: "S",
    color: "#ec4899",
    bio: "Shivansh leads the English language OCR division, focusing on high-precision recognition for diverse document types. By implementing advanced beam-search decoding and custom image preprocessing pipelines, he significantly improved recognition for complex handwritten annotations and degraded documents.",
    achievement: "Achieved state-of-the-art results on the ICDAR handwriting dataset.",
    icon: <Brain size={20} />
  }
];

const TeamMemberCard = ({ member, isMobile }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({ 
      x: ((y - rect.height / 2) / (rect.height / 2)) * -6, 
      y: ((x - rect.width / 2) / (rect.width / 2)) * 6 
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setIsHovered(false); }}
      className="bento-card bento-card-interactive"
      style={{ 
        transform: isMobile ? 'none' : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        background: 'var(--bg-surface)',
        border: `1px solid ${isHovered ? member.color + '66' : 'var(--border-subtle)'}`,
        padding: isMobile ? '20px' : '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: isHovered ? `0 20px 40px -10px ${member.color}33` : 'none',
        borderRadius: '24px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: isMobile ? '48px' : '56px', 
          height: isMobile ? '48px' : '56px', 
          borderRadius: '14px', 
          background: `linear-gradient(135deg, ${member.color}33, ${member.color}11)`,
          border: `1px solid ${member.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: isMobile ? '1.2rem' : '1.4rem', 
          fontWeight: 900, color: member.color,
          flexShrink: 0
        }}>
          {member.initial}
        </div>
        <div>
          <h3 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', color: 'var(--text-primary)', fontWeight: 800 }}>{member.name}</h3>
          <p style={{ color: member.color, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</p>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: '1.5', flex: 1 }}>{member.bio}</p>

      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        padding: '12px 16px', 
        borderRadius: '12px', 
        borderLeft: `2px solid ${member.color}`,
        marginTop: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', opacity: 0.5 }}>
          {member.icon}
          <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>Achievement</span>
        </div>
        <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500 }}>{member.achievement}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button className="social-icon-btn"><User size={16} /></button>
        <button className="social-icon-btn"><Globe size={16} /></button>
        <button className="social-icon-btn"><Mail size={16} /></button>
      </div>
    </div>
  );
};

const TeamPage = () => {
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
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: isMobile ? '32px' : '40px',
          transform: 'translateY(0)',
          transition: 'all 0.4s ease'
        }}>
          <h1 className="text-gradient" style={{ fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '12px', fontWeight: 900 }}>Meet Our Team</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem', maxWidth: '600px', margin: '0 auto' }}>
            The expert architects and engineers behind Parsify.
          </p>
        </div>

        <div className="team-grid-container" style={{ gap: isMobile ? '20px' : '24px' }}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} isMobile={isMobile} />
          ))}
        </div>
      </div>
      
      <style>{`
        .social-icon-btn {
          background: transparent;
          border: 1px solid var(--border-subtle);
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .social-icon-btn:hover {
          background: var(--bg-surface-hover);
          color: var(--text-primary);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};


export default TeamPage;
