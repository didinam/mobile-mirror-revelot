
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: '16\' Black Mesh Bracelet',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: false,
      collection: 'straps',
      slug: '16-black-mesh-bracelet'
    },
    {
      id: '2',
      title: '16\' Silver Mesh Bracelet',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: false,
      collection: 'straps',
      slug: '16-silver-mesh-bracelet'
    },
    {
      id: '3',
      title: '16\' Gunmetal Mesh Bracelet',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: true,
      collection: 'straps',
      slug: '16-gunmetal-mesh-bracelet'
    },
    {
      id: '4',
      title: '16\' Rose Gold Mesh Bracelet',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: true,
      collection: 'straps',
      slug: '16-rose-gold-mesh-bracelet'
    }
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sticky top-0 w-full text-center py-2 bg-black text-white text-sm z-40">
        Get 10% Off When You Sign Up To Our Newsletter
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-center text-3xl font-serif mb-10">PRODUCTS</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
            <span>Availability</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
            <span>Price</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center border border-gray-300 rounded px-4 py-2 bg-white">
            <span>Sort</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
