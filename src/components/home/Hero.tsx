
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative w-full">
      <div 
        className={`w-full bg-black ${isMobile ? 'h-screen' : 'aspect-[21/9]'}`}
        style={{
          backgroundImage: "url('/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
        <div className="text-center max-w-xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 uppercase tracking-wider">MECADROMO</h1>
          <p className="text-white/90 mb-8 max-w-md mx-auto">
            Timeless elegance designed for the modern lifestyle. Discover our exceptional collection of premium timepieces.
          </p>
          <div className="flex justify-center">
            <Button 
              asChild
              className="bg-white text-black hover:bg-white/90 font-medium px-8 py-6 text-sm uppercase"
            >
              <Link to="/collections/mecadromo" className="flex items-center gap-2">
                SHOP NOW <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
