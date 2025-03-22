
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import MobileMenuHeader from './MobileMenu/MobileMenuHeader';
import MobileMenuContent from './MobileMenu/MobileMenuContent';
import MobileMenuFooter from './MobileMenu/MobileMenuFooter';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when menu is open
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
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        <MobileMenuHeader onClose={onClose} />
        <MobileMenuContent onClose={onClose} />
        <MobileMenuFooter />
      </div>
    </div>
  );
};

export default MobileMenu;
