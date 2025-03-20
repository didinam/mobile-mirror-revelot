
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types';

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Gentus 40MM | Black Chronograph Steel (Automatic)',
      price: 1599.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: true,
      collection: 'gentus',
      slug: 'gentus-40mm-black-chronograph-steel-automatic'
    },
    {
      id: '2',
      title: 'Terra 39MM | Silver Chronograph Mesh (Automatic)',
      price: 1499.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: false,
      collection: 'terra',
      slug: 'terra-39mm-silver-chronograph-mesh-automatic'
    },
    {
      id: '3',
      title: 'Gentus 42MM | Silver Steel Chronograph (Automatic)',
      price: 1499.00,
      currency: 'RM',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      soldOut: false,
      collection: 'gentus',
      slug: 'gentus-42mm-silver-steel-chronograph-automatic'
    }
  ]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('revealed');
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 reveal-section">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-serif mb-10">BEST SELLERS</h2>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory space-x-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="snap-center flex-shrink-0 w-72">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
            aria-label="Next product"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
