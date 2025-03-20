
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="w-full aspect-square bg-black"
        style={{
          backgroundImage: "url('/lovable-uploads/b99b01af-a2e5-4146-9c2b-860e1c680ab8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end text-white px-4 z-10 pb-16">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif mb-4 uppercase">MECADROMO</h1>
          <Button 
            asChild
            className="bg-white text-black hover:bg-white/90 font-medium px-8 py-2 text-sm uppercase"
          >
            <Link to="/collections/mecadromo">LEARN MORE</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
