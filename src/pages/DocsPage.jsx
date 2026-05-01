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

  useEffect(() => {
    const handleToggle = () => setIsSidebarOpen(prev => !prev);
    window.addEventListener('toggle-docs-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-docs-sidebar', handleToggle);
  }, []);

  return (
    <div style={{ 
      display: isMobile ? 'block' : 'grid', 
      gridTemplateColumns: isMobile ? 'none' : '320px minmax(0, 1fr)', 
      minHeight: '100vh', 
      width: '100%', 
      maxWidth: '100vw', 
      margin: '0 auto', 
      paddingTop: isMobile ? '70px' : '90px',
      background: 'var(--bg-base)',
      transition: 'all 0.4s ease',
      position: 'relative'
    }}>
      {/* Sidebar - responsive behavior */}
      <div style={{
        position: isMobile ? 'fixed' : 'sticky',
        top: isMobile ? 0 : '110px',
        left: 0,
        bottom: 0,
        width: isMobile ? '300px' : 'auto',
        zIndex: isMobile ? 1220 : 1,
        background: 'var(--bg-base)',
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        visibility: isMobile && !isSidebarOpen ? 'hidden' : 'visible',
        height: isMobile ? '100%' : 'calc(100vh - 110px)',
        overflowY: 'auto',
        alignSelf: isMobile ? 'auto' : 'start',
        borderRight: isMobile ? '1px solid var(--border-subtle)' : 'none',
        boxShadow: isMobile ? '12px 0 40px rgba(0,0,0,0.65)' : 'none',
        paddingTop: isMobile ? '80px' : '0'
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
            backdropFilter: 'blur(8px)',
            zIndex: 1210
          }}
        />
      )}
      
      <div style={{ 
        padding: isMobile ? '0 12px' : '0 48px', 
        overflowY: 'visible', 
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        background: 'var(--bg-base)',
        transition: 'padding 0.3s ease'
      }}>
        <DocsContent doc={activeDoc} allDocs={docsContent} setActiveDocId={setActiveDocId} />
      </div>
    </div>
  );
};

export default DocsPage;
