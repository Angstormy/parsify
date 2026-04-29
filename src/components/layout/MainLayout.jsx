import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout({ children, activeSection, onSectionChange, onEngineClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Floating Navbar - Desktop Only */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        onEngineClick={onEngineClick}
        isMobile={isMobile}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Mobile Only */}
      {isMobile && (
        <div className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar
            activeSection={activeSection}
            onSectionChange={(section) => {
              onSectionChange(section);
              closeSidebar();
            }}
            isMobile={isMobile}
            onClose={closeSidebar}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header with Hamburger */}
        {isMobile && (
          <header className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Parsify</span>
            <div className="w-10" />
          </header>
        )}

        <main className="flex-1 p-4 lg:p-6 overflow-auto" style={{ paddingTop: isMobile ? '1rem' : '100px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
