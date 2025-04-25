
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CurrentSubstitutionsTable from './CurrentSubstitutionsTable';
import HistoricalSubstitutionsTable from './HistoricalSubstitutionsTable';
import UpcomingAbsencesTable from './UpcomingAbsencesTable';
import { Substitution } from '@/types/substitutions';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="current" className="w-full">
      <div className="flex justify-between items-center mb-2">
        <TabsList className={isMobile ? "h-8" : ""}>
          <TabsTrigger value="current" className={isMobile ? "px-3 py-1 text-xs h-6" : ""}>
            Hoxe
          </TabsTrigger>
          <TabsTrigger value="upcoming" className={isMobile ? "px-3 py-1 text-xs h-6" : ""}>
            Próximas
          </TabsTrigger>
          <TabsTrigger value="historical" className={isMobile ? "px-3 py-1 text-xs h-6" : ""}>
            Histórico
          </TabsTrigger>
        </TabsList>
        
        {isDirector && (
          <Button 
            className={isMobile 
              ? "bg-[#0070C0] hover:bg-[#0070C0]/90 text-white h-7 text-xs px-2 py-1" 
              : "bg-[#0070C0] hover:bg-[#0070C0]/90 text-white"
            }
            onClick={openCreateDialog}
          >
            <Plus className={isMobile ? "mr-1 h-3 w-3" : "mr-2 h-4 w-4"} /> 
            Crear Ausencia
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

      <TabsContent value="upcoming">
        <UpcomingAbsencesTable
          upcomingAbsences={filteredHistoricalSubstitutions.filter(sub => 
            new Date(sub.date) > new Date()
          )}
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
