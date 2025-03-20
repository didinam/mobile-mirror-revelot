
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Facebook, Instagram, Youtube, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../shared/Logo';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  
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
        
        <div className="flex-1 overflow-y-auto py-4">
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
          
          <div className="mt-8 px-4">
            <ul className="space-y-4">
              <li className="py-2 border-b">
                {user ? (
                  <div>
                    <Link 
                      to="/account" 
                      className="block text-lg flex items-center"
                      onClick={onClose}
                    >
                      <User className="w-5 h-5 mr-2" /> Mano paskyra
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        onClose();
                      }} 
                      className="block text-lg text-red-500 mt-2"
                    >
                      Atsijungti
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/account/login" 
                    className="block text-lg"
                    onClick={onClose}
                  >
                    Prisijungti / Registruotis
                  </Link>
                )}
              </li>
              <li className="py-2 border-b">
                <Link 
                  to="/search" 
                  className="block text-lg"
                  onClick={onClose}
                >
                  Paieška
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
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
          
          <div className="mt-4 flex justify-center">
            <select className="currency-selector border border-gray-300 rounded px-4 py-2 bg-white">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
