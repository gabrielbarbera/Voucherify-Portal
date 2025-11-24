import React from 'react';
import { FileText, FileDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface Step3RequestDetailsProps {
  amount: number;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onDecline: () => void;
}

export const Step3RequestDetails: React.FC<Step3RequestDetailsProps> = ({
  amount,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onDecline
}) => {
  // Demo data - all fake/demo data
  const requesterName = 'DEMO USER';
  const requesterEmail = 'demo@user.com';
  const referenceNumber = 'CA1MRnt6tdj';
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  const formattedExpiry = expiryDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-6 pb-6 flex flex-col gap-6">
      <div className="w-full mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <h2 className="w-full text-center text-rose-700 text-2xl font-semibold leading-8">
              REQUEST MONEY
            </h2>
            <p className="w-full text-center text-black text-sm font-normal leading-6">
              You have received a request for money.<br/>
              An email notice will be sent to the contact approximately 30 minutes after you fulfill or decline this request for money.<br/>
              Note: The optional Issue Date and Document Number fields may display. These are the same as Invoice Due Date and Invoice Number.
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

          {/* Request From */}
          <div className="w-full px-4 pt-4 border-t-2 border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">
                The request was sent from:
              </div>
              <div className="flex-1 text-black text-sm font-normal leading-5">
                {requesterName}<br/>
                {requesterEmail}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Amount:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">${amount.toFixed(2)}</div>
            </div>
          </div>

          {/* Reference Number */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Request Reference Number:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">{referenceNumber}</div>
            </div>
          </div>

          {/* Expiry */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">This Request Will Expire On:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">{formattedExpiry}</div>
            </div>
          </div>

          {/* Warning */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">
                If you don't recognize this requestor, confirm all request details, including their name and email address. If you're still not sure, decline the request for money.<br/>
                This transfer will replace any transfer that was already scheduled in response to this request.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full pt-4 pb-6 border-t border-black inline-flex justify-start items-start gap-3">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1 px-4 py-2 text-sm font-semibold border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
            >
              Decline Request for Money
            </Button>
            <Button
              onClick={onNext}
              className="flex-1 px-4 py-2 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500 text-sm font-semibold"
            >
              Send Money
            </Button>
          </div>

          {/* Terms Note */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col justify-center items-start gap-3">
            <div className="pr-2 py-1 rounded-lg inline-flex justify-start items-center gap-1">
              <FileText className="w-5 h-5 text-rose-700" />
              <div className="text-black text-sm font-normal leading-5">Note:</div>
            </div>
            <p className="text-black text-sm font-normal leading-5">
              Your use of Interac e-Transfer® is subject to the
            </p>
            <div className="w-full py-2 rounded-xl inline-flex justify-start items-start gap-1">
              <div className="flex-1 flex justify-start items-start gap-2">
                <FileDown className="w-5 h-5 text-red-600" />
                <div className="flex-1 inline-flex flex-col gap-1">
                  <div className="w-full flex flex-col gap-0.5">
                    <div className="w-full text-black text-sm font-normal leading-5 line-clamp-1">
                      Interac e-Transfer Terms and conditions (PDF, 194 KB). (Effective February 2022)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

