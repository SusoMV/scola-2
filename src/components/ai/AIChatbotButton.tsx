import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
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
  return <button className={cn("flex flex-col items-center justify-center h-32 w-full p-4", "border border-dashed border-blue-300 rounded-lg", "hover:bg-blue-50 hover:border-blue-400 transition-all duration-200", "focus:outline-none focus:ring-2 focus:ring-blue-300")} onClick={onClick}>
      <Icon className="h-8 w-8 text-scola-primary mb-3" />
      <span className="text-center text-gray-700 font-normal text-sm">{name}</span>
    </button>;
};
export default AIChatbotButton;