
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types';

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Gentus 40MM | Smoke Skeleton Steel (Automatic)',
      price: 1599.00,
      currency: 'RM',
      image: '/lovable-uploads/8ec8ae04-dd25-4420-a314-6ab813a63d7e.png',
      soldOut: true,
      collection: 'gentus',
      slug: 'gentus-40mm-smoke-skeleton-steel-automatic'
    },
    {
      id: '2',
      title: 'Terra 39MM | Black Field (Automatic)',
      price: 1499.00,
      currency: 'RM',
      image: '/lovable-uploads/7c89a365-a738-4cfe-8579-464caea8846f.png',
      soldOut: false,
      collection: 'terra',
      slug: 'terra-39mm-black-field-automatic'
    },
    {
      id: '3',
      title: 'Terra 39MM | Olive Green Field (Automatic)',
      price: 1499.00,
      currency: 'RM',
      image: '/lovable-uploads/e3781fe8-b5b7-4394-9bb4-9131904b8d2f.png',
      soldOut: false,
      collection: 'terra',
      slug: 'terra-39mm-olive-green-field-automatic'
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
