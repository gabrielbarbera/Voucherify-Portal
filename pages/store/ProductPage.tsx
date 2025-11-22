import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck } from 'lucide-react';
import { StoreLayout } from '../../components/StoreLayout';
import { Button } from '../../components/ui/Button';

export const ProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StoreLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-slate-100 rounded-xl overflow-hidden aspect-square relative group">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Fresh Food Box" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
            Voucher Eligible
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1 text-yellow-400 mb-4">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <span className="text-slate-400 text-sm ml-2">(128 reviews)</span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4 font-sans">Premium Food Box</h1>
          <div className="text-2xl text-slate-700 mb-6 font-medium">$20.00</div>

          <p className="text-slate-600 mb-8 leading-relaxed">
            A curated selection of fresh, organic ingredients delivered straight to your door. 
            Perfect for healthy meal prep and discovering new flavors. Includes 5-7 seasonal items.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-sm text-slate-600">
              <Truck className="h-5 w-5 mr-3 text-orange-500" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <ShieldCheck className="h-5 w-5 mr-3 text-orange-500" />
              Satisfaction guaranteed
            </div>
          </div>

          <div className="flex space-x-4">
            <input 
              type="number" 
              defaultValue="1" 
              className="w-20 px-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
            <Button 
              onClick={() => navigate('/store/checkout')} 
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-lg h-auto py-3"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};