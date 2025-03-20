
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="mb-1">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="black" />
          <path d="M12 4L14 8L12 12L10 8L12 4Z" fill="white" />
          <path d="M12 12L14 16L12 20L10 16L12 12Z" fill="white" />
          <path d="M4 12L8 10L12 12L8 14L4 12Z" fill="white" />
          <path d="M12 12L16 10L20 12L16 14L12 12Z" fill="white" />
        </svg>
      </div>
      <div className="font-serif tracking-wider text-lg font-medium">REVELOT</div>
    </div>
  );
};

export default Logo;
