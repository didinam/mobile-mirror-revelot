
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product, ProductVariant, ProductAttribute } from '@/types';
import QuantitySelector from './QuantitySelector';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
        <div className="text-sm text-gray-500 mb-2">REVELOT</div>
        <h1 className="text-2xl md:text-3xl font-serif mb-3">{product.title}</h1>
        <div className="text-xl font-medium mb-6">
          {formatPrice(getCurrentPrice(), product.currency)}
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">SKU: {product.id}</div>
            
            {/* Stock indicator */}
            {stockStatus.inStock ? (
              stockStatus.lowStock ? (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  {t('onlyLeft', { count: stockStatus.stock })}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {t('inStock')}
                </Badge>
              )
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                {t('outOfStock')}
              </Badge>
            )}
          </div>
          
          {/* Variants selection */}
          {attributeNames.map(attributeName => (
            <div className="mb-6" key={attributeName}>
              <div className="mb-2 font-medium">{attributeName}</div>
              <div className="flex gap-2 mb-4">
                {getAttributeOptions(attributeName).map(value => (
                  <button 
                    key={value}
                    className={`px-4 py-2 border rounded-md ${
                      selectedAttributes[attributeName] === value 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    onClick={() => selectAttribute(attributeName, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <QuantitySelector 
            quantity={quantity} 
            onIncrement={onIncrementQuantity} 
            onDecrement={onDecrementQuantity} 
          />
        </div>
        
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
              isInWishlist(product.id) 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'border-gray-300'
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart 
              className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
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
      </div>
    </div>
  );
};

export default ProductInfo;
