
import React from 'react';
import { Mail } from 'lucide-react';

const ShippingBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white text-black py-3 text-center text-sm font-medium flex items-center justify-center gap-2 border-b border-gray-200">
      <Mail className="w-4 h-4" />
      <span>Free shipping, free returns</span>
    </div>
  );
};

export default ShippingBanner;
