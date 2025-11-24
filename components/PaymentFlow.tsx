import React, { useState } from 'react';
import { Step1DepositFunds } from './payment/Step1DepositFunds';
import { Step2BankLogin } from './payment/Step2BankLogin';
import { Step3RequestDetails } from './payment/Step3RequestDetails';
import { Step4SendMoney } from './payment/Step4SendMoney';
import { Step5Verification } from './payment/Step5Verification';
import { Step6Confirmation } from './payment/Step6Confirmation';

export interface PaymentFlowData {
  amount: number;
  productName: string;
  selectedBank?: string;
  cardNumber?: string;
  password?: string;
  fromAccount?: string;
  transferDate?: string;
  message?: string;
}

interface PaymentFlowProps {
  amount: number;
  productName: string;
  onComplete: (data: PaymentFlowData) => void;
  onClose: () => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  amount,
  productName,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PaymentFlowData>({
    amount,
    productName
  });

  const handleNext = (stepData?: Partial<PaymentFlowData>) => {
    if (stepData) {
      setFormData(prev => ({ ...prev, ...stepData }));
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1DepositFunds
            amount={formData.amount}
            productName={formData.productName}
            selectedBank={formData.selectedBank}
            currentStep={currentStep}
            totalSteps={6}
            onNext={(bank) => handleNext({ selectedBank: bank })}
            onClose={onClose}
          />
        );
      case 2:
        return (
          <Step2BankLogin
            cardNumber={formData.cardNumber}
            password={formData.password}
            currentStep={currentStep}
            totalSteps={6}
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3RequestDetails
            amount={formData.amount}
            currentStep={currentStep}
            totalSteps={6}
            onNext={() => handleNext()}
            onBack={handleBack}
            onDecline={onClose}
          />
        );
      case 4:
        return (
          <Step4SendMoney
            amount={formData.amount}
            fromAccount={formData.fromAccount}
            transferDate={formData.transferDate}
            message={formData.message}
            currentStep={currentStep}
            totalSteps={6}
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
            onCancel={onClose}
          />
        );
      case 5:
        return (
          <Step5Verification
            data={formData}
            currentStep={currentStep}
            totalSteps={6}
            onNext={() => handleNext()}
            onBack={handleBack}
            onCancel={onClose}
          />
        );
      case 6:
        return (
          <Step6Confirmation
            data={formData}
            currentStep={currentStep}
            totalSteps={6}
            onComplete={handleComplete}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  );
};

