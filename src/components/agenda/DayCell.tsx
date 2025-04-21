
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { format, isWeekend, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event, EventTypeColors } from '@/types/agenda';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

interface DayCellProps {
  day: Date;
  events: Event[];
  onAddEvent: (day: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ day, events, onAddEvent }) => {
  // Format a day label
  const formatDayLabel = (day: Date) => {
    return format(day, 'EEEE d', { locale: es }).replace(/^\w/, (c) => c.toUpperCase());
  };

  // Get events for this specific day
  const eventsForDay = events.filter(event => isSameDay(event.start, day));

  return (
    <div className={`border border-dashed border-scola-primary rounded-md p-4 relative bg-white hover:bg-scola-pastel hover:border-solid transition-all duration-200 ${isWeekend(day) ? 'bg-gray-50' : ''}`}>
      <div className="text-center border-b pb-2 mb-2">
        <p className={`font-medium ${isWeekend(day) ? 'text-gray-500' : ''}`}>{formatDayLabel(day)}</p>
      </div>
      <div className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-0 right-0 h-6 w-6 p-0"
          onClick={() => onAddEvent(day)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Engadir evento</span>
        </Button>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-6">
          {eventsForDay.length > 0 ? (
            eventsForDay.map((event) => (
              <div 
                key={event.id} 
                className="p-2 border rounded-md text-xs"
              >
                <div className="flex justify-between items-start mb-1">
                  <Badge className={`${EventTypeColors[event.type]} text-[10px]`}>
                    {event.type}
                  </Badge>
                </div>
                <p className="font-medium line-clamp-2">{event.title}</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-xs py-2">Sen eventos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCell;
