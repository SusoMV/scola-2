
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
  return <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]}`}>
        <img alt="Scola Logo" className="h-full object-contain" src="/lovable-uploads/c41bd140-209b-47b7-8856-51ffafcfdc23.png" />
      </div>
    </div>;
};
export default ScolaLogo;
