
import React, { useEffect, useRef } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const images: GalleryImage[] = [
    {
      id: '1',
      src: '/lovable-uploads/3f565649-2493-4c68-af91-7d92ecd3a495.png',
      alt: 'Watch on wrist'
    },
    {
      id: '2',
      src: '/lovable-uploads/b70f4fff-659f-4d4d-a51d-44dcf2237a26.png',
      alt: 'Watch detail'
    },
    {
      id: '3',
      src: '/lovable-uploads/a853447a-248d-4240-be15-a9630c510e10.png',
      alt: 'Watch on desk'
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
        <h2 className="text-center text-3xl font-serif mb-10">GALLERY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-lg"
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
      </div>
    </section>
  );
};

export default Gallery;
