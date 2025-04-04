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
      <div className={`text-scola-primary font-bold ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="">
          <path d="M20 10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30C25.5 30 30 25.5 30 20C30 14.5 25.5 10 20 10ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" />
          <path d="M45 15C42.8 15 41 16.8 41 19V30H43V19C43 17.9 43.9 17 45 17H52V15H45Z" />
          <path d="M55 10C53.9 10 53 10.9 53 12C53 13.1 53.9 14 55 14C56.1 14 57 13.1 57 12C57 10.9 56.1 10 55 10ZM54 16V30H56V16H54Z" />
          <path d="M70 16C66.7 16 64 18.7 64 22C64 25.3 66.7 28 70 28C71.6 28 73 27.4 74 26.4V30H76V22C76 18.7 73.3 16 70 16ZM70 26C67.8 26 66 24.2 66 22C66 19.8 67.8 18 70 18C72.2 18 74 19.8 74 22C74 24.2 72.2 26 70 26Z" />
          <path d="M88 16H82V18H87.2L82 26V30H88V28H82.8L88 20V16Z" />
        </svg>
      </div>
      <span className="ml-2 text-scola-primary font-bold text-2xl">Scola</span>
    </div>;
};
export default ScolaLogo;