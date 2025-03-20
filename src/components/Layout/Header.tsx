
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import Logo from '../shared/Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isScrolled ? "bg-white/90 header-blur shadow-sm py-3" : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="icon-button p-1 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/" className="flex items-center justify-center">
              <Logo className="h-10" />
            </Link>
            
            <div className="flex items-center">
              <Link to="/search" className="icon-button p-1 mr-2">
                <Search className="w-6 h-6" />
              </Link>
              <Link to="/cart" className="relative icon-button p-1">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black text-white text-xs">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
