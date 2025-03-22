
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const { currentCurrency, availableCurrencies, setCurrency } = useCurrency();
  
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
        {/* Newsletter Section */}
        <div className="mb-12">
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
        
        {/* Links Section - Centered and improved for all devices */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-center">
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-lg mb-4 flex items-center">
                INQUIRIES
                <ChevronRight className="w-4 h-4 ml-1" />
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/pages/warranty" className="hover:underline">Warranty Information & Claims</Link></li>
                <li><Link to="/pages/shipping" className="hover:underline">Shipping & Delivery Policies</Link></li>
                <li><Link to="/pages/returns" className="hover:underline">Returns & Exchanges Process</Link></li>
                <li><Link to="/pages/contact" className="hover:underline">Contact Our Support Team</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center">
              <h4 className="font-serif text-lg mb-4 flex items-center">
                QUICKLINKS
                <ChevronRight className="w-4 h-4 ml-1" />
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/pages/about" className="hover:underline">About Our Company & Mission</Link></li>
                <li><Link to="/pages/faq" className="hover:underline">Frequently Asked Questions</Link></li>
                <li><Link to="/pages/privacy" className="hover:underline">Privacy Policy & Data Protection</Link></li>
                <li><Link to="/pages/terms" className="hover:underline">Terms of Service & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" aria-label="Visit our Facebook page">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" aria-label="Visit our Instagram page">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" aria-label="Visit our YouTube channel">
            <Youtube className="w-6 h-6" />
          </a>
        </div>
        
        {/* Payment Icons */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <img src="/payment-icons/visa.svg" alt="Visa" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/amex.svg" alt="American Express" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/discover.svg" alt="Discover" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/jcb.svg" alt="JCB" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/diners.svg" alt="Diners Club" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/apple-pay.svg" alt="Apple Pay" className="h-8 bg-white rounded p-1" />
            <img src="/payment-icons/google-pay.svg" alt="Google Pay" className="h-8 bg-white rounded p-1" />
          </div>
        </div>
        
        {/* Copyright and Language/Currency Selectors */}
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>© All Rights Reserved 2025</p>
          
          <div className="mt-4 flex justify-center space-x-4">
            <Select value={currentCurrency.code} onValueChange={setCurrency}>
              <SelectTrigger className="w-[120px] bg-transparent border-gray-800 text-gray-400">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {availableCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={currentLanguage.code} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] bg-transparent border-gray-800 text-gray-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.flag} {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
