import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ children, activeSection, onSectionChange }) {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
