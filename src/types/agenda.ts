
export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'tutoring' | 'activity' | 'reunion' | 'claustro' | 'consello escolar' | 'formación' | 'charla';
  description: string;
  location: string;
}

export const EventTypeColors: Record<string, string> = {
  'meeting': 'bg-blue-100 text-blue-800',
  'tutoring': 'bg-green-100 text-green-800',
  'activity': 'bg-yellow-100 text-yellow-800',
  'reunion': 'bg-blue-100 text-blue-800',
  'claustro': 'bg-green-100 text-green-800',
  'consello escolar': 'bg-yellow-100 text-yellow-800',
  'formación': 'bg-purple-100 text-purple-800',
  'charla': 'bg-pink-100 text-pink-800'
};
