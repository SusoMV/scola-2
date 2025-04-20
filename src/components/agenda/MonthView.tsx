import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, MapPin, Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, startOfMonth, endOfMonth, isSameDay, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event } from '@/types/agenda';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface MonthViewProps {
  events: Event[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  events,
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
}) => {
  const isMobile = useIsMobile();
  
  // Get events for the current month
  const getEventsForMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return events
      .filter(event => event.start >= start && event.start <= end)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .map(event => ({
        ...event,
        isMandatory: event.type === 'meeting' || event.type === 'claustro' || event.type === 'consello escolar'
      }));
  };

  const getDatesWithEvents = () => events.map(event => event.start);
  const getWeekendDates = () => {
    return Array.from({ length: 31 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
      return isWeekend(date) ? date : null;
    }).filter(Boolean) as Date[];
  };

  return (
    <Card className="border-0 shadow-sm h-full">
      {isMobile ? (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium">
                  {format(currentDate, 'MMMM yyyy', { locale: es }).replace(/^\w/, c => c.toUpperCase())}
                </h2>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Hoxe
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <CalendarComponent 
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentDate}
              onMonthChange={setCurrentDate}
              modifiers={{
                hasEvent: getDatesWithEvents(),
                weekend: getWeekendDates()
              }}
              modifiersStyles={{
                hasEvent: {
                  backgroundColor: '#E1F0FA'
                },
                weekend: {
                  backgroundColor: '#FEF7CD'
                }
              }}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Eventos do mes</h3>
            <div className="space-y-4">
              {getEventsForMonth().map((event) => (
                <div 
                  key={event.id}
                  className={`p-4 border rounded-lg ${
                    selectedDate && isSameDay(event.start, selectedDate)
                      ? 'border-scola-primary bg-scola-pastel'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium">
                      {format(event.start, 'EEEE d MMMM', { locale: es })
                        .replace(/^\w/, c => c.toUpperCase())}
                    </h4>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium flex items-center">
                      {event.isMandatory && (
                        <Star className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                      )}
                      {event.title}
                    </h3>
                    <Badge className="ml-2">{event.type}</Badge>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.description}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center my-0 py-[8px]">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-scola-primary" />
              {format(currentDate, 'MMMM yyyy', {
                locale: es
              }).replace(/^\w/, c => c.toUpperCase())}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}>
                Anterior
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Hoxe
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}>
                Siguiente
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="md:col-span-3">
              <div className="border rounded-md p-2 flex items-start justify-center h-full">
                <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} month={currentDate} onMonthChange={setCurrentDate} modifiers={{
                  hasEvent: getDatesWithEvents(),
                  weekend: getWeekendDates()
                }} modifiersStyles={{
                  hasEvent: {
                    backgroundColor: '#E1F0FA'
                  },
                  weekend: {
                    backgroundColor: '#FEF7CD'
                  }
                }} className="rounded-md mx-auto [&_.rdp-cell]:p-1 [&_.rdp-button]:p-2 [&_.rdp-day]:text-lg [&_.rdp]:max-w-full [&_.rdp-button]:h-10 [&_.rdp-button]:w-10" />
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="border rounded-md p-4 h-full">
                <h3 className="text-lg font-medium mb-4">Eventos do mes</h3>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {getEventsForMonth().length > 0 ? getEventsForMonth().map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      isSelected={selectedDate && isSameDay(event.start, selectedDate)}
                      isMandatory={event.isMandatory} 
                    />
                  )) : <p className="text-center text-gray-400 py-4">Non hai eventos para este mes</p>}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default MonthView;
