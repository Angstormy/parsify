import React, { useState } from 'react';

const DocsSidebar = ({ docs, activeDocId, setActiveDocId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = docs.filter(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <aside style={{
      width: '320px',
      borderRight: '1px solid var(--border-subtle)',
      height: 'calc(100vh - 100px)',
      position: 'sticky',
      top: '100px',
      overflowY: 'auto',
      padding: '32px 24px',
      background: 'transparent'
    }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
        Documentation
      </h3>
      
      <div style={{ marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search docs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-sans)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
        />
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {filteredDocs.length === 0 && <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center', marginTop: '16px' }}>No results found.</div>}
        
        {filteredDocs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setActiveDocId(doc.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '8px 12px', border: 'none', borderLeft: activeDocId === doc.id ? '3px solid var(--accent-primary)' : '3px solid transparent',
              cursor: 'pointer',
              background: activeDocId === doc.id ? 'var(--bg-surface-hover)' : 'transparent',
              color: activeDocId === doc.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeDocId === doc.id ? 600 : 500,
              textAlign: 'left',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.1s ease',
              borderRadius: '0 6px 6px 0'
            }}
          >
            <span style={{ flex: 1 }}>{doc.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
