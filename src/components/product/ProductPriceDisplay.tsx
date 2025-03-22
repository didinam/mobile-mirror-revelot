
import React from 'react';

type ProductPriceDisplayProps = {
  price: number;
  currency: string;
  formatPrice: (price: number, currency: string) => string;
};

const ProductPriceDisplay = ({ price, currency, formatPrice }: ProductPriceDisplayProps) => {
  return (
    <div className="text-xl font-medium mb-6">
      {formatPrice(price, currency)}
    </div>
  );
};

export default ProductPriceDisplay;
