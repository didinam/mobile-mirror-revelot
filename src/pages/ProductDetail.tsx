
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading product data
    setLoading(true);
    
    // In a real app, you would fetch the product by slug from an API
    setTimeout(() => {
      const dummyProduct: Product = {
        id: '1',
        title: '16\' Black Bamboo Leather Strap',
        price: 89.00,
        currency: 'RM',
        image: '/lovable-uploads/6d0cd294-d25f-489e-a94d-7dfc196028e4.png',
        soldOut: false,
        collection: 'straps',
        slug: '16-black-bamboo-leather-strap'
      };
      
      setProduct(dummyProduct);
      setLoading(false);
    }, 500);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);
  
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
    <div>
      <div className="sticky top-0 w-full text-center py-2 bg-black text-white text-sm z-40">
        Get 10% Off When You Sign Up To Our Newsletter
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div>
            <div className="mb-1 text-sm tracking-wide">REVELOT</div>
            <h1 className="text-3xl font-serif mb-2">{product.title}</h1>
            <div className="text-lg mb-4">{product.currency}{product.price.toFixed(2)}</div>
            
            <div className="mb-4">
              <div className="text-sm mb-1">SKU: S16-4B4BL3</div>
              <div className="text-sm mb-4">We have 5 in stock</div>
              
              <div className="mb-4">
                <div className="mb-2">Color</div>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 appearance-none bg-white cursor-pointer">
                    <option>Black</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-black hover:bg-black/90 text-white py-6">
              ADD TO CART
            </Button>
            
            <Button variant="outline" className="w-full mt-4 bg-gray-500 text-white border-gray-500 hover:bg-gray-600 hover:border-gray-600 py-6">
              BUY IT NOW
            </Button>
            
            <div className="mt-4 text-sm text-center">
              <Link to="/shipping" className="text-gray-500 hover:underline">
                Shipping
              </Link> calculated at checkout.
            </div>
            
            <div className="mt-8">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-2">Payment</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Your payment information is processed securely. We do not store credit card details nor have access to your credit card information. We use Stripe(international) and EGHL(Malaysia) as our primary payment gateway and we do not support PayPal.
                </p>
                
                <div className="flex space-x-2">
                  {['amex', 'apple', 'diners', 'discover', 'google', 'jcb', 'mastercard', 'visa'].map((payment) => (
                    <div key={payment} className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-black font-medium">{payment.charAt(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium mb-2">Shipping</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Rates are approximations. Exact rates will be provided at checkout. We currently do not ship to Israel, Palestine, Russia, Ukraine as advised by our courier partner FedEx.
                </p>
                
                <Button variant="outline" className="text-sm">
                  ESTIMATE SHIPPING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
