
import React from 'react';
import Hero from '@/components/home/Hero';
import ProductFeature from '@/components/home/ProductFeature';
import Gallery from '@/components/home/Gallery';
import { useIsMobile } from '@/hooks/use-mobile';

const IndexPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'space-y-0' : 'space-y-16 py-8'}`}>
      <Hero />
      <ProductFeature 
        title="Premium Craftsmanship"
        description="Our timepieces are meticulously crafted with attention to detail. Each watch represents the perfect balance of elegant design and precision engineering, created for those who appreciate the exceptional."
        image="/lovable-uploads/5f89fd53-65cb-4737-91e8-c0ca6285eace.png"
        buttonText="SHOP NOW"
        buttonLink="/cart"
      />
      <Gallery />
    </div>
  );
};

export default IndexPage;
