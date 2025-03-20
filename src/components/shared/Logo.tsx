
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="font-serif tracking-wider text-xl font-medium">Watch+</div>
    </div>
  );
};

export default Logo;
