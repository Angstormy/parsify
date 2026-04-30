import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocsContent = ({ doc, allDocs, setActiveDocId }) => {
  if (!doc) return <div style={{ padding: '48px', color: 'var(--text-secondary)' }}>Select a document from the sidebar.</div>;

  const currentIndex = allDocs ? allDocs.findIndex(d => d.id === doc.id) : -1;
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex !== -1 && currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <article style={{ flex: 1, padding: '48px', maxWidth: '900px', margin: '0 auto' }}>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '32px' }}>{doc.title}</h1>
      
      {/* Hero Diagram Image */}
      {doc.image && (
        <div style={{ padding: '8px', marginBottom: '48px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <img 
            src={doc.image} 
            alt={doc.title} 
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
        </div>
      )}

      {/* Markdown Content Styling wrapper */}
      <div className="markdown-body" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.8 }}>
        <style>{`
          .markdown-body h1, .markdown-body h2, .markdown-body h3 {
            color: var(--text-primary);
            margin-top: 2.5em;
            margin-bottom: 1em;
            font-family: var(--font-display);
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .markdown-body h1 {
            font-size: 2.5rem;
            margin-top: 1em;
            padding-bottom: 0.5em;
            border-bottom: 1px solid var(--border-subtle);
          }
          .markdown-body h2 { 
            font-size: 1.75rem; 
          }
          .markdown-body p { 
            margin-bottom: 1.75em; 
            color: var(--text-secondary);
            font-family: var(--font-sans);
          }
          .markdown-body ul, .markdown-body ol { 
            margin-bottom: 1.75em; 
            padding-left: 2em; 
          }
          .markdown-body li { 
            margin-bottom: 0.5em; 
          }
          .markdown-body strong { 
            color: var(--text-primary); 
            font-weight: 600;
          }
          .markdown-body code {
            background: var(--bg-surface-hover);
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9em;
            color: var(--accent-primary);
          }
          .markdown-body pre code {
            background: transparent;
            color: #ffffff; /* Always white on black background */
            padding: 0;
          }
          .markdown-body pre {
            background: #0a0a0a; /* Deep dark background */
            padding: 1.5em;
            border-radius: 12px;
            border: 1px solid var(--border-subtle);
            overflow-x: auto;
            margin-bottom: 2em;
          }
          .markdown-body blockquote {
            border-left: 3px solid var(--accent-primary);
            padding-left: 1.5em;
            color: var(--text-secondary);
            font-style: italic;
            background: var(--bg-surface-hover);
            padding: 1.5em;
            border-radius: 0 12px 12px 0;
            margin: 2em 0;
          }
          .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 2em; }
          .markdown-body th, .markdown-body td { border-bottom: 1px solid var(--border-subtle); padding: 16px; text-align: left; }
          .markdown-body th { color: var(--text-primary); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
          .markdown-body a { color: var(--accent-primary); text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
          .markdown-body a:hover { border-bottom-color: var(--accent-primary); }
          .doc-nav-btn:hover { background: var(--bg-surface-hover) !important; }
        `}</style>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {doc.content}
        </ReactMarkdown>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border-subtle)' }}>
        {prevDoc ? (
          <button className="doc-nav-btn" onClick={() => { setActiveDocId(prevDoc.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textAlign: 'left', background: 'transparent', border: '1px solid var(--border-subtle)', padding: '16px 24px', borderRadius: '12px', cursor: 'pointer', flex: 1, marginRight: '16px', transition: 'all 0.2s' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Previous</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>&larr; {prevDoc.title}</div>
          </button>
        ) : <div style={{ flex: 1, marginRight: '16px' }}></div>}
        
        {nextDoc ? (
          <button className="doc-nav-btn" onClick={() => { setActiveDocId(nextDoc.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textAlign: 'right', background: 'transparent', border: '1px solid var(--border-subtle)', padding: '16px 24px', borderRadius: '12px', cursor: 'pointer', flex: 1, marginLeft: '16px', transition: 'all 0.2s' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Next</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{nextDoc.title} &rarr;</div>
          </button>
        ) : <div style={{ flex: 1, marginLeft: '16px' }}></div>}
      </div>

    </article>
  );
};

export default DocsContent;
