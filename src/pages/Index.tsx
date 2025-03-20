
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import BestSellers from '@/components/home/BestSellers';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import ShopByCollection from '@/components/home/ShopByCollection';
import Gallery from '@/components/home/Gallery';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sticky top-16 w-full text-center py-2 bg-white border-b border-gray-200 text-black text-sm z-40">
        Get 10% Off When You Sign Up To Our Newsletter
      </div>
      
      <Hero />
      
      <div className="mt-12 mb-6 px-4">
        <h2 className="text-center text-2xl font-serif uppercase">BEST SELLERS</h2>
      </div>
      
      <BestSellers />
      
      <FeaturedCollection 
        title="TERRA"
        description="A premium chronograph collection featuring stainless steel cases, precision movements, and elegant mesh bracelets. These sophisticated timepieces combine classic styling with modern functionality, perfect for both formal occasions and everyday wear."
        image="/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png"
        link="/collections/terra"
      />
      
      <ShopByCollection />
      
      <Gallery />
    </div>
  );
};

export default Index;
