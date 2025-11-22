import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getVoucherById } from '../services/voucherService';
import { Voucher } from '../types';

export const VoucherSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const v = getVoucherById(id);
      if (v) setVoucher(v);
    }
  }, [id]);

  const handleCopy = () => {
    if (voucher?.code) {
      navigator.clipboard.writeText(voucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!voucher) return (
    <Layout>
      <div className="text-center py-12">Loading...</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-xl mx-auto text-center pt-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-100 text-brand-600 mb-6 animate-bounce">
          <CheckCircle className="h-8 w-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Voucher Created!</h1>
        <p className="text-slate-500 mb-8">
          Your voucher for <strong>{voucher.productName}</strong> is ready to use.
        </p>

        <Card className="p-8 mb-8 border-brand-200 ring-4 ring-brand-50 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Voucher Code</p>
            <div className="text-4xl font-mono font-bold text-slate-900 mb-6 tracking-wide">
              {voucher.code}
            </div>
            
            <Button onClick={handleCopy} variant="outline" className="min-w-[140px]">
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-brand-600" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" /> Copy Code
                </>
              )}
            </Button>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        </Card>

        <div className="space-y-3">
          <div className="text-sm text-slate-500">
            Use this code at checkout to redeem your product.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full sm:w-auto">
                Back to Vouchers
              </Button>
            </Link>
            <Link to={`/vouchers/${voucher.id}`}>
              <Button variant="ghost" className="w-full sm:w-auto">
                View Details <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
