
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CurrentSubstitutionsTable from './CurrentSubstitutionsTable';
import HistoricalSubstitutionsTable from './HistoricalSubstitutionsTable';
import { Substitution } from '@/types/substitutions';

interface TabsContainerProps {
  substitutions: Substitution[];
  filteredHistoricalSubstitutions: Substitution[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleToggleSeen: (id: string) => void;
  openCreateDialog: () => void;
  isDirector: boolean;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  substitutions,
  filteredHistoricalSubstitutions,
  searchQuery,
  setSearchQuery,
  handleToggleSeen,
  openCreateDialog,
  isDirector
}) => {
  return (
    <Tabs defaultValue="current" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="current">
            Hoxe
          </TabsTrigger>
          <TabsTrigger value="historical">
            Histórico
          </TabsTrigger>
        </TabsList>
        
        {isDirector && (
          <Button 
            className="bg-[#0070C0] hover:bg-[#0070C0]/90 text-white"
            onClick={openCreateDialog}
          >
            <Plus className="mr-2 h-4 w-4" /> Crear Ausencia
          </Button>
        )}
      </div>
      
      <TabsContent value="current">
        <CurrentSubstitutionsTable 
          substitutions={substitutions}
          handleToggleSeen={handleToggleSeen}
          openCreateDialog={openCreateDialog}
          isDirector={isDirector}
        />
      </TabsContent>
      
      <TabsContent value="historical">
        <HistoricalSubstitutionsTable
          filteredHistoricalSubstitutions={filteredHistoricalSubstitutions}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
