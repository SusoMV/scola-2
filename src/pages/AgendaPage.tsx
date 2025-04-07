
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MonthView from '@/components/agenda/MonthView';
import WeekView from '@/components/agenda/WeekView';
import CreateEventDialog from '@/components/agenda/CreateEventDialog';
import { Event } from '@/types/agenda';

export const AgendaPage = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Reunión de claustro",
      start: new Date(2025, 3, 10, 9, 0),
      end: new Date(2025, 3, 10, 11, 0),
      type: "meeting",
      description: "Reunión mensual do claustro para tratar temas académicos",
      location: "Sala de reunións",
    },
    {
      id: "2",
      title: "Titoría con familia",
      start: new Date(2025, 3, 12, 16, 0),
      end: new Date(2025, 3, 12, 17, 0),
      type: "tutoring",
      description: "Titoría coa familia de Martín González",
      location: "Aula 4B",
    },
    {
      id: "3",
      title: "Actividade deportiva",
      start: new Date(2025, 3, 15, 10, 0),
      end: new Date(2025, 3, 15, 12, 0),
      type: "activity",
      description: "Xornada deportiva interescolar",
      location: "Pavillón deportivo",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([...events, event]);
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Axenda</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="month" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
            </TabsList>

            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-scola-primary hover:bg-scola-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Engadir evento
            </Button>
          </div>

          <TabsContent value="month">
            <MonthView events={events} />
          </TabsContent>
          
          <TabsContent value="week">
            <WeekView events={events} />
          </TabsContent>
        </Tabs>
      </div>

      <CreateEventDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </DashboardLayout>
  );
};

export default AgendaPage;
