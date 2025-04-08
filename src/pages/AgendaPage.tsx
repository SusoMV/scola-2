
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MonthView from '@/components/agenda/MonthView';
import WeekView from '@/components/agenda/WeekView';
import CreateEventDialog from '@/components/agenda/CreateEventDialog';
import Header from '@/components/agenda/Header';
import ViewSelector from '@/components/agenda/ViewSelector';
import { Event } from '@/types/agenda';
import { useAgendaEvents } from '@/hooks/useAgendaEvents';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const AgendaPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { events, addEvent } = useAgendaEvents();
  
  const handleAddEvent = () => {
    setIsDialogOpen(true);
  };

  const handleCreateEvent = (newEvent: Omit<Event, "id">) => {
    addEvent(newEvent);
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Axenda</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <ViewSelector defaultView="week">
        <TabsContent value="week">
          <WeekView 
            events={events} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onAddEvent={handleAddEvent}
          />
        </TabsContent>
        
        <TabsContent value="month">
          <MonthView 
            events={events} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </TabsContent>
      </ViewSelector>

      {isDialogOpen && (
        <CreateEventDialog 
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onCreateEvent={handleCreateEvent}
        />
      )}
    </DashboardLayout>
  );
};

export default AgendaPage;
