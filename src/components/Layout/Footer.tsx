
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
    // You would typically send this to your API
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <div className="max-w-lg mx-auto text-center mb-6">
            <h3 className="font-serif text-xl mb-3">NEWSLETTER</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter and get 10% discount code for your first purchase. Sent directly to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-grow bg-transparent border-white focus:border-white focus:ring-white text-white"
                required
              />
              <Button 
                type="submit" 
                variant="ghost" 
                className="ml-2 border border-white text-white hover:bg-white hover:text-black"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-serif text-lg mb-4 flex items-center">
              INQUIRIES
              <ChevronRight className="w-4 h-4 ml-1" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pages/warranty" className="hover:underline">Warranty</Link></li>
              <li><Link to="/pages/shipping" className="hover:underline">Shipping</Link></li>
              <li><Link to="/pages/returns" className="hover:underline">Returns</Link></li>
              <li><Link to="/pages/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4 flex items-center">
              QUICKLINKS
              <ChevronRight className="w-4 h-4 ml-1" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pages/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/pages/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/pages/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/pages/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-6 gap-2">
            {['amex', 'apple', 'diners', 'discover', 'google', 'jcb', 'mastercard', 'visa'].map((payment) => (
              <div key={payment} className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs text-black font-medium">{payment}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p>© All Rights Reserved 2025</p>
          <div className="mt-2 flex justify-center">
            <select className="bg-transparent text-gray-400 border-gray-800 text-xs">
              <option value="MYR">MYR (RM)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
