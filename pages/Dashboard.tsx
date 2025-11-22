import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight, RefreshCw } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getVouchers, simulateRedemption } from '../services/voucherService';
import { Voucher, VoucherStatus } from '../types';

export const Dashboard: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const navigate = useNavigate();

  const loadData = () => {
    setVouchers(getVouchers());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Demo functionality: Simulate external redemption
  const handleSimulateRedemption = (code: string, amount: number) => {
    if(confirm(`Simulate WooCommerce redeeming $${amount} from ${code}?`)) {
      try {
        simulateRedemption(code, amount);
        loadData(); // Refresh UI
      } catch (e) {
        alert("Failed to redeem: " + e);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vouchers</h1>
          <p className="text-slate-500">Manage and track your issued vouchers.</p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Voucher
          </Button>
        </Link>
      </div>

      {/* Stats Cards (Simplified) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm font-medium text-slate-500">Active Value</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            ${vouchers.filter(v => v.status === VoucherStatus.ACTIVE).reduce((acc, v) => acc + v.remainingAmount, 0).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-slate-500">Total Vouchers</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{vouchers.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-slate-500">Redeemed</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {vouchers.filter(v => v.status === VoucherStatus.REDEEMED).length}
          </p>
        </Card>
      </div>

      <Card>
        <div className="border-b border-slate-200 p-4 flex items-center justify-between bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by code or product..."
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={loadData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vouchers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No vouchers found. Create one to get started.
                  </td>
                </tr>
              ) : (
                vouchers.map((voucher) => (
                  <tr key={voucher.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      {voucher.code}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {voucher.productName}
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      ${voucher.remainingAmount.toFixed(2)} 
                      <span className="text-slate-400 text-xs ml-1">/ ${voucher.initialAmount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={voucher.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(voucher.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end space-x-2">
                       {/* Demo Tool for testing the flow without WooCommerce */}
                       {voucher.status === VoucherStatus.ACTIVE && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleSimulateRedemption(voucher.code, voucher.remainingAmount); }}
                          className="text-xs text-orange-500 hover:text-orange-700 underline mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Simulate WooCommerce Redemption"
                        >
                          Demo Redeem
                        </button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/vouchers/${voucher.id}`)}
                      >
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
};