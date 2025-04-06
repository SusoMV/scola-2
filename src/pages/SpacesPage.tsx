import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Building, Plus, Calendar, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Datos de ejemplo para espacios
const MOCK_SPACES = [{
  id: 1,
  name: 'Biblioteca',
  capacity: 40,
  equipment: 'Proxector, Ordenador',
  status: 'Disponible'
}, {
  id: 2,
  name: 'Sala de profesores',
  capacity: 25,
  equipment: 'Proxector, Ordenador, Impresora',
  status: 'Disponible'
}, {
  id: 3,
  name: 'Aula de Música',
  capacity: 30,
  equipment: 'Equipo de son, Piano, Instrumentos',
  status: 'Ocupado'
}, {
  id: 4,
  name: 'Salón de actos',
  capacity: 120,
  equipment: 'Escenario, Equipo de son, Luces',
  status: 'Ocupado'
}, {
  id: 5,
  name: 'Laboratorio',
  capacity: 35,
  equipment: 'Material de laboratorio',
  status: 'Mantemento'
}];

// Datos de ejemplo para reservas
const MOCK_RESERVATIONS = [{
  id: 1,
  space: 'Biblioteca',
  date: '2025-04-15',
  timeStart: '10:00',
  timeEnd: '12:00',
  purpose: 'Actividade de lectura'
}, {
  id: 2,
  space: 'Sala de profesores',
  date: '2025-04-16',
  timeStart: '15:00',
  timeEnd: '17:00',
  purpose: 'Reunión de departamento'
}, {
  id: 3,
  space: 'Salón de actos',
  date: '2025-04-20',
  timeStart: '17:00',
  timeEnd: '19:00',
  purpose: 'Actuación teatral'
}];
const SpacesPage = () => {
  const [openSpaceDialog, setOpenSpaceDialog] = useState(false);
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [spaces, setSpaces] = useState(MOCK_SPACES);
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [searchText, setSearchText] = useState('');

  // Formulario para espazos
  const spaceForm = useForm({
    defaultValues: {
      name: '',
      capacity: '',
      equipment: '',
      status: 'Disponible'
    }
  });

  // Formulario para reservas
  const reservationForm = useForm({
    defaultValues: {
      space: '',
      date: '',
      timeStart: '',
      timeEnd: '',
      purpose: ''
    }
  });
  const handleSpaceSubmit = (data: any) => {
    const newSpace = {
      id: Date.now(),
      name: data.name,
      capacity: parseInt(data.capacity),
      equipment: data.equipment,
      status: data.status
    };
    setSpaces([...spaces, newSpace]);
    toast.success('Espazo engadido con éxito');
    setOpenSpaceDialog(false);
    spaceForm.reset();
  };
  const handleReservationSubmit = (data: any) => {
    const newReservation = {
      id: Date.now(),
      space: data.space,
      date: data.date,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      purpose: data.purpose
    };
    setReservations([...reservations, newReservation]);
    toast.success('Reserva creada con éxito');
    setOpenReservationDialog(false);
    reservationForm.reset();
  };
  const filteredSpaces = spaces.filter(space => space.name.toLowerCase().includes(searchText.toLowerCase()) || space.equipment.toLowerCase().includes(searchText.toLowerCase()));
  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Espazos</h1>
        </div>
        
      </div>
      
      <Tabs defaultValue="spaces">
        <TabsList className="mb-4">
          <TabsTrigger value="spaces">Espazos</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spaces">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Building className="h-5 w-5 text-scola-primary" />
                Espazos disponibles
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="text" placeholder="Buscar espazo..." className="pl-8 w-[200px]" value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>
                
                <Dialog open={openSpaceDialog} onOpenChange={setOpenSpaceDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-scola-primary hover:bg-scola-primary/90">
                      <Plus className="mr-2 h-4 w-4" /> Novo espazo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Engadir novo espazo</DialogTitle>
                    </DialogHeader>
                    <Form {...spaceForm}>
                      <form onSubmit={spaceForm.handleSubmit(handleSpaceSubmit)} className="space-y-4">
                        <FormField control={spaceForm.control} name="name" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Nome do espazo</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Biblioteca" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={spaceForm.control} name="capacity" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Capacidade</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Número de persoas" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={spaceForm.control} name="equipment" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Equipamento</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Descripción do equipamento" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={spaceForm.control} name="status" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar estado" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Disponible">Disponible</SelectItem>
                                  <SelectItem value="Ocupado">Ocupado</SelectItem>
                                  <SelectItem value="Mantemento">Mantemento</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />
                        
                        <div className="flex justify-end space-x-2 pt-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button type="submit">Gardar</Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-scola-gray-dark">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Nome</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Capacidade</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Equipamento</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpaces.length > 0 ? filteredSpaces.map(space => <tr key={space.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2 font-medium">{space.name}</td>
                          <td className="py-3 px-2">{space.capacity} persoas</td>
                          <td className="py-3 px-2 max-w-xs">
                            <div className="truncate" title={space.equipment}>
                              {space.equipment}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${space.status === 'Disponible' ? 'bg-green-100 text-green-700' : space.status === 'Ocupado' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {space.status}
                            </span>
                          </td>
                        </tr>) : <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-500">
                          Non se atoparon espazos
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservations">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Calendar className="h-5 w-5 text-scola-primary" />
                Reservas de espazos
              </CardTitle>
              
              <Dialog open={openReservationDialog} onOpenChange={setOpenReservationDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-scola-primary hover:bg-scola-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Nova reserva
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear nova reserva</DialogTitle>
                  </DialogHeader>
                  <Form {...reservationForm}>
                    <form onSubmit={reservationForm.handleSubmit(handleReservationSubmit)} className="space-y-4">
                      <FormField control={reservationForm.control} name="space" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Espazo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar espazo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {spaces.filter(space => space.status === 'Disponible').map(space => <SelectItem key={space.id} value={space.name}>
                                      {space.name}
                                    </SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />
                      
                      <FormField control={reservationForm.control} name="date" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <Input type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={reservationForm.control} name="timeStart" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Hora de inicio</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={reservationForm.control} name="timeEnd" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Hora de fin</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                      
                      <FormField control={reservationForm.control} name="purpose" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Motivo</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describa o motivo da reserva" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <div className="flex justify-end space-x-2 pt-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Gardar</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-scola-gray-dark">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Espazo</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Data</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.length > 0 ? reservations.map(reservation => <tr key={reservation.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2 font-medium">{reservation.space}</td>
                          <td className="py-3 px-2">{reservation.date}</td>
                          <td className="py-3 px-2">{reservation.timeStart} - {reservation.timeEnd}</td>
                          <td className="py-3 px-2 max-w-xs">
                            <div className="truncate" title={reservation.purpose}>
                              {reservation.purpose}
                            </div>
                          </td>
                        </tr>) : <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-500">
                          Non hai reservas
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>;
};
export default SpacesPage;