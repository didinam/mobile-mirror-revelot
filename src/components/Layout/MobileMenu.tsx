
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, Facebook, Instagram, Youtube, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../shared/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    onClose();
    navigate('/');
  };
  
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
                  <div className="space-y-3">
                    <Link 
                      to="/account" 
                      className="block text-lg flex items-center"
                      onClick={onClose}
                    >
                      <User className="w-5 h-5 mr-2" /> My Account
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block text-lg text-red-500 mt-2 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/account/login" 
                      className="block text-lg flex items-center"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      Sign In
                    </Link>
                    <Link 
                      to="/account/register" 
                      className="block text-lg flex items-center"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      Sign Up
                    </Link>
                  </div>
                )}
              </li>
              <li className="py-2 border-b">
                <Link 
                  to="/search" 
                  className="block text-lg"
                  onClick={onClose}
                >
                  Search
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
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
