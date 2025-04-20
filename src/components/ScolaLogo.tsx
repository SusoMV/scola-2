
import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className={`flex items-center justify-center ${className}`}>
      <Link to="/dashboard" className={`${sizeClasses[size]}`}>
        <img 
          alt="Scola Logo" 
          className="h-full object-contain cursor-pointer" 
          src="/lovable-uploads/c41bd140-209b-47b7-8856-51ffafcfdc23.png" 
        />
      </Link>
    </div>
  );
};

export default ScolaLogo;
