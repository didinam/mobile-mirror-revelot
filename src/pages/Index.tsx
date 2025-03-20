
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
        description="A design that pays tribute to the iconic Dirty Dozen collection of field watches created by twelve different Swiss watchmakers during the final years of World War II. Issued to British servicemen, these watches represent a unique intersection of horology and military history, holding a significant place in both watchmaking and wartime memorabilia."
        image="/lovable-uploads/1a311dec-5032-4861-8a49-04825816b5be.png"
        link="/collections/terra"
      />
      
      <ShopByCollection />
      
      <Gallery />
    </div>
  );
};

export default Index;
