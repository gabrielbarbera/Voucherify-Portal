import { Voucher, VoucherStatus, CreateVoucherParams, RedemptionRecord } from '../types';

const STORAGE_KEY = 'voucherify_data';

// Helper to generate a random code like ABCD-1234
const generateCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  result += '-';
  for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

// Initialize some dummy data if empty
const initializeData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const initialVouchers: Voucher[] = [
      {
        id: 'v_1',
        code: 'WELCOME-2024',
        productName: 'Starter Kit',
        initialAmount: 50,
        remainingAmount: 50,
        currency: 'USD',
        status: VoucherStatus.ACTIVE,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        expiresAt: new Date(Date.now() + 86400000 * 30).toISOString(),
        ownerName: 'Demo User',
        ownerEmail: 'demo@user.com',
        history: []
      },
      {
        id: 'v_2',
        code: 'LUNCH-PROMO',
        productName: 'Gourmet Box',
        initialAmount: 20,
        remainingAmount: 0,
        currency: 'USD',
        status: VoucherStatus.REDEEMED,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        expiresAt: new Date(Date.now() + 86400000 * 20).toISOString(),
        ownerName: 'Demo User',
        ownerEmail: 'demo@user.com',
        history: [
          {
            id: 'r_1',
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            amount: 20,
            merchantName: 'Food Co.',
            channel: 'Online Store'
          }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVouchers));
  }
};

export const getVouchers = (): Voucher[] => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getVoucherById = (id: string): Voucher | undefined => {
  const vouchers = getVouchers();
  return vouchers.find(v => v.id === id);
};

export const getVoucherByCode = (code: string): Voucher | undefined => {
  const vouchers = getVouchers();
  return vouchers.find(v => v.code === code);
};

export const createVoucher = (params: CreateVoucherParams): Voucher => {
  const vouchers = getVouchers();
  const newVoucher: Voucher = {
    id: `v_${Date.now()}`,
    code: generateCode(),
    productName: params.productName,
    initialAmount: params.amount,
    remainingAmount: params.amount,
    currency: params.currency,
    status: VoucherStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 86400000 * 365).toISOString(), // 1 year expiry
    ownerName: params.ownerName,
    ownerEmail: params.ownerEmail,
    history: []
  };

  vouchers.unshift(newVoucher);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
  return newVoucher;
};

// Check if a voucher is valid for a specific order amount
export const validateVoucher = (code: string, orderTotal: number) => {
  const voucher = getVoucherByCode(code);
  
  if (!voucher) {
    return { valid: false, message: "Voucher code not found." };
  }
  
  if (voucher.status !== VoucherStatus.ACTIVE) {
    return { valid: false, message: `Voucher is ${voucher.status.toLowerCase()}.` };
  }

  if (new Date(voucher.expiresAt) < new Date()) {
    return { valid: false, message: "Voucher has expired." };
  }

  if (voucher.remainingAmount <= 0) {
    return { valid: false, message: "Voucher has no remaining balance." };
  }

  // Calculate potential discount
  const discount = Math.min(voucher.remainingAmount, orderTotal);
  
  return { 
    valid: true, 
    voucher, 
    discount,
    message: "Voucher applied successfully." 
  };
};

// Simulation function to manually trigger a redemption from the frontend
// (Simulating what the WooCommerce plugin would do via API)
export const simulateRedemption = (code: string, amount: number): Voucher | null => {
  const vouchers = getVouchers();
  const index = vouchers.findIndex(v => v.code === code);
  
  if (index === -1) return null;
  
  const voucher = vouchers[index];
  
  if (voucher.status !== VoucherStatus.ACTIVE || voucher.remainingAmount < amount) {
    throw new Error("Voucher invalid or insufficient funds");
  }

  const newRemaining = voucher.remainingAmount - amount;
  
  const updatedVoucher: Voucher = {
    ...voucher,
    remainingAmount: newRemaining,
    status: newRemaining === 0 ? VoucherStatus.REDEEMED : VoucherStatus.ACTIVE,
    history: [
      {
        id: `r_${Date.now()}`,
        date: new Date().toISOString(),
        amount: amount,
        merchantName: 'WooCommerce Store',
        channel: 'Online Checkout'
      },
      ...voucher.history
    ]
  };

  vouchers[index] = updatedVoucher;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
  return updatedVoucher;
};