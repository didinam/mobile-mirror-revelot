
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const isMobile = useIsMobile();
  const images: GalleryImage[] = [
    {
      id: '1',
      src: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      alt: 'Chronograph watch with mesh bracelet'
    },
    {
      id: '2',
      src: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      alt: 'Silver chronograph on black background'
    },
    {
      id: '3',
      src: '/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png',
      alt: 'Close-up of silver mesh bracelet watch'
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-12 reveal-section">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-serif uppercase mb-8">GALLERY</h2>
        
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className="overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile Gallery Slider (visible only on small screens) */}
        {isMobile && (
          <div className="mt-2 relative">
            <div className="overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Navigation dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      activeIndex === index ? 'bg-black' : 'bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
