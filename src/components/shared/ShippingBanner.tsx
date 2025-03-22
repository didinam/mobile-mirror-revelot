
import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

const ShippingBanner = () => {
  return (
    <div className="w-full bg-black text-white py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
      <Truck className="w-4 h-4" />
      <span>Free Shipping, Free Returns</span>
      <RotateCcw className="w-4 h-4" />
    </div>
  );
};

export default ShippingBanner;
