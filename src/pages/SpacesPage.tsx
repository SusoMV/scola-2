import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building, Plus, Info, Calendar, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
interface Space {
  id: string;
  name: string;
  type: 'aula' | 'sala' | 'biblioteca' | 'pavillón' | 'taller' | 'despacho';
  capacity: number;
  availability: string[];
  features: string[];
  location: string;
}
interface Reservation {
  id: string;
  spaceId: string;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  approved: boolean;
}
const SpacesPage = () => {
  const {
    user
  } = useAuth();
  const [openAddSpaceDialog, setOpenAddSpaceDialog] = useState(false);
  const [openReserveDialog, setOpenReserveDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [activeTab, setActiveTab] = useState<'aula' | 'sala' | 'biblioteca' | 'pavillón' | 'taller' | 'despacho'>('aula');

  // Check if the user has director role (in a real app, this would come from user context)
  const isDirector = true; // Mock value: user?.role === 'director'

  // Mock data for spaces
  const [spaces, setSpaces] = useState<Space[]>([{
    id: '1',
    name: 'Aula 1º A',
    type: 'aula',
    capacity: 25,
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    features: ['wifi', 'proyector', 'pizarra digital'],
    location: 'Planta baja, ala este'
  }, {
    id: '2',
    name: 'Aula 2º B',
    type: 'aula',
    capacity: 20,
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    features: ['wifi', 'ordenadores'],
    location: 'Primera planta, ala oeste'
  }, {
    id: '3',
    name: 'Biblioteca central',
    type: 'biblioteca',
    capacity: 50,
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    features: ['wifi', 'ordenadores', 'proyector', 'impresora'],
    location: 'Planta baja, ala norte'
  }, {
    id: '4',
    name: 'Sala de profesores',
    type: 'sala',
    capacity: 15,
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    features: ['wifi', 'ordenadores', 'impresora'],
    location: 'Primera planta, ala este'
  }, {
    id: '5',
    name: 'Pavillón deportivo',
    type: 'pavillón',
    capacity: 100,
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    features: ['vestuarios', 'material deportivo'],
    location: 'Exterior, zona norte'
  }, {
    id: '6',
    name: 'Taller de tecnología',
    type: 'taller',
    capacity: 30,
    availability: ['Martes', 'Jueves'],
    features: ['impresora 3d', 'herramientas', 'robots'],
    location: 'Segunda planta, ala oeste'
  }, {
    id: '7',
    name: 'Despacho orientación',
    type: 'despacho',
    capacity: 6,
    availability: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    features: ['wifi', 'ordenador'],
    location: 'Primera planta, ala este'
  }]);

  // Mock data for reservations
  const [reservations, setReservations] = useState<Reservation[]>([{
    id: '1',
    spaceId: '3',
    title: 'Reunión claustro',
    date: '2025-04-10',
    timeStart: '16:00',
    timeEnd: '18:00',
    approved: true
  }, {
    id: '2',
    spaceId: '5',
    title: 'Jornadas deportivas',
    date: '2025-04-15',
    timeStart: '09:00',
    timeEnd: '14:00',
    approved: true
  }, {
    id: '3',
    spaceId: '4',
    title: 'Formación LOMLOE',
    date: '2025-04-12',
    timeStart: '17:00',
    timeEnd: '19:00',
    approved: false
  }]);

  // Forms
  const addSpaceForm = useForm({
    defaultValues: {
      name: '',
      type: 'aula',
      capacity: 0,
      availability: [],
      features: '',
      location: ''
    }
  });
  const reserveSpaceForm = useForm({
    defaultValues: {
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      timeStart: '16:00',
      timeEnd: '17:00'
    }
  });
  const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Get spaces by type
  const getSpacesByType = (type: string) => {
    return spaces.filter(space => space.type === type);
  };

  // Handle adding a new space
  const handleAddSpace = (data: any) => {
    const selectedAvailability = weekdays.filter((_, index) => data.availability[index]);
    const newSpace: Space = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type,
      capacity: data.capacity,
      availability: selectedAvailability,
      features: data.features.split(',').map((feature: string) => feature.trim()),
      location: data.location
    };
    setSpaces([...spaces, newSpace]);
    setOpenAddSpaceDialog(false);
    addSpaceForm.reset();
  };

  // Handle reserving a space
  const handleReserveSpace = (data: any) => {
    if (selectedSpace) {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        spaceId: selectedSpace.id,
        title: data.title,
        date: data.date,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        approved: false // Needs to be approved by the director
      };
      setReservations([...reservations, newReservation]);
      setOpenReserveDialog(false);
      reserveSpaceForm.reset();
    }
  };

  // Handle deleting a space
  const handleDeleteSpace = (id: string) => {
    setSpaces(spaces.filter(space => space.id !== id));
  };
  return <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Espazos</h1>
          
        </div>
        
        {isDirector && <Button className="bg-scola-primary hover:bg-scola-primary/90" onClick={() => setOpenAddSpaceDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Engadir espazo
          </Button>}
      </div>

      <Tabs defaultValue="aula" onValueChange={value => setActiveTab(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="aula">Aulas</TabsTrigger>
          <TabsTrigger value="sala">Salas</TabsTrigger>
          <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
          <TabsTrigger value="pavillón">Pavillón</TabsTrigger>
          <TabsTrigger value="taller">Taller</TabsTrigger>
          <TabsTrigger value="despacho">Despachos</TabsTrigger>
        </TabsList>
        
        {(['aula', 'sala', 'biblioteca', 'pavillón', 'taller', 'despacho'] as const).map(type => <TabsContent key={type} value={type}>
            <Card className="border border-scola-gray-dark">
              <CardHeader className="pb-2">
                <CardTitle className="font-medium flex items-center my-0 px-0 text-lg py-[9px]">
                  <Building className="h-5 w-5 mr-2 text-[#0070C0]" />
                  {type === 'aula' ? 'Aulas' : type === 'biblioteca' ? 'Biblioteca' : type === 'pavillón' ? 'Pavillón' : type === 'sala' ? 'Salas' : type === 'taller' ? 'Talleres' : 'Despachos'}
                </CardTitle>
                
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getSpacesByType(type).length > 0 ? getSpacesByType(type).map(space => <div key={space.id} className="border rounded-md p-4 relative overflow-hidden">
                        <div className="border-l-4 border-[#0070C0] pl-2 mb-3">
                          <h3 className="font-medium">{space.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Capacidade:</span> {space.capacity} persoas
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {space.features.map((feature, index) => <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>)}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button className="flex-1 bg-[#0070C0] hover:bg-[#0070C0]/90" onClick={() => {
                    setSelectedSpace(space);
                    setOpenReserveDialog(true);
                  }}>
                            <Calendar className="h-4 w-4 mr-2" /> Reservar
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => {
                    setSelectedSpace(space);
                    setOpenDetailsDialog(true);
                  }}>
                            <Info className="h-4 w-4 text-[#0070C0]" />
                          </Button>
                          {isDirector && <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteSpace(space.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>}
                        </div>
                      </div>) : <div className="col-span-full text-center py-8 text-gray-500">
                      Non hai espazos nesta categoría
                    </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>)}
      </Tabs>

      {/* Dialog to add a new space */}
      <Dialog open={openAddSpaceDialog} onOpenChange={setOpenAddSpaceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Engadir novo espazo</DialogTitle>
          </DialogHeader>
          <Form {...addSpaceForm}>
            <form onSubmit={addSpaceForm.handleSubmit(handleAddSpace)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={addSpaceForm.control} name="name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Nome do espazo</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: Aula 1º A" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={addSpaceForm.control} name="type" render={({
                field
              }) => <FormItem>
                      <FormLabel>Tipo de espazo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aula">Aula</SelectItem>
                          <SelectItem value="sala">Sala</SelectItem>
                          <SelectItem value="biblioteca">Biblioteca</SelectItem>
                          <SelectItem value="pavillón">Pavillón</SelectItem>
                          <SelectItem value="taller">Taller</SelectItem>
                          <SelectItem value="despacho">Despacho</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField control={addSpaceForm.control} name="capacity" render={({
                field
              }) => <FormItem>
                      <FormLabel>Capacidade</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                <FormField control={addSpaceForm.control} name="location" render={({
                field
              }) => <FormItem>
                      <FormLabel>Ubicación</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: Planta baixa, ala este" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>
              
              <FormField control={addSpaceForm.control} name="availability" render={() => <FormItem>
                    <FormLabel>Dispoñibilidade</FormLabel>
                    <div className="space-y-2">
                      {weekdays.map((day, index) => <div key={day} className="flex items-center">
                          <Checkbox id={`day-${index}`} onCheckedChange={checked => {
                    const currentAvailability = addSpaceForm.getValues('availability') || [];
                    const newAvailability = [...currentAvailability];
                    newAvailability[index] = checked === true;
                    addSpaceForm.setValue('availability', newAvailability);
                  }} />
                          <label htmlFor={`day-${index}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {day}
                          </label>
                        </div>)}
                    </div>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={addSpaceForm.control} name="features" render={({
              field
            }) => <FormItem>
                    <FormLabel>Características (separadas por comas)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: wifi, proyector, ordenadores" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenAddSpaceDialog(false)} className="mr-2">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#0070C0] hover:bg-[#0070C0]/90">Gardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog to reserve a space */}
      <Dialog open={openReserveDialog} onOpenChange={setOpenReserveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reservar espazo: {selectedSpace?.name}</DialogTitle>
          </DialogHeader>
          <Form {...reserveSpaceForm}>
            <form onSubmit={reserveSpaceForm.handleSubmit(handleReserveSpace)} className="space-y-4">
              <FormField control={reserveSpaceForm.control} name="title" render={({
              field
            }) => <FormItem>
                    <FormLabel>Título da reserva</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Reunión ciclo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={reserveSpaceForm.control} name="date" render={({
              field
            }) => <FormItem>
                    <FormLabel>Data da reserva</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField control={reserveSpaceForm.control} name="timeStart" render={({
                field
              }) => <FormItem>
                      <FormLabel>Hora de inicio</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={reserveSpaceForm.control} name="timeEnd" render={({
                field
              }) => <FormItem>
                      <FormLabel>Hora de fin</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>
              
              <p className="text-sm text-gray-500">
                A reserva será enviada ao equipo directivo para a súa aprobación.
              </p>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenReserveDialog(false)} className="mr-2">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#0070C0] hover:bg-[#0070C0]/90">Reservar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog to show space details */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedSpace?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedSpace && <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de espazo</h4>
                <p className="text-[#0070C0]">{selectedSpace.type}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Capacidade</h4>
                <p>{selectedSpace.capacity} persoas</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Ubicación</h4>
                <p>{selectedSpace.location}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Dispoñibilidade</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSpace.availability.map((day, index) => <Badge key={index} variant="outline">
                      {day}
                    </Badge>)}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Características</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSpace.features.map((feature, index) => <Badge key={index} variant="outline">
                      {feature}
                    </Badge>)}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Próximas reservas</h4>
                {reservations.filter(r => r.spaceId === selectedSpace.id && r.approved).length > 0 ? <ul className="space-y-2">
                    {reservations.filter(r => r.spaceId === selectedSpace.id && r.approved).map(reservation => <li key={reservation.id} className="text-sm p-2 bg-gray-50 rounded-md">
                          <p className="font-medium">{reservation.title}</p>
                          <p className="text-gray-500">
                            {format(new Date(reservation.date), 'dd/MM/yyyy')} | {reservation.timeStart} - {reservation.timeEnd}
                          </p>
                        </li>)}
                  </ul> : <p className="text-sm text-gray-500">Non hai reservas próximas</p>}
              </div>
            </div>}
          
          <DialogFooter>
            <Button onClick={() => setOpenDetailsDialog(false)}>
              Pechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>;
};
export default SpacesPage;