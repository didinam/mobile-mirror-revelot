
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import ShopByCollection from '@/components/home/ShopByCollection';
import BestSellers from '@/components/home/BestSellers';
import Gallery from '@/components/home/Gallery';
import NewsletterSignup from '@/components/marketing/NewsletterSignup';

const IndexPage = () => {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <FeaturedCollection />
      <ShopByCollection />
      <BestSellers />
      <div className="max-w-6xl mx-auto px-4">
        <NewsletterSignup />
      </div>
      <Gallery />
    </div>
  );
};

export default IndexPage;
