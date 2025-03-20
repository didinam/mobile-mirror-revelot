import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDetails from '@/components/product/ProductDetails';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const images = [
    '/lovable-uploads/f3d1fa9e-b533-448d-9396-36649a3c96e3.png',
    '/lovable-uploads/f3d1fa9e-b533-448d-9396-36649a3c96e3.png',
    '/lovable-uploads/f3d1fa9e-b533-448d-9396-36649a3c96e3.png',
  ];

  useEffect(() => {
    // Simulate loading product data
    setLoading(true);
    
    // In a real app, you would fetch the product by slug from an API
    setTimeout(() => {
      const dummyProduct: Product = {
        id: '1',
        title: 'Gentus 40MM | Black Chronograph Steel (Automatic)',
        price: 1599.00,
        currency: 'RM',
        image: '/lovable-uploads/f3d1fa9e-b533-448d-9396-36649a3c96e3.png',
        soldOut: false,
        collection: 'gentus',
        slug: 'gentus-40mm-black-chronograph-steel-automatic'
      };
      
      setProduct(dummyProduct);
      setLoading(false);
    }, 500);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Button asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 w-full text-center py-2 bg-black text-white text-sm z-40">
        Get 10% Off When You Sign Up To Our Newsletter
      </div>
      
      <ProductGallery images={images} productTitle={product.title} />
      
      <ProductInfo 
        product={product} 
        quantity={quantity}
        onIncrementQuantity={incrementQuantity}
        onDecrementQuantity={decrementQuantity}
      />
      
      <ProductDetails />
    </div>
  );
};

export default ProductDetail;
