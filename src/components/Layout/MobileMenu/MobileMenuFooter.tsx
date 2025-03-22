
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const MobileMenuFooter: React.FC = () => {
  return (
    <div className="p-4 border-t">
      <div className="flex space-x-4 justify-center">
        <a href="#" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Youtube className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default MobileMenuFooter;
