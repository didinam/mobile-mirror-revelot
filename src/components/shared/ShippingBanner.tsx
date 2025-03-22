
import React from 'react';

const ShippingBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white text-black py-3 text-center text-sm font-medium flex items-center justify-center gap-2 border-b border-gray-200">
      <span className="uppercase">Free shipping, free returns</span>
    </div>
  );
};

export default ShippingBanner;
