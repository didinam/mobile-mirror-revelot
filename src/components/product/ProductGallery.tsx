
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type ProductGalleryProps = {
  images: string[];
  productTitle: string;
};

const ProductGallery = ({ images, productTitle }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full bg-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative w-full max-w-md mx-auto">
          <AspectRatio ratio={1/1} className="w-full bg-black">
            {images.length > 0 ? (
              <img 
                src={images[activeImage]} 
                alt={productTitle} 
                className="w-full h-full object-contain mx-auto"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                No image available
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
      
      <button 
        onClick={prevImage} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={nextImage} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`w-2 h-2 rounded-full ${
              activeImage === index ? 'bg-white' : 'bg-gray-500'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
