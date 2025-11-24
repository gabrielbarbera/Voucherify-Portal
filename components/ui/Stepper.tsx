import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full inline-flex justify-start items-center gap-2">
      <div className="text-gray-700 text-sm font-bold leading-5">Step:</div>
      <div className="flex-1 flex justify-start items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              {/* Connector line before each step (except the first) */}
              {stepNumber > 1 && (
                <div className="h-0.5 bg-gray-300 flex-1" style={{ minWidth: '24px', maxWidth: '40px' }} />
              )}
              {/* Step circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isActive || isCompleted
                    ? 'bg-rose-700'
                    : 'bg-white border border-gray-300'
                }`}
              >
                <span className={`text-xs font-bold ${
                  isActive || isCompleted
                    ? 'text-white'
                    : 'text-gray-700'
                }`}>
                  {stepNumber}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

