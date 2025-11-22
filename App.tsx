import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateVoucher } from './pages/CreateVoucher';
import { VoucherSuccess } from './pages/VoucherSuccess';
import { VoucherDetails } from './pages/VoucherDetails';
import { ProductPage } from './pages/store/ProductPage';
import { Checkout } from './pages/store/Checkout';
import { OrderConfirmation } from './pages/store/OrderConfirmation';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Portal Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateVoucher />} />
        <Route path="/success/:id" element={<VoucherSuccess />} />
        <Route path="/vouchers/:id" element={<VoucherDetails />} />

        {/* Demo Store Routes */}
        <Route path="/store" element={<ProductPage />} />
        <Route path="/store/checkout" element={<Checkout />} />
        <Route path="/store/confirmation" element={<OrderConfirmation />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;