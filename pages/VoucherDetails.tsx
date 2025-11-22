import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, ShoppingBag, History } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getVoucherById } from '../services/voucherService';
import { Voucher } from '../types';

export const VoucherDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    if (id) {
      const v = getVoucherById(id);
      if (v) setVoucher(v);
    }
  }, [id]);

  if (!voucher) return <Layout><div className="p-8">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="pl-0 text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{voucher.productName}</h1>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>Issued on {new Date(voucher.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>Expires {new Date(voucher.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <Badge status={voucher.status} />
            </div>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-medium text-slate-900 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-slate-400" />
                Balance Information
              </h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Remaining Balance</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">${voucher.remainingAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Initial Value</p>
                <p className="text-3xl font-bold text-slate-400 mt-2">${voucher.initialAmount.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-0">
             <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-medium text-slate-900 flex items-center">
                <History className="h-4 w-4 mr-2 text-slate-400" />
                Redemption History
              </h3>
            </div>
            <div className="p-0">
              {voucher.history.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No activity yet.
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-white text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium border-b border-slate-100">Date</th>
                      <th className="px-6 py-3 font-medium border-b border-slate-100">Action</th>
                      <th className="px-6 py-3 font-medium border-b border-slate-100">Merchant</th>
                      <th className="px-6 py-3 font-medium border-b border-slate-100 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {voucher.history.map((record) => (
                      <tr key={record.id}>
                        <td className="px-6 py-3 text-slate-600">
                          {new Date(record.date).toLocaleDateString()} <span className="text-xs text-slate-400">{new Date(record.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </td>
                        <td className="px-6 py-3 text-slate-900 font-medium">Redeemed</td>
                        <td className="px-6 py-3 text-slate-600">{record.merchantName}</td>
                        <td className="px-6 py-3 text-slate-900 text-right text-red-600 font-medium">-${record.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Code visual */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-brand-900 to-brand-800 text-white p-6 shadow-xl sticky top-6">
            <div className="flex justify-between items-start mb-8">
               <ShoppingBag className="h-8 w-8 text-brand-300" />
               <div className="text-right">
                 <p className="font-bold">{voucher.currency}</p>
                 <p className="text-brand-300 text-xs">Currency</p>
               </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-brand-200 text-xs uppercase tracking-widest mb-2">Voucher Code</p>
              <div className="bg-white/10 rounded-lg py-3 backdrop-blur-sm border border-white/20">
                <p className="text-2xl font-mono font-bold tracking-wider">{voucher.code}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg flex items-center justify-center mb-4">
               {/* Mock QR Code */}
               <div className="w-32 h-32 bg-slate-900" style={{ 
                 backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${voucher.code}')`,
                 backgroundSize: 'cover'
               }}></div>
            </div>

            <p className="text-center text-xs text-brand-200">
              Scan to redeem at point of sale or use code online.
            </p>
          </Card>
        </div>

      </div>
    </Layout>
  );
};
