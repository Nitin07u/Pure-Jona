import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
      <div className="bg-[#1E382B] text-ivory-50 px-5 py-3.5 shadow-luxury-lg border border-[#2F4D3C] flex items-center gap-3 text-xs tracking-wider">
        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};
