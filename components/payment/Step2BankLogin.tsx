import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface Step2BankLoginProps {
  cardNumber?: string;
  password?: string;
  currentStep: number;
  totalSteps: number;
  onNext: (data: { cardNumber: string; password: string }) => void;
  onBack: () => void;
}

export const Step2BankLogin: React.FC<Step2BankLoginProps> = ({
  cardNumber: initialCardNumber,
  password: initialPassword,
  currentStep,
  totalSteps,
  onNext,
  onBack
}) => {
  const [cardNumber, setCardNumber] = useState(initialCardNumber || '1234 1234 1234 1234');
  const [password, setPassword] = useState(initialPassword || 'DemoUser123');
  const [rememberCard, setRememberCard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ cardNumber, password });
  };

  return (
    <div className="w-full max-w-[544px] mx-auto p-6 flex flex-col gap-6">
      <div className="w-full rounded-2xl flex flex-col gap-6">
        <div className="w-full px-4 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
            {/* Card Number Input */}
            <div className="w-full flex flex-col gap-1.5">
              <div className="inline-flex justify-start items-start gap-0.5">
                <label className="text-black text-sm font-medium leading-5">
                  Card <span className="text-black text-sm font-medium leading-5">number</span>
                </label>
              </div>
              <div className="w-full pl-2.5 pr-3.5 py-2.5 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2">
                <div className="flex-1 flex justify-start items-center gap-2">
                  {/* Mastercard logo */}
                  <div className="w-8 h-6 relative flex items-center justify-center">
                    <svg
                      width="32"
                      height="24"
                      viewBox="0 0 32 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-6"
                    >
                      <rect width="32" height="24" rx="4" fill="white"/>
                      <circle cx="12" cy="12" r="7" fill="#EB001B"/>
                      <circle cx="20" cy="12" r="7" fill="#F79E1B"/>
                      <path
                        d="M16 8.5C17.5 9.5 18.5 10.7 18.5 12C18.5 13.3 17.5 14.5 16 15.5C14.5 14.5 13.5 13.3 13.5 12C13.5 10.7 14.5 9.5 16 8.5Z"
                        fill="#FF5F00"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="flex-1 text-gray-900 text-base font-normal leading-6 outline-none"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
              </div>
            </div>

            {/* Remember Card Checkbox */}
            <div className="w-full py-3 inline-flex justify-start items-center gap-2">
              <input
                type="checkbox"
                id="remember-card"
                checked={rememberCard}
                onChange={(e) => setRememberCard(e.target.checked)}
                className="size-4 rounded-sm border border-zinc-300"
              />
              <label htmlFor="remember-card" className="text-black text-sm font-medium leading-5">
                Remember this card number
              </label>
              <div className="size-4 relative overflow-hidden">
                <div className="size-3 absolute left-[1.27px] top-[1.27px] outline outline-[1.27px] outline-offset-[-0.64px] outline-rose-700 rounded-full" />
              </div>
            </div>

            {/* Password Input */}
            <div className="w-full flex flex-col gap-1.5">
              <div className="inline-flex justify-start items-start gap-0.5">
                <label className="text-black text-sm font-medium leading-5">
                  Password (case sensitive)
                </label>
              </div>
              <div className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow-sm outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2">
                <div className="flex-1 flex justify-start items-center gap-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 text-gray-900 text-base font-normal leading-6 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Show Password Checkbox */}
          <div className="w-full inline-flex justify-start items-start gap-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="size-4 pt-0.5 rounded-sm border border-zinc-300"
            />
            <label htmlFor="show-password" className="flex-1 text-black text-sm font-medium leading-5">
              Show Password
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-start items-start gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 px-6 py-3 text-base font-semibold border-rose-700 text-rose-700 hover:bg-rose-50 hover:border-rose-800 focus:ring-rose-500"
          >
            Register now
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-rose-700 text-white hover:bg-rose-800 focus:ring-rose-500 text-base font-semibold"
          >
            Sign on
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-20 flex flex-col justify-start items-center gap-3">
        <div className="w-full inline-flex justify-center items-center gap-1">
          <div className="text-black text-xl font-normal leading-8">Safe banking online, guaranteed</div>
        </div>
      </div>
    </div>
  );
};

