
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: '16\' Black Bamboo Leather Strap',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/6d0cd294-d25f-489e-a94d-7dfc196028e4.png',
      soldOut: false,
      collection: 'straps',
      slug: '16-black-bamboo-leather-strap'
    },
    {
      id: '2',
      title: '16\' Blue Saffiano Leather Strap',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/6d0cd294-d25f-489e-a94d-7dfc196028e4.png',
      soldOut: false,
      collection: 'straps',
      slug: '16-blue-saffiano-leather-strap'
    },
    {
      id: '3',
      title: '16\' Pink Crocodile Leather Strap',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/6d0cd294-d25f-489e-a94d-7dfc196028e4.png',
      soldOut: true,
      collection: 'straps',
      slug: '16-pink-crocodile-leather-strap'
    },
    {
      id: '4',
      title: '16\' Beige Suede Leather Strap',
      price: 89.00,
      currency: 'RM',
      image: '/lovable-uploads/6d0cd294-d25f-489e-a94d-7dfc196028e4.png',
      soldOut: true,
      collection: 'straps',
      slug: '16-beige-suede-leather-strap'
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
