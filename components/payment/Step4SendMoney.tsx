import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Stepper } from '../ui/Stepper';

interface Step4SendMoneyProps {
  amount: number;
  fromAccount?: string;
  transferDate?: string;
  message?: string;
  currentStep: number;
  totalSteps: number;
  onNext: (data: { fromAccount: string; transferDate: string; message?: string }) => void;
  onBack: () => void;
  onCancel: () => void;
}

export const Step4SendMoney: React.FC<Step4SendMoneyProps> = ({
  amount,
  fromAccount: initialFromAccount,
  transferDate: initialTransferDate,
  message: initialMessage,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onCancel
}) => {
  const [fromAccount, setFromAccount] = useState(initialFromAccount || 'Checking (123456) $2,511.20');
  const [transferDate, setTransferDate] = useState(initialTransferDate || new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState(initialMessage || '');

  // Demo data
  const recipientName = 'DEMO USER';
  const recipientEmail = 'demo@user.com';
  const emailName = 'DEMO USER';
  const email = 'demo@user.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ fromAccount, transferDate, message });
  };

  const dateObj = transferDate ? new Date(transferDate) : new Date();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-8">
      {/* Stepper */}
      <Stepper currentStep={1} totalSteps={2} />
      
      {/* Header */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <h2 className="w-full text-center text-rose-700 text-2xl font-semibold leading-8">
            SEND MONEY
          </h2>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="w-full text-black text-sm font-normal leading-5">
            You can make changes to a future-dated transfer until 6:00 am ET on the day it's scheduled to send<br/>
            CIBC sends a notice to the email address or mobile phone number you provide within 30 minutes of initiating the transfer on the transfer date<br/>
            Individual transfers must not exceed $3,000<br/>
            This transfer does not require a security question
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full rounded-2xl flex flex-col gap-6">
        <div className="w-full px-4 pt-4 flex flex-col gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <h3 className="w-full text-rose-700 text-xl font-normal leading-7">
              Your Interac e-Transfer Details
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Send Money To */}
          <div className="w-full px-4 pt-4 border-t-2 border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Send Money to:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">
                {recipientName}<br/>
                {recipientEmail}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Amount:</div>
              <div className="flex-1 px-3 py-2 bg-white/30 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2">
                <div className="flex-1 flex justify-start items-center gap-2">
                  <div className="flex-1 text-black text-sm font-normal leading-5 line-clamp-1">
                    ${amount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* From Account */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">From Account:</div>
              <div className="flex-1 px-3 py-2 bg-white/30 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2">
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="flex-1 text-black text-sm font-normal leading-5 outline-none bg-transparent"
                >
                  <option value="Checking (123456) $2,511.20">Checking (123456) $2,511.20</option>
                  <option value="Savings (789012) $5,234.56">Savings (789012) $5,234.56</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transfer Date */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Transfer Date</div>
              <div className="flex-1 flex justify-start items-center gap-2">
                <input
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-28 px-2 py-1.5 bg-white/30 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 text-black text-sm font-normal leading-5"
                />
                <div className="text-zinc-400 text-xs font-normal leading-4">–</div>
                <div className="flex-1 px-2 py-1.5 bg-white/30 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 text-black text-sm font-normal leading-5">
                  {day}
                </div>
                <div className="text-zinc-400 text-xs font-normal leading-4">–</div>
                <div className="flex-1 px-2 py-1.5 bg-white/30 rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 text-black text-sm font-normal leading-5">
                  {year}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="w-full px-4 pt-3 border-t border-black inline-flex justify-center items-start gap-3">
            <div className="flex-1 flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Message (Optional)</div>
            </div>
            <div className="flex-1 h-24 inline-flex flex-col gap-1.5">
              <div className="w-full flex-1 px-3 py-2 relative bg-white/30 rounded-xl shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-start items-start gap-2 overflow-hidden">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message"
                  className="flex-1 self-stretch text-black text-sm font-normal leading-5 outline-none bg-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Email Name */}
          <div className="w-full px-4 pt-4 border-t-2 border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">
                This is how you will appear in emails to your Interact e-Transfer contacts. If incorrect, <span className="underline">edit your profile.</span>
              </div>
            </div>
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Your Email Name:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">{emailName}</div>
            </div>
          </div>

          {/* Email */}
          <div className="w-full px-4 pt-3 border-t border-black flex flex-col gap-3">
            <div className="w-full inline-flex justify-center items-start gap-4">
              <div className="flex-1 text-black text-sm font-normal leading-5">Your Email:</div>
              <div className="flex-1 text-black text-sm font-normal leading-5">{email}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full px-3 pt-4 pb-6 border-t border-black inline-flex justify-center items-start gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm font-semibold border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 px-4 py-2 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500 text-sm font-semibold"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

