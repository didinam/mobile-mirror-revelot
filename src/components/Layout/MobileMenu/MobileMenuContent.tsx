
import React from 'react';
import MobileMenuNavigation from './MobileMenuNavigation';
import MobileMenuAuth from './MobileMenuAuth';

interface MobileMenuContentProps {
  onClose: () => void;
}

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({ onClose }) => {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <MobileMenuNavigation onClose={onClose} />
      
      <div className="mt-8">
        <MobileMenuAuth onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenuContent;
