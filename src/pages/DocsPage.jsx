import React, { useState, useEffect, useRef } from 'react';
import DocsSidebar from '../components/DocsSidebar';
import DocsContent from '../components/DocsContent';
import { docsContent } from '../data/docsContent';
import { Menu, X } from 'lucide-react';

const DocsPage = () => {
  const [activeDocId, setActiveDocId] = useState(docsContent[0]?.id);
  const activeDoc = docsContent.find(doc => doc.id === activeDocId);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobile) setIsSidebarOpen(false);
  }, [activeDocId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : '280px minmax(0, 1fr)', 
      minHeight: '100vh', 
      width: '100%', 
      maxWidth: '1600px', 
      margin: '0 auto', 
      paddingTop: isMobile ? '70px' : '90px',
      background: 'var(--bg-base)',
      transition: 'all 0.4s ease',
      position: 'relative'
    }}>
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            color: '#000',
            border: 'none',
            boxShadow: '0 10px 25px var(--accent-glow)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar - responsive behavior */}
      <div style={{
        position: isMobile ? 'fixed' : 'sticky',
        top: isMobile ? 0 : '90px',
        left: 0,
        bottom: 0,
        width: isMobile ? '280px' : 'auto',
        zIndex: isMobile ? 1050 : 1,
        background: 'var(--bg-base)',
        borderRight: '1px solid var(--border-subtle)',
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.3s ease, top 0.4s ease',
        visibility: isMobile && !isSidebarOpen ? 'hidden' : 'visible'
      }}>
        <DocsSidebar docs={docsContent} activeDocId={activeDocId} setActiveDocId={setActiveDocId} />
      </div>

      {/* Backdrop for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1040
          }}
        />
      )}
      
      <div style={{ 
        padding: isMobile ? '0 24px' : '0 48px', 
        overflowY: 'visible', 
        background: 'var(--bg-base)',
        transition: 'padding 0.3s ease'
      }}>
        <DocsContent doc={activeDoc} allDocs={docsContent} setActiveDocId={setActiveDocId} />
      </div>
    </div>
  );
};

export default DocsPage;
