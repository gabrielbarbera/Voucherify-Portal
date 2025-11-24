import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'lg'
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      
      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Always visible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

