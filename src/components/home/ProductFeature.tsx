
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <Link to={buttonLink}>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              {buttonText}
            </Button>
          </Link>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center">
          <div className="aspect-square w-full max-w-md overflow-hidden">
            <img 
              src={image}
              alt="Premium watch" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeature;
