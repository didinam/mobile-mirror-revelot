
import React from 'react';
import { ProductVariant } from '@/types';

type ProductVariantSelectorProps = {
  attributeName: string;
  options: string[];
  selectedValue: string | undefined;
  onSelect: (name: string, value: string) => void;
};

const ProductVariantSelector = ({ 
  attributeName, 
  options, 
  selectedValue, 
  onSelect 
}: ProductVariantSelectorProps) => {
  return (
    <div className="mb-6">
      <div className="mb-2 font-medium">{attributeName}</div>
      <div className="flex gap-2 mb-4">
        {options.map(value => (
          <button 
            key={value}
            className={`px-4 py-2 border rounded-md ${
              selectedValue === value 
                ? 'border-black bg-black text-white' 
                : 'border-gray-300 hover:border-gray-500'
            }`}
            onClick={() => onSelect(attributeName, value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantSelector;
