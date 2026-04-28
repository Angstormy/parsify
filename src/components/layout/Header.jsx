import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut, Settings, UserCircle, Bell } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: UserCircle, label: 'Profile', onClick: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Settings', onClick: () => console.log('Settings clicked') },
    { icon: Bell, label: 'Notifications', onClick: () => console.log('Notifications clicked') },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 sticky top-0 z-10">
      {/* Account menu temporarily hidden
      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Account</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">User Account</p>
                <p className="text-xs text-gray-500">user@parsify.ai</p>
              </div>
              
              <div className="py-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-500" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-1 mt-1">
                <button
                  onClick={() => {
                    console.log('Logout clicked');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      */}
    </header>
  );
}
