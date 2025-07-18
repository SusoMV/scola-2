import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Building, Plus, Calendar, Search, Info, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const SPACE_CATEGORIES = [
  { id: 'aulas', name: 'Aulas' },
  { id: 'salas', name: 'Salas' },
  { id: 'biblioteca', name: 'Biblioteca' },
  { id: 'pavillon', name: 'Pavillón' },
  { id: 'taller', name: 'Taller' },
  { id: 'despachos', name: 'Despachos' }
];

const MOCK_SPACES = [
  {
    id: 1,
    name: 'Sala de profesores',
    category: 'salas',
    capacity: 25,
    equipment: ['wifi', 'ordenadores', 'impresora'],
    status: 'Disponible'
  },
  {
    id: 2,
    name: 'Biblioteca',
    category: 'biblioteca',
    capacity: 40,
    equipment: ['wifi', 'ordenadores'],
    status: 'Disponible'
  },
  {
    id: 3,
    name: 'Aula de Música',
    category: 'aulas',
    capacity: 30,
    equipment: ['equipo de son', 'piano'],
    status: 'Ocupado'
  },
  {
    id: 4,
    name: 'Salón de actos',
    category: 'salas',
    capacity: 120,
    equipment: ['escenario', 'equipo de son', 'luces'],
    status: 'Ocupado'
  },
  {
    id: 5,
    name: 'Laboratorio',
    category: 'aulas',
    capacity: 35,
    equipment: ['material de laboratorio'],
    status: 'Mantemento'
  },
  {
    id: 6,
    name: 'Despacho de dirección',
    category: 'despachos',
    capacity: 5,
    equipment: ['wifi', 'ordenador', 'impresora'],
    status: 'Disponible'
  },
  {
    id: 7,
    name: 'Sala de reunións',
    category: 'salas',
    capacity: 15,
    equipment: ['wifi', 'proxector'],
    status: 'Disponible'
  },
  {
    id: 8,
    name: 'Pavillón deportivo',
    category: 'pavillon',
    capacity: 100,
    equipment: ['material deportivo'],
    status: 'Disponible'
  },
  {
    id: 9,
    name: 'Taller de tecnoloxía',
    category: 'taller',
    capacity: 25,
    equipment: ['ferramentas', 'maquinaria'],
    status: 'Disponible'
  }
];

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
  const [activeCategory, setActiveCategory] = useState('salas');
  const [showSpaceInfoDialog, setShowSpaceInfoDialog] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);

  const spaceForm = useForm({
    defaultValues: {
      name: '',
      category: 'salas',
      capacity: '',
      equipment: '',
      status: 'Disponible'
    }
  });

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
      category: data.category,
      capacity: parseInt(data.capacity),
      equipment: data.equipment.split(',').map((item: string) => item.trim()),
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

  const filteredSpaces = spaces.filter(space => space.category === activeCategory);

  const handleShowSpaceInfo = (space: any) => {
    setSelectedSpace(space);
    setShowSpaceInfoDialog(true);
  };

  const handleMakeReservation = (space: any) => {
    setSelectedSpace(space);
    reservationForm.setValue('space', space.name);
    setOpenReservationDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-[#0070C0]" />
          <h1 className="text-2xl font-bold">Espazos</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {SPACE_CATEGORIES.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <Button 
          className="bg-[#0070C0] hover:bg-[#0070C0]/90 flex gap-2 items-center"
          onClick={() => {
            spaceForm.setValue('category', activeCategory);
            setOpenSpaceDialog(true);
          }}
        >
          <Plus className="h-4 w-4" /> Novo espazo
        </Button>
      </div>
      
      <Card className="shadow-sm border-gray-200 rounded-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building className="h-5 w-5 text-[#0070C0]" />
            <h2 className="text-xl font-medium">
              {SPACE_CATEGORIES.find(cat => cat.id === activeCategory)?.name}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spaces.filter(space => space.category === activeCategory).length > 0 ? 
              spaces.filter(space => space.category === activeCategory).map(space => (
                <div 
                  key={space.id} 
                  className="border border-dashed border-scola-primary rounded-md p-6 hover:bg-scola-pastel hover:border-solid transition-all duration-200 cursor-pointer"
                >
                  <div className="border-l-4 border-[#0070C0] pl-3 mb-4">
                    <h3 className="text-lg font-medium">{space.name}</h3>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700">
                      <span className="font-medium">Capacidade:</span> {space.capacity} persoas
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {space.equipment.map((item: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 font-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-[1fr,auto,auto] gap-2">
                    <Button 
                      className="bg-[#0070C0] hover:bg-[#0070C0]/90 flex gap-2 items-center"
                      onClick={() => handleMakeReservation(space)}
                    >
                      <Calendar className="h-4 w-4" /> Reservar
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleShowSpaceInfo(space)}
                      className="border-gray-200"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Non hai espazos nesta categoría. Engade un novo espazo.
                </div>
              )
            }
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={openSpaceDialog} onOpenChange={setOpenSpaceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Engadir novo espazo</DialogTitle>
          </DialogHeader>
          <Form {...spaceForm}>
            <form onSubmit={spaceForm.handleSubmit(handleSpaceSubmit)} className="space-y-4">
              <FormField control={spaceForm.control} name="name" render={({field}) => (
                <FormItem>
                  <FormLabel>Nome do espazo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Biblioteca" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={spaceForm.control} name="category" render={({field}) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPACE_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={spaceForm.control} name="capacity" render={({field}) => (
                <FormItem>
                  <FormLabel>Capacidade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Número de persoas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={spaceForm.control} name="equipment" render={({field}) => (
                <FormItem>
                  <FormLabel>Equipamento</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrición do equipamento (separado por comas)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={spaceForm.control} name="status" render={({field}) => (
                <FormItem>
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
                </FormItem>
              )} />
              
              <div className="flex justify-end space-x-2 pt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#0070C0] hover:bg-[#0070C0]/90">Gardar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showSpaceInfoDialog} onOpenChange={setShowSpaceInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedSpace?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedSpace && (
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="font-medium">
                  {SPACE_CATEGORIES.find(cat => cat.id === selectedSpace.category)?.name}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Capacidade</p>
                <p className="font-medium">{selectedSpace.capacity} persoas</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Equipamento</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedSpace.equipment.map((item: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <Badge className={`mt-1 ${
                  selectedSpace.status === 'Disponible' ? 'bg-green-100 text-green-700' : 
                  selectedSpace.status === 'Ocupado' ? 'bg-red-100 text-red-700' : 
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedSpace.status}
                </Badge>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button 
              className="bg-[#0070C0] hover:bg-[#0070C0]/90"
              onClick={() => {
                setShowSpaceInfoDialog(false);
                handleMakeReservation(selectedSpace);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" /> Reservar este espazo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openReservationDialog} onOpenChange={setOpenReservationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nova reserva</DialogTitle>
          </DialogHeader>
          <Form {...reservationForm}>
            <form onSubmit={reservationForm.handleSubmit(handleReservationSubmit)} className="space-y-4">
              <FormField control={reservationForm.control} name="space" render={({field}) => (
                <FormItem>
                  <FormLabel>Espazo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar espazo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {spaces.filter(space => space.status === 'Disponible').map(space => (
                        <SelectItem key={space.id} value={space.name}>
                          {space.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={reservationForm.control} name="date" render={({field}) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField control={reservationForm.control} name="timeStart" render={({field}) => (
                  <FormItem>
                    <FormLabel>Hora de inicio</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={reservationForm.control} name="timeEnd" render={({field}) => (
                  <FormItem>
                    <FormLabel>Hora de fin</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <FormField control={reservationForm.control} name="purpose" render={({field}) => (
                <FormItem>
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describa o motivo da reserva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="flex justify-end space-x-2 pt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#0070C0] hover:bg-[#0070C0]/90">Gardar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SpacesPage;
