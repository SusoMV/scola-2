import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WeekView from '@/components/agenda/WeekView';
import MonthView from '@/components/agenda/MonthView';
import CreateEventDialog from '@/components/agenda/CreateEventDialog';
import { Event } from '@/types/agenda';
const AgendaPage = () => {
  const {
    user
  } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  // Mock data for events
  const [events, setEvents] = useState<Event[]>([{
    id: '1',
    date: new Date(2025, 3, 8),
    title: 'Claustro extraordinario',
    eventType: 'claustro',
    recipients: 'Todo o claustro',
    space: 'Sala de profesores',
    timeStart: '16:00',
    timeEnd: '17:30',
    mandatory: true
  }, {
    id: '2',
    date: new Date(2025, 3, 9),
    title: 'Formación LOMLOE',
    eventType: 'formación',
    recipients: 'Todo o claustro',
    space: 'Biblioteca',
    timeStart: '17:00',
    timeEnd: '19:00',
    mandatory: false
  }, {
    id: '3',
    date: new Date(2025, 3, 10),
    title: 'Reunión ciclo',
    eventType: 'reunión',
    recipients: 'Profesorado 1º ciclo',
    space: 'Aula 12',
    timeStart: '14:00',
    timeEnd: '15:00',
    mandatory: true
  }, {
    id: '4',
    date: new Date(2025, 3, 15),
    title: 'Charla educativa',
    eventType: 'charla',
    recipients: 'Todo o claustro',
    space: 'Salón de actos',
    timeStart: '18:00',
    timeEnd: '19:30',
    mandatory: false
  }, {
    id: '5',
    date: new Date(2025, 3, 22),
    title: 'Consello escolar',
    eventType: 'consello escolar',
    recipients: 'Membros do consello',
    space: 'Sala de xuntas',
    timeStart: '16:30',
    timeEnd: '18:00',
    mandatory: true
  }]);
  const handleAddEvent = (day?: Date) => {
    if (day) {
      setSelectedDay(day);
    }
    setOpenDialog(true);
  };
  const handleSubmitEvent = (data: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...data,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
    setOpenDialog(false);
    setSelectedDay(undefined);
  };
  return <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Axenda</h1>
          
        </div>
        
        <Button className="bg-scola-primary hover:bg-scola-primary/90" onClick={() => handleAddEvent()}>
          <Plus className="mr-2 h-4 w-4" /> Crear evento
        </Button>
      </div>

      <Tabs defaultValue="week">
        <TabsList className="mb-4">
          <TabsTrigger value="week">Vista semanal</TabsTrigger>
          <TabsTrigger value="month">Vista mensual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week">
          <WeekView events={events} currentDate={currentDate} setCurrentDate={setCurrentDate} onAddEvent={handleAddEvent} />
        </TabsContent>
        
        <TabsContent value="month">
          <MonthView events={events} currentDate={currentDate} setCurrentDate={setCurrentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </TabsContent>
      </Tabs>

      {/* Dialog to create a new event */}
      <CreateEventDialog open={openDialog} onOpenChange={setOpenDialog} onSubmitEvent={handleSubmitEvent} defaultDate={selectedDay} />
    </DashboardLayout>;
};
export default AgendaPage;