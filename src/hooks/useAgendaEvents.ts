
import { useState } from 'react';
import { Event } from '@/types/agenda';

export const useAgendaEvents = () => {
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

  const addEvent = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([...events, event]);
  };

  return { events, addEvent };
};
