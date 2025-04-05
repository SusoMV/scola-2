
import React from 'react';

interface ScolaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ScolaLogo: React.FC<ScolaLogoProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/57e327f2-678a-421f-bc97-ac74785f656e.png" 
          alt="Scola Logo" 
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ScolaLogo;
