import React from 'react';
import { Terminal } from 'lucide-react';

const DiagnosticMatrix = ({ steps }) => {
  const getConfColor = (conf) => {
    if (conf > 0.8) return '#10b981'; // Emerald
    if (conf > 0.4) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="glass-panel" style={{ background: 'rgba(10, 10, 15, 0.9)', padding: '0', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      {/* Terminal Header */}
      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
        <Terminal size={18} color="var(--text-secondary)" />
        <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>parsify/vector-diagnostics.sh</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
        </div>
      </div>

      {/* Matrix Body */}
      <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '0.875rem', maxHeight: '500px', overflowY: 'auto' }}>
        {steps.map((wordObj, wIdx) => (
          <div key={wIdx} style={{ marginBottom: '32px' }}>
            <div style={{ color: 'var(--text-primary)', fontSize: '1.125rem', marginBottom: '16px', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '8px', display: 'inline-block' }}>
              TARGET_WORD: <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{wordObj.word}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {wordObj.steps && wordObj.steps.map((step, sIdx) => (
                <div key={`${wIdx}-${sIdx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-secondary)', minWidth: '40px', fontWeight: 'bold' }}>S{step.step}</div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {step.top_candidates && step.top_candidates.map((cand, cIdx) => (
                      <div key={cIdx} style={{ 
                        border: `1px solid ${cIdx === 0 ? getConfColor(cand.confidence) : 'transparent'}`,
                        background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: '6px',
                        display: 'flex', alignItems: 'center', gap: '12px'
                      }}>
                        <span style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>{cand.char === '<eos>' ? '⌁' : cand.char}</span>
                        <span style={{ color: getConfColor(cand.confidence), fontWeight: 'bold' }}>
                          {Math.round(cand.confidence * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticMatrix;
