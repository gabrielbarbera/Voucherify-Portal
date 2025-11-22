export enum VoucherStatus {
  ACTIVE = 'ACTIVE',
  REDEEMED = 'REDEEMED',
  EXPIRED = 'EXPIRED',
}

export interface RedemptionRecord {
  id: string;
  date: string; // ISO string
  amount: number;
  merchantName: string;
  channel: string;
}

export interface Voucher {
  id: string;
  code: string;
  productName: string;
  initialAmount: number;
  remainingAmount: number;
  currency: string;
  status: VoucherStatus;
  createdAt: string; // ISO string
  expiresAt: string; // ISO string
  ownerName: string;
  ownerEmail: string;
  history: RedemptionRecord[];
}

export interface CreateVoucherParams {
  productName: string;
  amount: number;
  currency: string;
  ownerName: string;
  ownerEmail: string;
}
