
import React from 'react';
import { Button } from '@/components/ui/button';

const ProductDetails = () => {
  return (
    <div className="mt-8 space-y-6 max-w-xl mx-auto px-4">
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our 16" Black Bamboo Leather Strap combines elegance with sustainability. Crafted from premium leather with bamboo-inspired texturing, this strap offers both comfort and durability. Perfect for everyday wear or special occasions, it adds a touch of sophistication to any watch.
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-2">Payment</h3>
        <p className="text-sm text-gray-700 mb-4">
          Your payment information is processed securely. We do not store credit card details nor have access to your credit card information. We use Stripe(international) and EGHL(Malaysia) as our primary payment gateway and we do not support PayPal.
        </p>
        
        <div className="flex flex-wrap gap-2">
          {['visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners', 'apple', 'google'].map((payment) => (
            <div key={payment} className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">{payment.charAt(0).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-2">Shipping</h3>
        <p className="text-sm text-gray-700 mb-4">
          Rates are approximations. Exact rates will be provided at checkout. We currently do not ship to Israel, Palestine, Russia, Ukraine as advised by our courier partner FedEx.
        </p>
        
        <Button variant="outline" className="text-sm border-black text-black hover:bg-black hover:text-white rounded-none">
          ESTIMATE SHIPPING
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
