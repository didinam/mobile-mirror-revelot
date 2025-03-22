
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import QuantitySelector from './QuantitySelector';
import { useCart } from '@/contexts/CartContext';

type ProductInfoProps = {
  product: Product;
  quantity: number;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
};

const ProductInfo = ({ product, quantity, onIncrementQuantity, onDecrementQuantity }: ProductInfoProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="text-sm text-gray-500 mb-2">REVELOT</div>
        <h1 className="text-2xl md:text-3xl font-serif mb-3">{product.title}</h1>
        <div className="text-xl font-medium mb-6">{product.currency} {product.price.toFixed(2)}</div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="text-sm mb-1">SKU: S16-4B4BL3</div>
          <div className="text-sm mb-6">We have {product.stock || 5} in stock</div>
          
          <div className="mb-6">
            <div className="mb-2 font-medium">Color</div>
            <div className="flex gap-2 mb-4">
              <button className="w-8 h-8 bg-black rounded-full border-2 border-gray-300" aria-label="Black"></button>
              <button className="w-8 h-8 bg-gray-700 rounded-full" aria-label="Dark Gray"></button>
              <button className="w-8 h-8 bg-gray-400 rounded-full" aria-label="Gray"></button>
            </div>
          </div>
          
          <QuantitySelector 
            quantity={quantity} 
            onIncrement={onIncrementQuantity} 
            onDecrement={onDecrementQuantity} 
          />
        </div>
        
        <Button 
          className="w-full bg-black hover:bg-black/90 text-white py-6 rounded-none"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full mt-4 border-black text-black hover:bg-black hover:text-white py-6 rounded-none"
          onClick={handleBuyNow}
        >
          BUY IT NOW
        </Button>
        
        <div className="mt-4 text-sm text-center">
          <Link to="/shipping" className="text-gray-500 hover:underline">
            Shipping
          </Link> calculated at checkout.
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
