
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Plus,
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays, startOfWeek, endOfWeek, isWeekend, startOfMonth, endOfMonth, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface Event {
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

const eventTypeColors = {
  'reunión': 'bg-blue-100 text-blue-800',
  'claustro': 'bg-green-100 text-green-800',
  'consello escolar': 'bg-yellow-100 text-yellow-800',
  'formación': 'bg-purple-100 text-purple-800',
  'charla': 'bg-pink-100 text-pink-800'
};

const AgendaPage = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock data for events
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      date: new Date(2025, 3, 8),
      title: 'Claustro extraordinario',
      eventType: 'claustro',
      recipients: 'Todo o claustro',
      space: 'Sala de profesores',
      timeStart: '16:00',
      timeEnd: '17:30',
      mandatory: true
    },
    {
      id: '2',
      date: new Date(2025, 3, 9),
      title: 'Formación LOMLOE',
      eventType: 'formación',
      recipients: 'Todo o claustro',
      space: 'Biblioteca',
      timeStart: '17:00',
      timeEnd: '19:00',
      mandatory: false
    },
    {
      id: '3',
      date: new Date(2025, 3, 10),
      title: 'Reunión ciclo',
      eventType: 'reunión',
      recipients: 'Profesorado 1º ciclo',
      space: 'Aula 12',
      timeStart: '14:00',
      timeEnd: '15:00',
      mandatory: true
    },
    {
      id: '4',
      date: new Date(2025, 3, 15),
      title: 'Charla educativa',
      eventType: 'charla',
      recipients: 'Todo o claustro',
      space: 'Salón de actos',
      timeStart: '18:00',
      timeEnd: '19:30',
      mandatory: false
    },
    {
      id: '5',
      date: new Date(2025, 3, 22),
      title: 'Consello escolar',
      eventType: 'consello escolar',
      recipients: 'Membros do consello',
      space: 'Sala de xuntas',
      timeStart: '16:30',
      timeEnd: '18:00',
      mandatory: true
    }
  ]);

  // Form for adding a new event
  const form = useForm({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      eventType: 'reunión',
      title: '',
      recipients: '',
      space: '',
      timeStart: '16:00',
      timeEnd: '17:00',
      mandatory: false
    }
  });

  const onSubmit = (data: any) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      date: new Date(data.date),
      title: data.title,
      eventType: data.eventType,
      recipients: data.recipients,
      space: data.space,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      mandatory: data.mandatory
    };
    
    setEvents([...events, newEvent]);
    setOpenDialog(false);
    form.reset();
  };

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

  // Get events for the current month
  const getEventsForMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    
    return events.filter(event => 
      event.date >= start && event.date <= end
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Get dates that have events in the current month
  const getDatesWithEvents = () => {
    return events.map(event => event.date);
  };

  // Format a day label
  const formatDayLabel = (day: Date) => {
    return format(day, 'EEEE d', { locale: es }).replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Axenda</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <Button 
          className="bg-scola-primary hover:bg-scola-primary/90"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear evento
        </Button>
      </div>

      <Tabs defaultValue="week">
        <TabsList className="mb-4">
          <TabsTrigger value="week">Vista semanal</TabsTrigger>
          <TabsTrigger value="month">Vista mensual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week">
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
                  <div key={index} className={`border rounded-md p-2 ${isWeekend(day) ? 'bg-gray-50' : ''}`}>
                    <div className="text-center border-b pb-2 mb-2">
                      <p className={`font-medium ${isWeekend(day) ? 'text-gray-500' : ''}`}>{formatDayLabel(day)}</p>
                    </div>
                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-0 right-0 h-6 w-6 p-0"
                        onClick={() => {
                          form.setValue('date', format(day, 'yyyy-MM-dd'));
                          setOpenDialog(true);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Engadir evento</span>
                      </Button>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-6">
                        {getEventsForDay(day).length > 0 ? (
                          getEventsForDay(day).map((event) => (
                            <div 
                              key={event.id} 
                              className="p-2 border rounded-md text-xs"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <Badge className={`${eventTypeColors[event.eventType]} text-[10px]`}>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="month">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-scola-primary" />
                  {format(currentDate, 'MMMM yyyy', { locale: es }).replace(/^\w/, (c) => c.toUpperCase())}
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}
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
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-7 lg:grid-cols-3 gap-6">
                <div className="md:col-span-3 lg:col-span-1">
                  <div className="border rounded-md p-4">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={currentDate}
                      onMonthChange={setCurrentDate}
                      className="w-full pointer-events-auto"
                      modifiers={{
                        hasEvent: getDatesWithEvents()
                      }}
                      modifiersStyles={{
                        hasEvent: { backgroundColor: '#E1F0FA' }
                      }}
                    />
                  </div>
                </div>
                <div className="md:col-span-4 lg:col-span-2">
                  <div className="border rounded-md p-4 h-full">
                    <h3 className="text-lg font-medium mb-4">Eventos do mes</h3>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {getEventsForMonth().length > 0 ? (
                        getEventsForMonth().map((event) => (
                          <div 
                            key={event.id} 
                            className={`p-3 border rounded-md ${
                              selectedDate && isSameDay(event.date, selectedDate) 
                                ? 'border-scola-primary bg-scola-pastel' 
                                : ''
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">{format(event.date, 'EEEE d MMMM', { locale: es }).replace(/^\w/, (c) => c.toUpperCase())}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{event.timeStart} - {event.timeEnd}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-base font-medium">{event.title}</h4>
                              <Badge className={`${eventTypeColors[event.eventType]}`}>
                                {event.eventType}
                              </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{event.recipients}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{event.space}</span>
                              </div>
                            </div>
                            {event.mandatory && (
                              <div className="mt-2">
                                <span className="text-xs text-red-500 font-medium">* Asistencia obrigatoria</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-400 py-4">Non hai eventos para este mes</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog to create a new event */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear evento</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do evento</FormLabel>
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
                <FormField
                  control={form.control}
                  name="eventType"
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
                          <SelectItem value="reunión">Reunión</SelectItem>
                          <SelectItem value="claustro">Claustro</SelectItem>
                          <SelectItem value="consello escolar">Consello Escolar</SelectItem>
                          <SelectItem value="formación">Formación</SelectItem>
                          <SelectItem value="charla">Charla</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do evento</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Reunión ciclo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="recipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destinatarios</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <Input {...field} placeholder="Ex: Todo o claustro" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="space"
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
                          <SelectItem value="Sala de profesores">Sala de profesores</SelectItem>
                          <SelectItem value="Biblioteca">Biblioteca</SelectItem>
                          <SelectItem value="Aula 12">Aula 12</SelectItem>
                          <SelectItem value="Aula 14">Aula 14</SelectItem>
                          <SelectItem value="Salón de actos">Salón de actos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeStart"
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
                  name="timeEnd"
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
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Evento obrigatorio</FormLabel>
                    <FormMessage />
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
    </DashboardLayout>
  );
};

export default AgendaPage;
