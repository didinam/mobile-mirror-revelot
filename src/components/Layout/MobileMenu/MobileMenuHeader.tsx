
import React from 'react';
import { X } from 'lucide-react';
import Logo from '../../shared/Logo';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Logo className="h-10" />
      <button 
        onClick={onClose}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MobileMenuHeader;
