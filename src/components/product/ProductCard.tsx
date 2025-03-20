
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card group">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative mb-3 overflow-hidden">
          <div className="aspect-square bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {product.soldOut && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-medium px-3 py-1">
              SOLD OUT
            </div>
          )}
        </div>
        
        <h3 className="text-sm font-medium mb-1 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="text-sm">
          {product.currency}{product.price.toFixed(2)}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
