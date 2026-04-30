import React from 'react';
import { Globe2, Cpu, Activity } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Globe2 size={24} color="var(--accent-primary)" />,
      title: 'Cognitive Polyglot',
      description: 'Shatter language barriers. From sprawling English cursive to intricate Hindi Devanagari script, Parsify reads with the contextual awareness of a human expert.'
    },
    {
      icon: <Cpu size={24} color="var(--accent-primary)" />,
      title: 'Zero-Latency Edge Execution',
      description: 'Heavyweight intelligence, featherweight footprint. Multi-gigabyte tensor models are streamed dynamically, allowing instantaneous, localized inference.'
    },
    {
      icon: <Activity size={24} color="var(--accent-primary)" />,
      title: 'X-Ray Vision Matrix',
      description: 'Don\'t just get an answer—watch the AI think. Peer directly into the attention layers with real-time beam search decoding and confidence exposure.'
    }
  ];

  return (
    <section className="section" style={{ position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {featureList.map((feature, idx) => (
            <div key={idx} className="card" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
