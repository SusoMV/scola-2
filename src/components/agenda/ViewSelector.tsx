
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
        <TabsList className="mb-4 bg-muted">
          <TabsTrigger 
            value="week" 
            className="data-[state=active]:bg-scola-primary data-[state=active]:text-white"
          >
            Semana
          </TabsTrigger>
          <TabsTrigger 
            value="month"
            className="data-[state=active]:bg-scola-primary data-[state=active]:text-white"
          >
            Mes
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export default ViewSelector;
