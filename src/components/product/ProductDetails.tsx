
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
          <img src="/payment-icons/visa.svg" alt="Visa" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/amex.svg" alt="American Express" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/discover.svg" alt="Discover" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/jcb.svg" alt="JCB" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/diners.svg" alt="Diners Club" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/apple-pay.svg" alt="Apple Pay" className="h-8 bg-white rounded border border-gray-200 p-1" />
          <img src="/payment-icons/google-pay.svg" alt="Google Pay" className="h-8 bg-white rounded border border-gray-200 p-1" />
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
