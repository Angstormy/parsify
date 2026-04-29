import {
  Home,
  Info,
  Users,
  Search,
  X,
  FileText
} from 'lucide-react';
import logo from '../../assets/Parsify.png';

const menuItems = [
  { id: 'home', icon: Home, label: 'HOME' },
  { id: 'about', icon: Info, label: 'Architecture' },
  { id: 'team', icon: Users, label: 'Team Members' },
  { id: 'docs', icon: FileText, label: 'Documentation' },
];

export default function Sidebar({ activeSection, onSectionChange, isMobile, onClose }) {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-full flex flex-col flex-shrink-0">
      {/* Logo - with close button on mobile */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-1">
            <img 
              src={logo} 
              alt="Parsify" 
              className="h-42 w-auto object-contain"
            />
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Features
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          © 2026 Parsify Intelligence
        </p>
      </div>
    </aside>
  );
}
