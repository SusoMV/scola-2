
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIChatbotButtonProps {
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const AIChatbotButton: React.FC<AIChatbotButtonProps> = ({
  name,
  icon: Icon,
  onClick
}) => {
  const isMobile = useIsMobile();
  
  return (
    <button 
      className={cn(
        "flex flex-col items-center justify-center w-full p-4",
        "border border-dashed border-scola-primary rounded-md",
        "hover:bg-scola-pastel hover:border-solid transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-scola-primary focus:ring-opacity-50",
        isMobile ? "h-24" : "h-32"
      )} 
      onClick={onClick}
    >
      <Icon className={cn(
        "text-scola-primary mb-2",
        isMobile ? "h-6 w-6" : "h-8 w-8"
      )} />
      <span className={cn(
        "text-center text-gray-700 font-normal",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {name}
      </span>
    </button>
  );
};

export default AIChatbotButton;

