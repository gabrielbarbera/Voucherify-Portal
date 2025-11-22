import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoreLayoutProps {
  children: React.ReactNode;
}

export const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Store Header */}
      <header className="border-b border-slate-100 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/store" className="text-2xl font-sans font-bold text-slate-900 tracking-tight">
              FreshBox<span className="text-orange-500">.</span>
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <Link to="/store" className="hover:text-orange-500">Shop</Link>
              <span className="cursor-not-allowed opacity-50">Subscriptions</span>
              <span className="cursor-not-allowed opacity-50">Our Story</span>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-slate-400 cursor-pointer" />
            <div className="relative group cursor-pointer">
              <ShoppingCart className="h-5 w-5 text-slate-700 group-hover:text-orange-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
            </div>
            <Menu className="h-5 w-5 text-slate-700 md:hidden" />
          </div>
        </div>
      </header>

      {/* Store Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Store Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; 2024 FreshBox Demo Store. Powered by Voucherify.</p>
          <div className="mt-4 space-x-4">
             <Link to="/" className="text-brand-600 hover:underline">Go to Voucher Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};