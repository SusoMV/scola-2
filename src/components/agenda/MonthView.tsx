import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, startOfMonth, endOfMonth, isSameDay, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import EventCard from './EventCard';
import { Event } from '@/types/agenda';
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
  setSelectedDate
}) => {
  // Get events for the current month
  const getEventsForMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return events.filter(event => event.start >= start && event.start <= end).sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  // Get dates that have events in the current month
  const getDatesWithEvents = () => {
    return events.map(event => event.start);
  };

  // Get weekend dates
  const getWeekendDates = () => {
    return Array.from({
      length: 31
    }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
      return isWeekend(date) ? date : null;
    }).filter(Boolean) as Date[];
  };
  return <Card className="border border-scola-gray-dark">
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
                {getEventsForMonth().length > 0 ? getEventsForMonth().map(event => <EventCard key={event.id} event={event} isSelected={selectedDate && isSameDay(event.start, selectedDate)} />) : <p className="text-center text-gray-400 py-4">Non hai eventos para este mes</p>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default MonthView;