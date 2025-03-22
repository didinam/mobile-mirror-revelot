
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MobileMenuNavigationProps {
  onClose: () => void;
}

const MobileMenuNavigation: React.FC<MobileMenuNavigationProps> = ({ onClose }) => {
  return (
    <nav className="px-4">
      <ul className="space-y-4">
        <li className="py-2 border-b">
          <Link 
            to="/collections/terra" 
            className="block font-medium text-lg"
            onClick={onClose}
          >
            TERRA (NEW)
          </Link>
        </li>
        <li className="py-2 border-b">
          <Link 
            to="/collections/gentus" 
            className="block font-medium text-lg"
            onClick={onClose}
          >
            GENTUS (COMING SOON)
          </Link>
        </li>
        <li className="py-2 border-b flex items-center justify-between">
          <Link 
            to="/collections/men" 
            className="block font-medium text-lg"
            onClick={onClose}
          >
            MEN
          </Link>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </li>
        <li className="py-2 border-b flex items-center justify-between">
          <Link 
            to="/collections/women" 
            className="block font-medium text-lg"
            onClick={onClose}
          >
            WOMEN
          </Link>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </li>
        <li className="py-2 border-b flex items-center justify-between">
          <Link 
            to="/collections/straps" 
            className="block font-medium text-lg"
            onClick={onClose}
          >
            STRAPS
          </Link>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenuNavigation;
