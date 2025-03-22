
import React, { useState } from 'react';
import { Product, ProductVariant, ProductAttribute } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';

import QuantitySelector from './QuantitySelector';
import ProductHeader from './ProductHeader';
import ProductPriceDisplay from './ProductPriceDisplay';
import ProductStockStatus from './ProductStockStatus';
import ProductVariantSelector from './ProductVariantSelector';
import ProductActionsBar from './ProductActionsBar';

type ProductInfoProps = {
  product: Product;
  quantity: number;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
};

const ProductInfo = ({ product, quantity, onIncrementQuantity, onDecrementQuantity }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  
  // Determine available attribute values for each attribute type
  const getAttributeOptions = (attributeName: string): string[] => {
    if (!product.variants) return [];
    
    // Get unique attribute values for the given attribute name
    const uniqueValues = new Set<string>();
    product.variants.forEach(variant => {
      const attribute = variant.attributes.find(attr => attr.name === attributeName);
      if (attribute) {
        uniqueValues.add(attribute.value);
      }
    });
    
    return Array.from(uniqueValues);
  };
  
  // Get all unique attribute names across all variants
  const getAttributeNames = (): string[] => {
    if (!product.variants) return [];
    
    const uniqueNames = new Set<string>();
    product.variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        uniqueNames.add(attr.name);
      });
    });
    
    return Array.from(uniqueNames);
  };
  
  const attributeNames = getAttributeNames();
  
  // Update selected variant when attributes change
  const selectAttribute = (name: string, value: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [name]: value,
    };
    setSelectedAttributes(newSelectedAttributes);
    
    // Find a matching variant with the selected attributes
    if (product.variants) {
      const matchingVariant = product.variants.find(variant => {
        return Object.entries(newSelectedAttributes).every(([attrName, attrValue]) => {
          const attribute = variant.attributes.find(attr => attr.name === attrName);
          return attribute && attribute.value === attrValue;
        });
      });
      
      setSelectedVariant(matchingVariant || null);
    }
  };
  
  // Get the current price based on selected variant or product
  const getCurrentPrice = () => {
    if (selectedVariant && selectedVariant.price !== undefined) {
      return selectedVariant.price;
    }
    return product.price;
  };
  
  // Get the current stock status based on selected variant or product
  const getStockStatus = () => {
    if (selectedVariant) {
      if (selectedVariant.stock <= 0) {
        return { inStock: false, lowStock: false, stock: 0 };
      }
      if (selectedVariant.stock <= 5) {
        return { inStock: true, lowStock: true, stock: selectedVariant.stock };
      }
      return { inStock: true, lowStock: false, stock: selectedVariant.stock };
    }
    
    // Fall back to product stock
    const stock = product.stock || 10; // Default to 10 if not specified
    if (stock <= 0) {
      return { inStock: false, lowStock: false, stock: 0 };
    }
    if (stock <= 5) {
      return { inStock: true, lowStock: true, stock };
    }
    return { inStock: true, lowStock: false, stock };
  };
  
  const stockStatus = getStockStatus();
  
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(product, quantity, selectedVariant);
    } else {
      addToCart(product, quantity);
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <ProductHeader productId={product.id} title={product.title} />
        
        <ProductPriceDisplay 
          price={getCurrentPrice()} 
          currency={product.currency} 
          formatPrice={formatPrice} 
        />
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">SKU: {product.id}</div>
            
            {/* Stock indicator */}
            <ProductStockStatus stockStatus={stockStatus} t={t} />
          </div>
          
          {/* Variants selection */}
          {attributeNames.map(attributeName => (
            <ProductVariantSelector
              key={attributeName}
              attributeName={attributeName}
              options={getAttributeOptions(attributeName)}
              selectedValue={selectedAttributes[attributeName]}
              onSelect={selectAttribute}
            />
          ))}
          
          <QuantitySelector 
            quantity={quantity} 
            onIncrement={onIncrementQuantity} 
            onDecrement={onDecrementQuantity} 
          />
        </div>
        
        <ProductActionsBar
          product={product}
          selectedVariant={selectedVariant}
          stockStatus={stockStatus}
          isInWishlist={isInWishlist(product.id)}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
          handleToggleWishlist={handleToggleWishlist}
          t={t}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
