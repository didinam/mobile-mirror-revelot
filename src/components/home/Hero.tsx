
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    // Add a featured product to cart
    const featuredProduct = {
      id: 'featured-1',
      title: 'Gentus 40MM | Black Chronograph Steel (Automatic)',
      price: 1599.00,
      currency: 'RM',
      image: '/lovable-uploads/5f89fd53-65cb-4737-91e8-c0ca6285eace.png',
      collection: 'gentus',
      slug: 'gentus-40mm-black-chronograph-steel-automatic',
    };
    
    addToCart(featuredProduct, 1);
    toast.success('Product added to cart', {
      description: 'Gentus 40MM Black Chronograph has been added to your cart'
    });
    
    // Navigate to cart page
    navigate('/cart');
  };
  
  return (
    <div className="relative w-full">
      <div 
        className={`w-full bg-black ${isMobile ? 'h-screen' : 'aspect-square max-h-[80vh]'}`}
        style={{
          backgroundImage: "url('/lovable-uploads/5f89fd53-65cb-4737-91e8-c0ca6285eace.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 uppercase tracking-wider">MECADROMO</h1>
          <p className="text-white/90 mb-8 max-w-md mx-auto">
            Timeless elegance designed for the modern lifestyle.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={handleAddToCart}
              className="bg-white text-black hover:bg-white/90 font-medium px-8 py-6 text-sm uppercase"
            >
              <span className="flex items-center gap-2">
                SHOP NOW <ShoppingCart className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
