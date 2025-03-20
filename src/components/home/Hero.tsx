
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(1 - scrollPosition / 700, 0.4);
        const scale = Math.max(1 + scrollPosition / 5000, 1);
        const translateY = scrollPosition * 0.5;
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-black transition-transform duration-200"
        style={{
          backgroundImage: "url('/lovable-uploads/64b0f5d6-a3e2-4202-9bd2-e8d02d4d9c00.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
        <div className="text-center max-w-xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">MECADROMO</h1>
          <p className="mb-8 text-lg max-w-md mx-auto">
            Precision engineering meets timeless design in our signature collection
          </p>
          <Button 
            asChild
            className="bg-white text-black hover:bg-white/90 font-medium px-8 py-6 text-sm button-hover-effect"
          >
            <Link to="/collections/mecadromo">LEARN MORE</Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
