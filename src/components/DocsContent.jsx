import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CustomPre = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const extractText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
  };

  const textToCopy = extractText(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      background: '#0a0a0a',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '2em',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '8px 16px',
        minHeight: '40px'
      }}>
        <button 
          onClick={handleCopy}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#ffffff',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)'
          }}
        >
          {copied ? 'Copied!' : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '1.5em', border: 'none', background: 'transparent', overflowX: 'auto', boxSizing: 'border-box', maxWidth: '100%' }} {...props}>{children}</pre>
    </div>
  );
};

const DocsContent = ({ doc, allDocs, setActiveDocId }) => {
  if (!doc) return <div style={{ padding: '48px', color: 'var(--text-secondary)' }}>Select a document from the sidebar.</div>;

  const currentIndex = allDocs ? allDocs.findIndex(d => d.id === doc.id) : -1;
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex !== -1 && currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <article className="docs-content-wrapper">
      
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
          .docs-content-wrapper {
            flex: 1;
            padding: 48px;
            max-width: 900px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .docs-content-title {
            font-size: 3rem;
            margin-bottom: 32px;
            font-family: var(--font-display);
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--text-primary);
          }
          .doc-nav-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 64px;
            padding-top: 32px;
            border-top: 1px solid var(--border-subtle);
            gap: 16px;
          }
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
            max-width: 100%;
            box-sizing: border-box;
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
          .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 2em; display: block; overflow-x: auto; }
          .markdown-body th, .markdown-body td { border-bottom: 1px solid var(--border-subtle); padding: 16px; text-align: left; }
          .markdown-body th { color: var(--text-primary); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
          .markdown-body a { color: var(--accent-primary); text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
          .markdown-body a:hover { border-bottom-color: var(--accent-primary); }
          .doc-nav-btn:hover { background: var(--bg-surface-hover) !important; }
          .markdown-body img { max-width: 100%; height: auto; }

          @media (max-width: 768px) {
            .docs-content-wrapper {
              padding: 24px 0;
            }
            .docs-content-title {
              font-size: 2rem;
              margin-bottom: 24px;
            }
            .markdown-body {
              font-size: 1.125rem !important;
            }
            .markdown-body h1 {
              font-size: 2.25rem !important;
            }
            .markdown-body h2 {
              font-size: 1.75rem !important;
            }
            .doc-nav-wrapper {
              flex-direction: column;
              gap: 16px;
            }
            .doc-nav-btn {
              margin: 0 !important;
              text-align: center !important;
            }
          }
        `}</style>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            pre: CustomPre
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </div>

      <div className="doc-nav-wrapper">
        {prevDoc ? (
          <button className="doc-nav-btn" onClick={() => { setActiveDocId(prevDoc.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textAlign: 'left', background: 'transparent', border: '1px solid var(--border-subtle)', padding: '16px 24px', borderRadius: '12px', cursor: 'pointer', flex: 1, transition: 'all 0.2s' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Previous</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>&larr; {prevDoc.title}</div>
          </button>
        ) : <div style={{ flex: 1 }}></div>}
        
        {nextDoc ? (
          <button className="doc-nav-btn" onClick={() => { setActiveDocId(nextDoc.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textAlign: 'right', background: 'transparent', border: '1px solid var(--border-subtle)', padding: '16px 24px', borderRadius: '12px', cursor: 'pointer', flex: 1, transition: 'all 0.2s' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Next</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{nextDoc.title} &rarr;</div>
          </button>
        ) : <div style={{ flex: 1 }}></div>}
      </div>

    </article>
  );
};

export default DocsContent;
