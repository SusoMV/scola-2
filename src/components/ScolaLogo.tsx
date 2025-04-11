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
  return <div className={`flex items-center ${className}`}>
      <div className={`${sizeClasses[size]}`}>
        <img alt="Scola Logo" className="h-full object-contain" src="/lovable-uploads/83fee77b-c858-451c-b157-b5914b5dfa49.png" />
      </div>
    </div>;
};
export default ScolaLogo;