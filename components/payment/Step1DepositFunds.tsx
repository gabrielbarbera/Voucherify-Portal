import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface Step1DepositFundsProps {
  amount: number;
  productName: string;
  selectedBank?: string;
  currentStep: number;
  totalSteps: number;
  onNext: (bank: string) => void;
  onClose: () => void;
}

const BANKS = [
  { id: 'images3', name: 'Bank 1', logo: '/Voucherify-Portal/banks/images-3.png' },
  { id: 'images4', name: 'Bank 2', logo: '/Voucherify-Portal/banks/images-4.png' },
  { id: 'coast', name: 'Coast Capital', logo: '/Voucherify-Portal/banks/coast-capital-logo.png' },
  { id: 'laurentian', name: 'Laurentian Bank', logo: '/Voucherify-Portal/banks/laurentian-bank-logo.png' },
  { id: 'meridian', name: 'Meridian', logo: '/Voucherify-Portal/banks/meridian-logo.png' },
  { id: 'motusbank', name: 'Motusbank', logo: '/Voucherify-Portal/banks/motusbank.png' },
  { id: 'national', name: 'National Bank', logo: '/Voucherify-Portal/banks/national-bank-logo.png' },
  { id: 'presidents', name: "President's Choice", logo: '/Voucherify-Portal/banks/presidents-choice-logo.png' },
  { id: 'pt', name: 'PT', logo: '/Voucherify-Portal/banks/pt-logo-blue.png' },
  { id: 'rbc', name: 'RBC', logo: '/Voucherify-Portal/banks/rbc-logo.png' },
  { id: 'scotiabank', name: 'Scotiabank', logo: '/Voucherify-Portal/banks/scotiabank-logo.png' },
  { id: 'simplii', name: 'Simplii', logo: '/Voucherify-Portal/banks/simplii-logo.png' },
  { id: 'tangerine', name: 'Tangerine', logo: '/Voucherify-Portal/banks/tangerine-logo.png' },
  { id: 'td', name: 'TD Bank', logo: '/Voucherify-Portal/banks/td-bank-logo.png' },
];

export const Step1DepositFunds: React.FC<Step1DepositFundsProps> = ({
  amount,
  productName,
  selectedBank,
  currentStep,
  totalSteps,
  onNext,
  onClose
}) => {
  const [selectedBankId, setSelectedBankId] = useState<string | undefined>(selectedBank);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBankSelect = (bankId: string) => {
    setSelectedBankId(bankId);
    setShowDropdown(false);
  };

  const handleAccept = () => {
    if (selectedBankId) {
      onNext(selectedBankId);
    }
  };

  // Demo data
  const referenceNumber = 'CA1MRkvZcatX';
  const requesterEmail = 'payments@yourstore.com';
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  const formattedExpiry = expiryDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-black leading-8">Deposit Funds</h2>
      </div>

      {/* Request Details */}
      <div className="w-full flex flex-col gap-4">
        <div className="py-5 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-black text-sm font-medium leading-5">
                Request for Money<br/>
                ${amount.toFixed(2)} CAD<br/>
                From: {productName}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-black text-sm font-medium leading-5">
                Reference #: {referenceNumber}<br/>
                Requester's Email: {requesterEmail}<br/>
                Expires: {formattedExpiry}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Bank Selection */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-black leading-6">Select your Financial Institution</h3>
        </div>

        {/* Bank Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {BANKS.map((bank) => (
            <button
              key={bank.id}
              onClick={() => handleBankSelect(bank.id)}
              className={`w-full max-w-64 h-32 px-4 py-6 bg-white rounded-2xl flex flex-col justify-center items-center gap-2.5 transition-all hover:shadow-md ${
                selectedBankId === bank.id ? 'ring-2 ring-rose-700' : ''
              }`}
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className="w-full max-w-52 max-h-28 object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>

        {/* OR Divider */}
        <div className="flex justify-center items-center gap-2.5">
          <div className="text-sm font-medium text-rose-700">OR</div>
        </div>

        {/* Dropdown Selection */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-black text-sm font-medium leading-5">Select Your Financial Institution</label>
              <div className="relative">
                <select
                  value={selectedBankId || ''}
                  onChange={(e) => handleBankSelect(e.target.value)}
                  className="w-full p-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-600 text-gray-400 text-sm"
                >
                  <option value="">Select institution</option>
                  {BANKS.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-black text-sm font-medium leading-5">Select Province or Territory</label>
              <div className="relative">
                <select
                  className="w-full p-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-600 text-gray-400 text-sm"
                >
                  <option value="">Select Province or Territory</option>
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="YT">Yukon</option>
                  <option value="NU">Nunavut</option>
                </select>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAccept}
            disabled={!selectedBankId}
            className="w-full bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500"
          >
            Accept Request
          </Button>
        </div>
      </div>

      {/* Decline Section */}
      <div className="w-full flex justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <h3 className="text-center text-neutral-600 text-lg font-extrabold leading-6">
            Don't see your Financial Institution here or changed your mind?
          </h3>
          <p className="text-center text-gray-500 text-sm font-normal leading-6">
            Please decline this request for money so we can let the requester know and we will stop sending you any reminders
          </p>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
          >
            Decline Request
          </Button>
        </div>
      </div>
    </div>
  );
};

