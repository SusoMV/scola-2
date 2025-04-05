
export interface Event {
  id: string;
  date: Date;
  title: string;
  eventType: 'reunión' | 'claustro' | 'consello escolar' | 'formación' | 'charla';
  recipients: string;
  space: string;
  timeStart: string;
  timeEnd: string;
  mandatory: boolean;
}

export const EventTypeColors: Record<Event['eventType'], string> = {
  'reunión': 'bg-blue-100 text-blue-800',
  'claustro': 'bg-green-100 text-green-800',
  'consello escolar': 'bg-yellow-100 text-yellow-800',
  'formación': 'bg-purple-100 text-purple-800',
  'charla': 'bg-pink-100 text-pink-800'
};
