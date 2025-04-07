
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ViewSelectorProps {
  children: React.ReactNode;
  defaultView?: 'month' | 'week';
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ 
  children, 
  defaultView = 'month' 
}) => {
  return (
    <Tabs defaultValue={defaultView} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export default ViewSelector;
