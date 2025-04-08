
import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ViewSelectorProps {
  children: ReactNode;
  defaultView?: string;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ 
  children, 
  defaultView = "week"
}) => {
  return (
    <Tabs defaultValue={defaultView}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
        </TabsList>
      </div>
      
      {children}
    </Tabs>
  );
};

export default ViewSelector;
