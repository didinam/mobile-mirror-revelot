
import React from 'react';
import Hero from '@/components/home/Hero';
import ProductFeature from '@/components/home/ProductFeature';
import Gallery from '@/components/home/Gallery';
import { useIsMobile } from '@/hooks/use-mobile';

const IndexPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? '' : 'space-y-16 py-8'}`}>
      <Hero />
      <div className={`${isMobile ? 'pt-8' : ''}`}>
        <ProductFeature 
          title="Premium Craftsmanship"
          description="Our timepieces are meticulously crafted with attention to detail. Each watch represents the perfect balance of elegant design and precision engineering, created for those who appreciate the exceptional."
          image="/lovable-uploads/1a311dec-5032-4861-8a49-04825816b5be.png"
          buttonText="Discover Our Collection"
          buttonLink="/products"
        />
      </div>
      <Gallery />
    </div>
  );
};

export default IndexPage;
