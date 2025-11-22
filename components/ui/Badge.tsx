import React from 'react';
import { VoucherStatus } from '../../types';

interface BadgeProps {
  status: VoucherStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  switch (status) {
    case VoucherStatus.ACTIVE:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          Active
        </span>
      );
    case VoucherStatus.REDEEMED:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
          Redeemed
        </span>
      );
    case VoucherStatus.EXPIRED:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Expired
        </span>
      );
    default:
      return null;
  }
};
