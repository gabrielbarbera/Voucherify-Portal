import React from 'react';
import { Button } from '../ui/Button';
import { Stepper } from '../ui/Stepper';
import { PaymentFlowData } from '../PaymentFlow';

interface Step6ConfirmationProps {
  data: PaymentFlowData;
  currentStep: number;
  totalSteps: number;
  onComplete: () => void;
  onClose: () => void;
}

export const Step6Confirmation: React.FC<Step6ConfirmationProps> = ({
  data,
  currentStep,
  totalSteps,
  onComplete,
  onClose
}) => {

  // Demo data
  const toName = 'DEMO USER';
  const toEmail = 'demo@user.com';
  const fromAccount = data.fromAccount || 'Chequing (07912-79-80981)';
  const referenceNumber = 'CA1MRnt6tXdj';
  const emailName = 'DEMO USER';
  const email = 'demo@user.com';
  const transferDate = data.transferDate 
    ? new Date(data.transferDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  const sentDate = new Date();
  const sentTime = sentDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  const sentDateFormatted = sentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-8">
      {/* Stepper */}
      <Stepper currentStep={2} totalSteps={2} />
      
      {/* Header */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <h2 className="w-full text-rose-700 text-2xl font-semibold leading-8">
            SEND MONEY
          </h2>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="w-full text-black text-sm font-normal leading-5">
            You can make changes
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full rounded-2xl flex flex-col gap-6">
        <div className="w-full px-4 pt-4 flex flex-col gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <h3 className="w-full text-rose-700 text-xl font-normal leading-7">
              Request Money Details
            </h3>
          </div>
        </div>

        {/* To */}
        <div className="w-full px-4 pt-4 border-t-2 border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">To:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">
              {toName}<br/>
              {toEmail}
            </div>
          </div>
        </div>

        {/* From */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">From:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{fromAccount}</div>
          </div>
        </div>

        {/* Amount */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Amount:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">${data.amount.toFixed(2)}</div>
          </div>
        </div>

        {/* Transfer Date */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Transfer Date:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{transferDate}</div>
          </div>
        </div>

        {/* Email Name */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Your Email Name:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{emailName}</div>
          </div>
        </div>

        {/* Email Address */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Email Address:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{email}</div>
          </div>
        </div>

        {/* Reference Number */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">Reference Number:</div>
            <div className="flex-1 text-black text-sm font-normal leading-5">{referenceNumber}</div>
          </div>
        </div>

        {/* Transfer Sent */}
        <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
          <div className="w-full inline-flex justify-center items-start gap-4">
            <div className="flex-1 text-black text-sm font-normal leading-5">
              Your Transfer Was Sent On: {sentDateFormatted} at {sentTime} ET.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full pt-4 pb-6 border-t border-black inline-flex justify-start items-start gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-semibold border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
          >
            Check Status
          </Button>
          <Button
            type="button"
            onClick={onComplete}
            className="flex-1 px-4 py-2 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500 text-sm font-semibold"
          >
            Finish Process
          </Button>
        </div>
      </div>
    </div>
  );
};

