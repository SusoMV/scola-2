
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, addDays, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import { useForm } from 'react-hook-form';

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  recipients: string;
  location: string;
  mandatory: boolean;
}

const eventTypes = [
  { id: 'meeting', label: 'Reunión', color: 'bg-blue-100 text-blue-800' },
  { id: 'faculty', label: 'Claustro', color: 'bg-purple-100 text-purple-800' },
  { id: 'council', label: 'Consello escolar', color: 'bg-amber-100 text-amber-800' },
  { id: 'training', label: 'Formación', color: 'bg-green-100 text-green-800' },
  { id: 'talk', label: 'Charla', color: 'bg-pink-100 text-pink-800' },
];

const spaces = [
  'Biblioteca', 'Salón de actos', 'Aula 1A', 'Aula 1B', 'Aula 2A', 
  'Aula 2B', 'Sala de profesores', 'Laboratorio', 'Ximnasio'
];

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Reunión de departamento',
    description: 'Revisar os proxectos do trimestre',
    date: new Date('2025-04-04'),
    startTime: '10:00',
    endTime: '11:30',
    type: 'meeting',
    recipients: 'Departamento de Ciencias',
    location: 'Sala de profesores',
    mandatory: true
  },
  {
    id: '2',
    title: 'Charla sobre novas tecnoloxías',
    description: 'Presentación de novos recursos dixitais',
    date: new Date('2025-04-05'),
    startTime: '12:00',
    endTime: '13:30',
    type: 'talk',
    recipients: 'Todo o profesorado',
    location: 'Salón de actos',
    mandatory: false
  },
  {
    id: '3',
    title: 'Claustro final de mes',
    description: 'Avaliación de actividades do mes',
    date: new Date('2025-04-08'),
    startTime: '16:00',
    endTime: '18:00',
    type: 'faculty',
    recipients: 'Todo o profesorado',
    location: 'Biblioteca',
    mandatory: true
  },
  {
    id: '4',
    title: 'Formación en atención á diversidade',
    description: 'Taller práctico sobre adaptacións curriculares',
    date: new Date('2025-04-10'),
    startTime: '09:30',
    endTime: '13:30',
    type: 'training',
    recipients: 'Profesorado de apoio',
    location: 'Aula 2A',
    mandatory: true
  }
];

const AgendaPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events] = useState<Event[]>(mockEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      type: '',
      recipients: '',
      location: '',
      mandatory: false
    }
  });

  const onSubmit = (data: any) => {
    console.log("New event data:", data);
    setOpenDialog(false);
    // In a real app, this would make an API call to create the event
  };

  // Get week days for weekly view
  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDays = getWeekDays(date);

  // Filter events for the current week
  const getEventsByWeek = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return weekDays.some(day => 
        format(day, 'yyyy-MM-dd') === format(eventDate, 'yyyy-MM-dd')
      );
    });
  };

  // Get events for a specific day
  const getEventsByDay = (day: Date) => {
    return events.filter(event => 
      format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  // Get event type details
  const getEventTypeDetails = (typeId: string) => {
    return eventTypes.find(type => type.id === typeId) || { id: typeId, label: typeId, color: 'bg-gray-100 text-gray-800' };
  };

  // Handle date selection in calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      form.setValue('date', format(date, 'yyyy-MM-dd'));
      setOpenDialog(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Axenda</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-scola-primary hover:bg-scola-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Crear Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Novo Evento</DialogTitle>
              <DialogDescription>
                Complete os datos do novo evento para o calendario.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do evento</FormLabel>
                      <FormControl>
                        <Input placeholder="Introduza o título do evento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de evento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrición (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Introduza unha descrición do evento" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destinatarios</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Introduza os destinatarios do evento" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Espazo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar espazo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {spaces.map((space) => (
                            <SelectItem key={space} value={space}>{space}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                          <Input type="date" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora de inicio</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <Input type="time" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora de fin</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <Input type="time" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="mandatory"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Evento obrigatorio</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpenDialog(false)}
                    className="mr-2"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Gardar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="week">
        <TabsList className="mb-4">
          <TabsTrigger value="week">Vista Semanal</TabsTrigger>
          <TabsTrigger value="month">Vista Mensual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Semana do {format(weekDays[0], 'd MMMM', { locale: es })} ao {format(weekDays[6], 'd MMMM yyyy', { locale: es })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-md ${
                      isWeekend(day) ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className={`text-center p-2 font-medium border-b ${
                      isWeekend(day) ? 'bg-gray-100' : 'bg-scola-pastel'
                    }`}>
                      <div className="text-xs uppercase">{format(day, 'EEEE', { locale: es })}</div>
                      <div className="text-lg">{format(day, 'd')}</div>
                    </div>
                    <div className="p-1 min-h-[150px]">
                      {getEventsByDay(day).map((event) => (
                        <div 
                          key={event.id}
                          className={`mb-1 p-1 rounded-sm text-xs truncate ${getEventTypeDetails(event.type).color}`}
                          title={event.title}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div>{event.startTime} - {event.endTime}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="month">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-scola-gray-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Calendario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  locale={es}
                  // Mark days with events
                  modifiers={{
                    hasEvent: (date) => events.some(
                      event => format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                    )
                  }}
                  modifiersClassNames={{
                    hasEvent: 'bg-scola-pastel text-scola-primary font-bold'
                  }}
                />
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Lenda:</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <Badge key={type.id} className={type.color}>{type.label}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-scola-gray-dark">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Eventos do mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <div key={event.id} className="border rounded-md p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className={getEventTypeDetails(event.type).color}>
                            {getEventTypeDetails(event.type).label}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" /> 
                            {format(new Date(event.date), 'EEEE, d MMMM', { locale: es })}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> 
                            {event.startTime} - {event.endTime}
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm mt-2">{event.description}</p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {event.location}
                          </span>
                          {event.mandatory && (
                            <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                              Obligatorio
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500">Non hai eventos planificados</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AgendaPage;
