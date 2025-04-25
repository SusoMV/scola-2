
import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ViewSelectorProps {
  children: ReactNode;
  defaultView?: string;
  onAddEvent?: () => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ 
  children, 
  defaultView = "week",
  onAddEvent
}) => {
  return (
    <Tabs defaultValue={defaultView}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="deadlines">Prazos</TabsTrigger>
        </TabsList>
        
        {onAddEvent && (
          <Button 
            onClick={onAddEvent} 
            className="bg-scola-primary hover:bg-scola-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Engadir evento
          </Button>
        )}
      </div>
      
      {children}
    </Tabs>
  );
};

export default ViewSelector;
