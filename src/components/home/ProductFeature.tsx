
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductFeatureProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const ProductFeature: React.FC<ProductFeatureProps> = ({ 
  title, 
  description, 
  image, 
  buttonText,
  buttonLink
}) => {
  const isMobile = useIsMobile();
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
    <section ref={sectionRef} className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50 reveal-section`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-medium">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
            <div className="pt-4">
              <Button 
                asChild
                className="bg-black text-white hover:bg-black/90 font-medium px-8 py-6 text-sm rounded-none"
              >
                <Link to={buttonLink} className="flex items-center gap-2">
                  {buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="overflow-hidden">
              <img 
                src={image} 
                alt={title} 
                className="w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
