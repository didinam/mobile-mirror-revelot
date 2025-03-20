
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

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
    <section ref={sectionRef} className="py-16 reveal-section">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-medium uppercase tracking-widest mb-3">LATEST COLLECTION</h2>
        <h3 className="text-center text-3xl font-serif mb-6">{title}</h3>
        
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-base leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button 
            asChild
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            <Link to={link}>LEARN MORE</Link>
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="image-container">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
