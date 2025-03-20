
import React from 'react';
import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="mb-2 font-medium">Quantity</div>
      <div className="flex border border-gray-300 rounded-md w-32">
        <button 
          onClick={onDecrement}
          className="px-3 py-2 flex items-center justify-center"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="flex-1 text-center py-2">{quantity}</div>
        <button 
          onClick={onIncrement}
          className="px-3 py-2 flex items-center justify-center"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
