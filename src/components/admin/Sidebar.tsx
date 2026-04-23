import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: FolderOpen, label: 'Projects', path: '/admin/projects' },
  { icon: SettingsIcon, label: 'Settings', path: '/admin/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-primary text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-primary-light">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <span className="text-accent font-bold text-sm">Urbanworks</span>
            <span className="block text-xs text-gray-light">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-gray-light hover:bg-primary-light hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-primary-light">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-xs font-medium text-gray-light hover:bg-primary-light hover:text-white transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
