
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Plus } from 'lucide-react';

interface HeaderProps {
  onAddEvent: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEvent }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Axenda</h1>
        </div>
        <Button 
          onClick={onAddEvent} 
          className="bg-scola-primary hover:bg-scola-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Engadir evento
        </Button>
      </div>
      <div className="dotted-border w-full h-1 mt-2"></div>
    </div>
  );
};

export default Header;
