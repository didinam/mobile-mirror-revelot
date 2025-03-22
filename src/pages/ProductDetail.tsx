
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

  // Use the new image uploaded by user
  const watchImage = '/lovable-uploads/7a0f7dfc-1749-4460-9161-25bb1925d0e2.png';
  
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const dummyProduct: Product = {
        id: '1',
        title: 'Gentus 40MM | Black Chronograph Steel (Automatic)',
        price: 1599.00,
        currency: 'RM',
        image: watchImage,
        soldOut: false,
        collection: 'gentus',
        slug: 'gentus-40mm-black-chronograph-steel-automatic',
        stock: 12,
        inStock: true,
        lowStock: false,
        description: 'The Gentus 40MM Black Chronograph is our flagship automatic movement watch. Crafted with premium materials and Swiss engineering, this timepiece combines elegance with functionality.',
        images: [watchImage, watchImage, watchImage],
        features: [
          'Automatic movement',
          'Sapphire crystal glass',
          'Water resistant to 100m',
          '40mm case diameter',
          'Genuine leather strap'
        ],
        variants: [
          {
            id: 'v1',
            title: 'Black / Steel / 40mm',
            stock: 8,
            attributes: [
              { name: 'Color', value: 'Black' },
              { name: 'Material', value: 'Steel' },
              { name: 'Size', value: '40mm' }
            ]
          },
          {
            id: 'v2',
            title: 'Silver / Steel / 40mm',
            stock: 5,
            attributes: [
              { name: 'Color', value: 'Silver' },
              { name: 'Material', value: 'Steel' },
              { name: 'Size', value: '40mm' }
            ]
          },
          {
            id: 'v3',
            title: 'Black / Steel / 42mm',
            stock: 3,
            attributes: [
              { name: 'Color', value: 'Black' },
              { name: 'Material', value: 'Steel' },
              { name: 'Size', value: '42mm' }
            ]
          },
          {
            id: 'v4',
            title: 'Silver / Steel / 42mm',
            stock: 0,
            attributes: [
              { name: 'Color', value: 'Silver' },
              { name: 'Material', value: 'Steel' },
              { name: 'Size', value: '42mm' }
            ]
          }
        ]
      };
      
      setProduct(dummyProduct);
      setLoading(false);
    }, 500);
    
    window.scrollTo(0, 0);
  }, [slug, watchImage]);

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
      
      <ProductGallery images={product.images || [product.image]} productTitle={product.title} />
      
      <ProductInfo 
        product={product} 
        quantity={quantity}
        onIncrementQuantity={incrementQuantity}
        onDecrementQuantity={decrementQuantity}
      />
      
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetail;
