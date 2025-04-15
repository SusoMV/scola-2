
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
        "flex flex-col items-center justify-center w-full p-4 border border-dashed border-blue-300 rounded-lg",
        "hover:bg-blue-50 hover:border-blue-400 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-300",
        isMobile ? "h-24" : "h-32"
      )} 
      onClick={onClick}
    >
      <Icon className={isMobile ? "h-6 w-6 text-scola-primary mb-2" : "h-8 w-8 text-scola-primary mb-3"} />
      <span className={isMobile ? "text-center text-gray-700 font-normal text-xs" : "text-center text-gray-700 font-normal text-sm"}>
        {name}
      </span>
    </button>
  );
};

export default AIChatbotButton;
