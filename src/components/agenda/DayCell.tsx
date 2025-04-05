
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { format, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event } from '@/types/agenda';

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

  return (
    <div className={`border rounded-md p-2 ${isWeekend(day) ? 'bg-gray-50' : ''}`}>
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
          {events.length > 0 ? (
            events.map((event) => (
              <div 
                key={event.id} 
                className="p-2 border rounded-md text-xs"
              >
                <div className="flex justify-between items-start mb-1">
                  <Badge className={`${EventTypeColors[event.eventType]} text-[10px]`}>
                    {event.eventType}
                  </Badge>
                  {event.mandatory && (
                    <span className="text-red-500 text-[10px]">*</span>
                  )}
                </div>
                <p className="font-medium line-clamp-2">{event.title}</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.timeStart} - {event.timeEnd}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{event.space}</span>
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

import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';
import { EventTypeColors } from '@/types/agenda';

export default DayCell;
