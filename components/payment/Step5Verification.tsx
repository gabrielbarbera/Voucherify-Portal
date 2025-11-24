import React from 'react';
import { Button } from '../ui/Button';
import { PaymentFlowData } from '../PaymentFlow';
import { X } from 'lucide-react';

interface Step5VerificationProps {
  data: PaymentFlowData;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export const Step5Verification: React.FC<Step5VerificationProps> = ({
  data,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onCancel
}) => {
  // Demo data
  const fromEmail = 'demo@user.com';
  const toName = 'DEMO USER';
  const toEmail = 'demo@user.com';
  const transferDate = data.transferDate 
    ? new Date(data.transferDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-2">
          <h2 className="w-full text-center text-rose-700 text-2xl font-semibold leading-8">
            INTERACT E-TRANSFER - VERIFICATION
          </h2>
          <p className="w-full text-center text-black text-sm font-normal leading-5">
            Verify that the information below is accurate and select Send Money. Note: You can't stop the transfer after it's sent.
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full rounded-2xl flex flex-col gap-6">
        {/* From */}
        <div className="w-full px-4 pt-4 flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">From:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{fromEmail}</div>
          </div>
        </div>

        {/* To */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">To:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">
              {toName}<br/>
              {toEmail}
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Amount:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">${data.amount.toFixed(2)}</div>
          </div>
        </div>

        {/* From Account */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">From Account:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">
              {data.fromAccount || 'Checking (123456)'}
            </div>
          </div>
        </div>

        {/* Transfer Date */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Transfer Date:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{transferDate}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full px-4 py-4 bg-zinc-100/30 inline-flex justify-start items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex-1 flex justify-start items-center gap-2 text-rose-700 hover:bg-rose-50 hover:text-rose-800 focus:ring-rose-500"
          >
            <X className="size-5 text-rose-700" />
            <span className="text-rose-700 text-sm font-semibold">Cancel</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 px-4 py-2 text-sm font-semibold border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            className="flex-1 px-4 py-2 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500 text-sm font-semibold"
          >
            Send Money
          </Button>
        </div>
      </div>
    </div>
  );
};

