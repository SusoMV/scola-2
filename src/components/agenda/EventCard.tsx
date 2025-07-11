
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, MapPin, Users, Star } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event, EventTypeColors } from '@/types/agenda';

interface EventCardProps {
  event: Event;
  isSelected?: boolean;
  isMandatory?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, isMandatory }) => {
  return (
    <div 
      key={event.id} 
      className={`p-3 border rounded-md ${
        isSelected ? 'border-scola-primary bg-scola-pastel' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">
            {format(event.start, 'EEEE d MMMM', { locale: es }).replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>
            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-medium flex items-center">
          {isMandatory && <Star className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />}
          {event.title}
        </h4>
        <Badge className={`${EventTypeColors[event.type]}`}>
          {event.type}
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
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
  );
};

export default EventCard;
