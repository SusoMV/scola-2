import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  return <Button variant="outline" className={cn("flex flex-col items-center justify-center gap-2 h-32 w-full p-4", "border border-gray-200 bg-white hover:bg-scola-pastel hover:text-scola-primary hover:border-scola-primary", "transition-all duration-200 rounded-lg shadow-sm")} onClick={onClick}>
      <Icon className="h-8 w-8 text-scola-primary" />
      <span className="text-center font-normal text-sm">{name}</span>
    </Button>;
};
export default AIChatbotButton;