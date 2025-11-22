import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Ticket, Loader2, Check, ExternalLink } from 'lucide-react';
import { StoreLayout } from '../../components/StoreLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { validateVoucher, simulateRedemption } from '../../services/voucherService';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'voucher'>('card');
  const [voucherCode, setVoucherCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, discount: number, remaining: number} | null>(null);
  const [error, setError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const orderTotal = 20.00;
  const finalTotal = appliedVoucher ? Math.max(0, orderTotal - appliedVoucher.discount) : orderTotal;

  const handleApplyVoucher = () => {
    if (!voucherCode) return;
    setIsValidating(true);
    setError('');

    // Simulate network request
    setTimeout(() => {
      const result = validateVoucher(voucherCode, orderTotal);
      setIsValidating(false);
      
      if (result.valid && result.voucher) {
        setAppliedVoucher({
          code: result.voucher.code,
          discount: result.discount || 0,
          remaining: result.voucher.remainingAmount
        });
      } else {
        setError(result.message || 'Invalid voucher');
        setAppliedVoucher(null);
      }
    }, 800);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    
    setTimeout(() => {
      if (paymentMethod === 'voucher' && appliedVoucher) {
        try {
          simulateRedemption(appliedVoucher.code, appliedVoucher.discount);
          navigate('/store/confirmation', { state: { method: 'voucher', total: finalTotal } });
        } catch (e) {
          setError('Failed to process voucher redemption.');
          setIsPlacingOrder(false);
        }
      } else {
        // Card payment success
        navigate('/store/confirmation', { state: { method: 'card', total: orderTotal } });
      }
    }, 1500);
  };

  return (
    <StoreLayout>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Billing & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Billing Details (Visual only) */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                <input type="text" defaultValue="Demo" className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                <input type="text" defaultValue="User" className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                <input type="text" defaultValue="123 Voucher Lane" className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input type="email" defaultValue="demo@user.com" className="w-full p-2 bg-white text-slate-900 border border-slate-300 rounded" />
              </div>
            </div>
          </Card>

          {/* Payment Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Payment</h2>
            
            <div className="space-y-4">
              {/* Card Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <div className="ml-3 flex items-center w-full justify-between">
                    <span className="font-medium text-slate-900">Credit Card</span>
                    <div className="flex space-x-2 text-slate-400">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                   <div className="mt-4 pl-7 text-sm text-slate-500">
                      Pay securely using your credit card via Stripe.
                   </div>
                )}
              </div>

              {/* Voucher Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'voucher' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                onClick={() => setPaymentMethod('voucher')}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    checked={paymentMethod === 'voucher'} 
                    onChange={() => setPaymentMethod('voucher')}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <div className="ml-3 flex items-center w-full justify-between">
                    <span className="font-medium text-slate-900">Pay with Voucher</span>
                    <Ticket className="h-5 w-5 text-slate-500" />
                  </div>
                </div>

                {/* Voucher Logic Panel */}
                {paymentMethod === 'voucher' && (
                   <div className="mt-4 pl-7">
                      <p className="text-sm text-slate-600 mb-3">Enter your unique voucher code to redeem.</p>
                      
                      {!appliedVoucher ? (
                        <div className="space-y-3">
                          <div className="flex space-x-2">
                            <input 
                              type="text" 
                              placeholder="ABCD-1234"
                              value={voucherCode}
                              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                              className="flex-1 border border-slate-300 bg-white text-slate-900 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                            <Button 
                              size="sm" 
                              onClick={(e) => { e.stopPropagation(); handleApplyVoucher(); }}
                              disabled={isValidating || !voucherCode}
                              className="bg-slate-800 hover:bg-slate-900 text-white"
                            >
                              {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                            </Button>
                          </div>
                          
                          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                          {/* DEEP LINK to Create Voucher */}
                          <a 
                            href={`#/create?product_name=Premium Food Box&amount=${orderTotal}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-orange-600 hover:text-orange-800 font-medium hover:underline mt-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Create a new voucher for this product
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      ) : (
                        <div className="bg-white border border-green-200 rounded-md p-3 flex items-start justify-between">
                          <div>
                            <p className="text-sm font-bold text-green-700 flex items-center">
                              <Check className="h-4 w-4 mr-1" /> Voucher Applied
                            </p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">{appliedVoucher.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">-${appliedVoucher.discount.toFixed(2)}</p>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setAppliedVoucher(null); setVoucherCode(''); }}
                              className="text-xs text-slate-400 underline hover:text-red-500 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                   </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Premium Food Box x 1</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              
              {appliedVoucher && (
                <div className="flex justify-between text-green-600 font-medium pt-2 border-t border-dashed border-slate-200">
                  <span>Voucher ({appliedVoucher.code.substring(0,4)}...)</span>
                  <span>-${appliedVoucher.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold text-slate-900 pt-4 border-t border-slate-200">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              fullWidth 
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || (paymentMethod === 'voucher' && !appliedVoucher)}
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Placing Order...
                </>
              ) : 'Place Order'}
            </Button>
            
            <div className="mt-4 text-xs text-center text-slate-400">
              This is a demo. No real payment will be processed.
            </div>
          </Card>
        </div>
      </div>
    </StoreLayout>
  );
};