
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Info, 
  Plus, 
  Trash2,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Printer
} from 'lucide-react';
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
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  availability: string[];
  features: string[];
  location: string;
  image?: string;
}

interface Reservation {
  id: string;
  spaceId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  userName: string;
  approved: boolean;
}

const SpacesPage = () => {
  const { user } = useAuth();
  
  // Check if the user has director role (in a real app, this would come from user context)
  const isDirector = true; // Mock value: user?.role === 'director'
  
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [activeTab, setActiveTab] = useState('classroom');
  const [openSpaceDialog, setOpenSpaceDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  
  // Mock data for spaces
  const spaces: Space[] = [
    {
      id: '1',
      name: 'Aula 1A',
      type: 'classroom',
      capacity: 25,
      availability: ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'],
      features: ['wifi', 'projector', 'computers'],
      location: 'Planta 1, Corredor A'
    },
    {
      id: '2',
      name: 'Aula 2B',
      type: 'classroom',
      capacity: 30,
      availability: ['Luns', 'Martes', 'Mércores', 'Xoves'],
      features: ['wifi', 'projector'],
      location: 'Planta 2, Corredor B'
    },
    {
      id: '3',
      name: 'Biblioteca',
      type: 'library',
      capacity: 40,
      availability: ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'],
      features: ['wifi', 'computers', 'printer'],
      location: 'Planta baixa, Ala este'
    },
    {
      id: '4',
      name: 'Sala de reunións',
      type: 'room',
      capacity: 15,
      availability: ['Luns', 'Mércores', 'Venres'],
      features: ['wifi', 'projector'],
      location: 'Planta 1, Ala oeste'
    },
    {
      id: '5',
      name: 'Pavillón deportivo',
      type: 'gym',
      capacity: 100,
      availability: ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'],
      features: [],
      location: 'Exterior, Zona norte'
    },
    {
      id: '6',
      name: 'Taller de tecnoloxía',
      type: 'workshop',
      capacity: 20,
      availability: ['Martes', 'Xoves'],
      features: ['computers', '3dprinter', 'robots'],
      location: 'Planta 2, Ala este'
    },
    {
      id: '7',
      name: 'Despacho de dirección',
      type: 'office',
      capacity: 5,
      availability: ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'],
      features: ['wifi', 'computers', 'printer'],
      location: 'Planta baixa, Zona central'
    }
  ];
  
  // Mock data for reservations
  const reservations: Reservation[] = [
    {
      id: '1',
      spaceId: '3',
      title: 'Club de lectura',
      date: '2025-04-05',
      startTime: '16:00',
      endTime: '18:00',
      userName: 'Ana García',
      approved: true
    },
    {
      id: '2',
      spaceId: '5',
      title: 'Preparación campionato',
      date: '2025-04-06',
      startTime: '15:00',
      endTime: '17:00',
      userName: 'Carlos Rodríguez',
      approved: true
    },
    {
      id: '3',
      spaceId: '6',
      title: 'Taller de robótica',
      date: '2025-04-07',
      startTime: '17:00',
      endTime: '19:00',
      userName: 'María López',
      approved: false
    }
  ];
  
  // Form for adding new space
  const spaceForm = useForm({
    defaultValues: {
      name: '',
      type: activeTab,
      capacity: 0,
      availability: [] as string[],
      features: [] as string[],
      location: ''
    }
  });
  
  // Form for reserving a space
  const reservationForm = useForm({
    defaultValues: {
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00'
    }
  });
  
  const onSubmitSpaceForm = (data: any) => {
    console.log("New space data:", data);
    setOpenSpaceDialog(false);
    // In a real app, this would make an API call to create the space
  };
  
  const onSubmitReservationForm = (data: any) => {
    console.log("New reservation data:", data, "for space:", selectedSpace?.id);
    setOpenReservationDialog(false);
    // In a real app, this would make an API call to create the reservation
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    spaceForm.setValue('type', value);
  };
  
  const handleOpenDetails = (space: Space) => {
    setSelectedSpace(space);
    setOpenDetailsDialog(true);
  };
  
  const handleOpenReservation = (space: Space) => {
    setSelectedSpace(space);
    setOpenReservationDialog(true);
  };
  
  const handleDeleteSpace = (spaceId: string) => {
    console.log("Delete space:", spaceId);
    // In a real app, this would make an API call to delete the space
  };
  
  // Helper function to get spaces by type
  const getSpacesByType = (type: string) => {
    return spaces.filter(space => space.type === type);
  };
  
  // Helper function to get reservations by space
  const getReservationsBySpace = (spaceId: string) => {
    return reservations.filter(
      reservation => reservation.spaceId === spaceId && reservation.approved
    );
  };
  
  // Helper function to render feature icon
  const renderFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'projector':
        return <Monitor className="h-4 w-4" />;
      case 'computers':
        return <Monitor className="h-4 w-4" />;
      case 'printer':
        return <Printer className="h-4 w-4" />;
      case '3dprinter':
        return <Printer className="h-4 w-4" />;
      case 'robots':
        return <Monitor className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Options for space features
  const featureOptions = [
    { id: 'wifi', label: 'Wifi' },
    { id: 'projector', label: 'Proxector' },
    { id: 'computers', label: 'Ordenadores' },
    { id: 'tablets', label: 'Tablets' },
    { id: 'printer', label: 'Impresora' },
    { id: '3dprinter', label: 'Impresora 3D' },
    { id: 'robots', label: 'Robots' }
  ];
  
  // Days of the week for availability
  const daysOfWeek = [
    { id: 'Luns', label: 'Luns' },
    { id: 'Martes', label: 'Martes' },
    { id: 'Mércores', label: 'Mércores' },
    { id: 'Xoves', label: 'Xoves' },
    { id: 'Venres', label: 'Venres' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Espazos</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        {isDirector && (
          <Dialog open={openSpaceDialog} onOpenChange={setOpenSpaceDialog}>
            <DialogTrigger asChild>
              <Button className="bg-scola-primary hover:bg-scola-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Engadir Espazo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Engadir Novo Espazo</DialogTitle>
                <DialogDescription>
                  Complete os datos do novo espazo.
                </DialogDescription>
              </DialogHeader>
              <Form {...spaceForm}>
                <form onSubmit={spaceForm.handleSubmit(onSubmitSpaceForm)} className="space-y-4">
                  <FormField
                    control={spaceForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do espazo</FormLabel>
                        <FormControl>
                          <Input placeholder="Introduza o nome do espazo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={spaceForm.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidade</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Número de persoas" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={spaceForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ubicación do espazo" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={spaceForm.control}
                    name="availability"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Dispoñibilidade</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {daysOfWeek.map((day) => (
                            <FormField
                              key={day.id}
                              control={spaceForm.control}
                              name="availability"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={day.id}
                                    className="flex flex-row items-start space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(day.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, day.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== day.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {day.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={spaceForm.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Características</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {featureOptions.map((feature) => (
                            <FormField
                              key={feature.id}
                              control={spaceForm.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature.id}
                                    className="flex flex-row items-start space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, feature.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== feature.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {feature.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpenSpaceDialog(false)}
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
        )}
      </div>

      <Tabs defaultValue="classroom" onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="classroom">Aulas</TabsTrigger>
          <TabsTrigger value="room">Salas</TabsTrigger>
          <TabsTrigger value="library">Biblioteca</TabsTrigger>
          <TabsTrigger value="gym">Pavillón</TabsTrigger>
          <TabsTrigger value="workshop">Taller</TabsTrigger>
          <TabsTrigger value="office">Despacho</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getSpacesByType(activeTab).map((space) => (
              <Card key={space.id} className="border border-scola-gray-dark">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>{space.name}</span>
                    {isDirector && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDeleteSpace(space.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Capacidade: {space.capacity} persoas</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{space.location}</span>
                    </div>
                    
                    {space.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {space.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="flex items-center gap-1">
                            {renderFeatureIcon(feature)}
                            <span>{feature}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {space.availability.map((day) => (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-2 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleOpenDetails(space)}
                      >
                        <Info className="h-3 w-3 mr-1" /> Ver Detalles
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleOpenReservation(space)}
                      >
                        <Calendar className="h-3 w-3 mr-1" /> Reservar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {getSpacesByType(activeTab).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Non hai espazos dispoñibles nesta categoría</p>
              {isDirector && (
                <Button 
                  className="mt-4 bg-scola-primary hover:bg-scola-primary/90"
                  onClick={() => setOpenSpaceDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Engadir Espazo
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Space Details Dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedSpace?.name}</DialogTitle>
            <DialogDescription>
              Información detallada e reservas deste espazo.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSpace && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <h3 className="font-medium mb-2">Detalles do espazo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Capacidade: {selectedSpace.capacity} persoas</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Ubicación: {selectedSpace.location}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-gray-500 mb-1">Dispoñibilidade:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSpace.availability.map((day) => (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedSpace.features.length > 0 && (
                    <div>
                      <h4 className="font-medium text-xs text-gray-500 mb-1">Características:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSpace.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="flex items-center gap-1">
                            {renderFeatureIcon(feature)}
                            <span>{feature}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Próximas reservas</h3>
                <div className="space-y-2">
                  {getReservationsBySpace(selectedSpace.id).length > 0 ? (
                    getReservationsBySpace(selectedSpace.id).map((reservation) => (
                      <div key={reservation.id} className="border-b pb-2 last:border-0 last:pb-0">
                        <div className="font-medium">{reservation.title}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(reservation.date), 'dd/MM/yyyy')}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {reservation.startTime} - {reservation.endTime}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Non hai reservas</p>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setOpenDetailsDialog(false)}
                >
                  Pechar
                </Button>
                
                <Button 
                  onClick={() => {
                    setOpenDetailsDialog(false);
                    handleOpenReservation(selectedSpace);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" /> Reservar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Reservation Dialog */}
      <Dialog open={openReservationDialog} onOpenChange={setOpenReservationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reservar Espazo</DialogTitle>
            <DialogDescription>
              Complete os datos para reservar {selectedSpace?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...reservationForm}>
            <form onSubmit={reservationForm.handleSubmit(onSubmitReservationForm)} className="space-y-4">
              <FormField
                control={reservationForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da reserva</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduza o motivo da reserva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={reservationForm.control}
                name="date"
                render={({ field }) => (
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
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={reservationForm.control}
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
                  control={reservationForm.control}
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
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenReservationDialog(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button type="submit">Solicitar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SpacesPage;
