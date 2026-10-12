import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BookingFlow } from './BookingFlow';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  prefillReg?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  prefillReg,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto my-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2 sm:p-4">
          <BookingFlow
            initialServiceId={serviceId}
            initialReg={prefillReg}
            isModal={true}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
};
