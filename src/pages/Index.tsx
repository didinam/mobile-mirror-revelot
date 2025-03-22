
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Gallery from '@/components/home/Gallery';

const IndexPage = () => {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <FeaturedCollection 
        title="Summer Collection"
        description="Discover our latest collection of timepieces perfect for the summer season. Elegant designs that complement your summer style."
        image="/lovable-uploads/1a311dec-5032-4861-8a49-04825816b5be.png"
        link="/products?collection=summer"
      />
      <Gallery />
    </div>
  );
};

export default IndexPage;
