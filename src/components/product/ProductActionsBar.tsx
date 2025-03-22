
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '@/types';

type ProductActionsBarProps = {
  product: Product;
  selectedVariant: ProductVariant | null;
  stockStatus: {
    inStock: boolean;
    lowStock: boolean;
    stock: number;
  };
  isInWishlist: boolean;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  handleToggleWishlist: () => void;
  t: (key: string, options?: any) => string;
};

const ProductActionsBar = ({ 
  product, 
  stockStatus, 
  isInWishlist, 
  handleAddToCart, 
  handleBuyNow, 
  handleToggleWishlist, 
  t 
}: ProductActionsBarProps) => {
  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button 
          className="flex-1 bg-black hover:bg-black/90 text-white py-6 rounded-none"
          onClick={handleAddToCart}
          disabled={!stockStatus.inStock}
        >
          {stockStatus.inStock ? t('addToCart') : t('outOfStock')}
        </Button>
        
        <Button
          variant="outline"
          className={`px-4 border ${
            isInWishlist 
              ? 'bg-red-50 border-red-200 text-red-500' 
              : 'border-gray-300'
          }`}
          onClick={handleToggleWishlist}
        >
          <Heart 
            className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full border-black text-black hover:bg-black hover:text-white py-6 rounded-none"
        onClick={handleBuyNow}
        disabled={!stockStatus.inStock}
      >
        {t('buyNow')}
      </Button>
      
      <div className="mt-4 text-sm text-center">
        <Link to="/shipping" className="text-gray-500 hover:underline">
          {t('shipping')}
        </Link> {t('calculatedAtCheckout')}
      </div>
    </>
  );
};

export default ProductActionsBar;
