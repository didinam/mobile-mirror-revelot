
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface FeaturedCollectionProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ 
  title, 
  description, 
  image, 
  link 
}) => {
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
    <section ref={sectionRef} className="py-16 bg-gray-50 reveal-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-sm font-medium uppercase tracking-widest mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <Link 
              to={link}
              className="inline-block border border-black text-black px-6 py-2 text-sm uppercase hover:bg-black hover:text-white transition-colors"
            >
              Explore Collection
            </Link>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="overflow-hidden">
              <div className="aspect-square">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
