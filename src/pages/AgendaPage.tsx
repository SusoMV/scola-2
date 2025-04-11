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

export const AgendaPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { events, addEvent } = useAgendaEvents();
  
  const handleAddEvent = () => {
    setIsDialogOpen(true);
  };

  const handleCreateEvent = (newEvent: Omit<Event, "id">) => {
    // Since we need to keep the event type as a valid literal type,
    // we'll translate for display but keep the original type for the data model
    const translatedDisplayName = translateEventType(newEvent.type);
    
    // Add the event with its original type (which matches the Event type)
    addEvent(newEvent);
    setIsDialogOpen(false);
  };
  
  // Function to translate event types to Galician (used for display only)
  const translateEventType = (type: Event['type']): string => {
    const translations: Record<Event['type'], string> = {
      'meeting': 'reunión',
      'tutoring': 'titoría',
      'activity': 'actividade',
      'reunion': 'reunión',
      'claustro': 'claustro',
      'consello escolar': 'consello escolar',
      'formación': 'formación',
      'charla': 'charla'
    };
    
    return translations[type] || type;
  };

  return (
    <DashboardLayout>
      <Header />

      <ViewSelector defaultView="week" onAddEvent={handleAddEvent}>
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
          defaultDate={selectedDate}
        />
      )}
    </DashboardLayout>
  );
};

export default AgendaPage;
