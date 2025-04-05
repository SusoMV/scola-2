
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDays, format, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import DayCell from './DayCell';
import { Event } from '@/types/agenda';

interface WeekViewProps {
  events: Event[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onAddEvent: (day: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ events, currentDate, setCurrentDate, onAddEvent }) => {
  // Get the current week dates
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i));
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  return (
    <Card className="border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-scola-primary" />
            Semana del {format(startOfCurrentWeek, 'd MMM', { locale: es })} al {format(endOfCurrentWeek, 'd MMM yyyy', { locale: es })}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addDays(currentDate, -7))}
            >
              Anterior
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoxe
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => (
            <DayCell 
              key={index} 
              day={day} 
              events={getEventsForDay(day)} 
              onAddEvent={onAddEvent} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekView;
