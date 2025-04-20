import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { addDays, format, startOfWeek, endOfWeek, isSameDay, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event } from '@/types/agenda';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import DayCell from './DayCell';

interface WeekViewProps {
  events: Event[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onAddEvent: (day: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  events,
  currentDate,
  setCurrentDate,
  onAddEvent
}) => {
  const isMobile = useIsMobile();
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i));

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.start, day));
  };

  const formatDayName = (date: Date) => {
    return format(date, "EEEE d", { locale: es }).replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <Card className="border-0 shadow-sm">
      {isMobile ? (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-6">
            <Calendar className="h-5 w-5 text-scola-primary" />
            <span className="text-sm font-medium">
              Semana del {format(startOfCurrentWeek, 'd MMM', { locale: es })} al{' '}
              {format(endOfCurrentWeek, 'd MMM yyyy', { locale: es })}
            </span>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(addDays(currentDate, -7))}
              className="text-sm"
            >
              Anterior
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(new Date())}
              className="text-sm"
            >
              Hoxe
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
              className="text-sm"
            >
              Siguiente
            </Button>
          </div>

          <div className="space-y-4">
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg ${isWeekend(day) ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-base font-medium ${isWeekend(day) ? 'text-gray-500' : ''}`}>
                    {formatDayName(day)}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onAddEvent(day)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {getEventsForDay(day).length > 0 ? (
                    getEventsForDay(day).map(event => (
                      <div key={event.id} className="p-3 bg-white border rounded-md shadow-sm">
                        <Badge className="mb-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          {event.type}
                        </Badge>
                        <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center">
                            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                          </div>
                          <div className="truncate">{event.location}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 text-sm py-2">Sen eventos</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CardContent>
          <div className="pb-2 my-[8px]">
            <div className="flex justify-between items-center py-4">
              <div className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-scola-primary" />
                Semana del {format(startOfCurrentWeek, 'd MMM', {
                locale: es
              })} al {format(endOfCurrentWeek, 'd MMM yyyy', {
                locale: es
              })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Hoxe
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
          <div className="py-[18px]">
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => (
                <DayCell key={index} day={day} events={getEventsForDay(day)} onAddEvent={onAddEvent} />
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WeekView;
