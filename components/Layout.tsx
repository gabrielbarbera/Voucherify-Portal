import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const navItemClass = (active: boolean) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-brand-50 text-brand-700 font-medium' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Voucherify" className="h-8" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className={navItemClass(isActive('/dashboard'))}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/create" className={navItemClass(isActive('/create'))}>
            <PlusCircle className="h-5 w-5" />
            <span>Create Voucher</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center p-3 space-x-3 rounded-lg bg-slate-50 mb-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
              DU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Demo User</p>
              <p className="text-xs text-slate-500 truncate">demo@user.com</p>
            </div>
          </div>
          <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 px-2 py-2 text-sm">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
