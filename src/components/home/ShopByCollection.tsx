
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Collection {
  id: string;
  title: string;
  image: string;
  link: string;
}

const ShopByCollection: React.FC = () => {
  const collections: Collection[] = [
    {
      id: '1',
      title: 'TERRA',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      link: '/collections/terra'
    },
    {
      id: '2',
      title: 'GENTUS',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      link: '/collections/gentus'
    },
    {
      id: '3',
      title: 'STRAPS',
      image: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      link: '/collections/straps'
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

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
        <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-3">SIGNATURES</h2>
        <h3 className="text-center text-3xl font-serif mb-10">SHOP BY COLLECTION</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              to={collection.link}
              className="group overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-white text-2xl font-serif tracking-wide">
                    {collection.title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
