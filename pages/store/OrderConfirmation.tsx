import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Ticket } from 'lucide-react';
import { StoreLayout } from '../../components/StoreLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as { method: string, total: number } | null;

  return (
    <StoreLayout>
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-brand-100 text-brand-600 mb-8 animate-bounce">
          <CheckCircle className="h-10 w-10" />
        </div>
        
        <h1 className="text-4xl font-sans font-bold text-slate-900 mb-4">Order Confirmed</h1>
        <p className="text-lg text-slate-600 mb-12">
          Thank you for your order. We've received your request and are preparing your box!
        </p>

        <Card className="p-8 mb-12 text-left">
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
            <div>
              <p className="text-sm text-slate-500">Order Number</p>
              <p className="font-mono font-bold text-slate-900">#WOO-{Math.floor(Math.random() * 10000)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Date</p>
              <p className="font-medium text-slate-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Payment Method</span>
              <span className="font-medium text-slate-900 flex items-center">
                {state?.method === 'voucher' ? (
                    <><Ticket className="h-4 w-4 mr-2 text-orange-500" /> Voucher</>
                ) : (
                    'Credit Card'
                )}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-lg font-bold text-slate-900">Total Paid</span>
              <span className="text-lg font-bold text-slate-900">${state?.total.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </Card>

        <div className="flex justify-center space-x-4">
          <Link to="/store">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-slate-900 hover:bg-slate-800">
              Go to Voucher Portal <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </StoreLayout>
  );
};