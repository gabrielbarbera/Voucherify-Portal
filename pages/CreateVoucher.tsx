import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ShoppingBag, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createVoucher } from '../services/voucherService';

export const CreateVoucher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Pre-fill from Query Params (simulating incoming link from WooCommerce)
  const productParam = searchParams.get('product_name') || '';
  const amountParam = parseFloat(searchParams.get('amount') || '0');

  const [formData, setFormData] = useState({
    productName: productParam || 'Generic Voucher',
    amount: amountParam || 50,
    ownerName: 'Demo User',
    ownerEmail: 'demo@user.com',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // If we have params, we might want to lock fields
    if (productParam) {
        // Logic to potentially auto-advance could go here
    }
  }, [productParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else {
      setIsProcessing(true);
      // Simulate Payment Gateway delay
      setTimeout(() => {
        const newVoucher = createVoucher({
          productName: formData.productName,
          amount: formData.amount,
          currency: 'USD',
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail
        });
        
        setIsProcessing(false);
        navigate(`/success/${newVoucher.id}`, { state: { fromCreation: true } });
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
           <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-4 pl-0">
             <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
           </Button>
           <h1 className="text-2xl font-bold text-slate-900">
             {step === 'details' ? 'Create Voucher' : 'Payment Details'}
           </h1>
           <p className="text-slate-500">
             {step === 'details' 
               ? 'Configure the voucher details or verify the product.' 
               : 'Enter payment information to issue this voucher.'}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 'details' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                        <div className="relative">
                          <ShoppingBag className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <input 
                            type="text" 
                            value={formData.productName}
                            onChange={e => setFormData({...formData, productName: e.target.value})}
                            readOnly={!!productParam} // Read only if passed from external
                            className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${!!productParam ? 'bg-slate-50 text-slate-500' : 'bg-white text-slate-900'}`}
                          />
                        </div>
                        {!!productParam && <p className="text-xs text-slate-500 mt-1">Locked to specific product</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Voucher Value (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-500">$</span>
                          <input 
                            type="number" 
                            value={formData.amount}
                            onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                            readOnly={!!amountParam}
                            className={`w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${!!amountParam ? 'bg-slate-50 text-slate-500' : 'bg-white text-slate-900'}`}
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                         <h3 className="text-sm font-medium text-slate-900 mb-4">Recipient Details</h3>
                         <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                              <input 
                                type="text"
                                value={formData.ownerName}
                                onChange={e => setFormData({...formData, ownerName: e.target.value})}
                                className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                              <input 
                                type="email"
                                value={formData.ownerEmail}
                                onChange={e => setFormData({...formData, ownerEmail: e.target.value})}
                                className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                         </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Fake Payment Form */}
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-slate-500">Total to pay</span>
                          <span className="font-bold text-slate-900 text-lg">${formData.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span>Product</span>
                          <span>{formData.productName}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full pl-9 pr-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            defaultValue="4242 4242 4242 4242"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            defaultValue="12/25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                          <input 
                            type="text" 
                            placeholder="123"
                            className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                            defaultValue="123"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                        <ShieldCheck className="h-4 w-4 text-brand-600" />
                        <span>Payments are secure and encrypted.</span>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Button type="submit" fullWidth disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
                        </>
                      ) : (
                        step === 'details' ? 'Continue to Payment' : `Pay $${formData.amount.toFixed(2)}`
                      )}
                    </Button>
                    {step === 'payment' && (
                      <button 
                        type="button"
                        onClick={() => setStep('details')}
                        className="w-full text-center text-sm text-slate-500 mt-4 hover:text-slate-800"
                        disabled={isProcessing}
                      >
                        Go back
                      </button>
                    )}
                  </div>
               </form>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="md:col-span-1">
             <div className="bg-brand-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                
                <h3 className="text-lg font-bold mb-1">{formData.productName || 'New Voucher'}</h3>
                <p className="text-brand-100 text-sm mb-6">Digital Voucher</p>

                <div className="text-3xl font-bold mb-2">${formData.amount || '0'}</div>
                <p className="text-xs text-brand-200 mb-6">Valid for 12 months from purchase.</p>

                <div className="border-t border-white/20 pt-4 mt-auto">
                   <div className="h-2 w-16 bg-white/30 rounded-full mb-2"></div>
                   <div className="h-2 w-10 bg-white/30 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};