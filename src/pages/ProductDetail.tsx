
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
    '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
    '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
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
        image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
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

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
      
      {/* Full width product gallery */}
      <div className="relative w-full bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-square">
            <img 
              src={images[activeImage]} 
              alt={product.title} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <button 
          onClick={prevImage} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={nextImage} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full ${
                activeImage === index ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Product info */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          <div className="text-sm text-gray-500 mb-2">REVELOT</div>
          <h1 className="text-2xl md:text-3xl font-serif mb-3">{product.title}</h1>
          <div className="text-xl font-medium mb-6">{product.currency} {product.price.toFixed(2)}</div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="text-sm mb-1">SKU: S16-4B4BL3</div>
            <div className="text-sm mb-6">We have 5 in stock</div>
            
            <div className="mb-6">
              <div className="mb-2 font-medium">Color</div>
              <div className="flex gap-2 mb-4">
                <button className="w-8 h-8 bg-black rounded-full border-2 border-gray-300" aria-label="Black"></button>
                <button className="w-8 h-8 bg-gray-700 rounded-full" aria-label="Dark Gray"></button>
                <button className="w-8 h-8 bg-gray-400 rounded-full" aria-label="Gray"></button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-2 font-medium">Quantity</div>
              <div className="flex border border-gray-300 rounded-md w-32">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center py-2">{quantity}</div>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-black hover:bg-black/90 text-white py-6 rounded-none">
            ADD TO CART
          </Button>
          
          <Button variant="outline" className="w-full mt-4 border-black text-black hover:bg-black hover:text-white py-6 rounded-none">
            BUY IT NOW
          </Button>
          
          <div className="mt-4 text-sm text-center">
            <Link to="/shipping" className="text-gray-500 hover:underline">
              Shipping
            </Link> calculated at checkout.
          </div>
          
          <div className="mt-8 space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-sm text-gray-700 mb-4">
                Our 16" Black Bamboo Leather Strap combines elegance with sustainability. Crafted from premium leather with bamboo-inspired texturing, this strap offers both comfort and durability. Perfect for everyday wear or special occasions, it adds a touch of sophistication to any watch.
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-2">Payment</h3>
              <p className="text-sm text-gray-700 mb-4">
                Your payment information is processed securely. We do not store credit card details nor have access to your credit card information. We use Stripe(international) and EGHL(Malaysia) as our primary payment gateway and we do not support PayPal.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {['visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners', 'apple', 'google'].map((payment) => (
                  <div key={payment} className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">{payment.charAt(0).toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-2">Shipping</h3>
              <p className="text-sm text-gray-700 mb-4">
                Rates are approximations. Exact rates will be provided at checkout. We currently do not ship to Israel, Palestine, Russia, Ukraine as advised by our courier partner FedEx.
              </p>
              
              <Button variant="outline" className="text-sm border-black text-black hover:bg-black hover:text-white rounded-none">
                ESTIMATE SHIPPING
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
