import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import logo from '../src/assets/logo.svg';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Fake auth delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Voucherify" className="h-12" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to Portal</h1>
          <p className="text-slate-500 mt-2">Manage your product vouchers and redemptions</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input 
                type="email" 
                defaultValue="demo@user.com"
                className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                readOnly
              />
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">OR START SHOPPING</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <Link to="/store">
                <Button type="button" variant="outline" fullWidth>
                    <ShoppingBag className="mr-2 h-4 w-4" /> Go to Demo Store
                </Button>
            </Link>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              Demo Mode: Just click Sign in
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};