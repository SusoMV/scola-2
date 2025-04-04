
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Filter, Plus } from 'lucide-react';
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
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

interface Substitution {
  id: string;
  absentTeacher: string;
  substituteTeacher: string;
  course: string;
  time: string;
  reason: string;
  seen: boolean;
  date: string;
}

const SubstitutionsPage = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Check if the user has director role (in a real app, this would come from user context)
  const isDirector = true; // Mock value: user?.role === 'director'
  
  // Mock data for substitutions
  const substitutions: Substitution[] = [
    {
      id: '1',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-04-04'
    },
    {
      id: '2',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: false,
      date: '2025-04-04'
    },
    {
      id: '3',
      absentTeacher: 'David Martínez',
      substituteTeacher: 'Pablo Sánchez',
      course: '5º Primaria',
      time: '12:30 - 14:30',
      reason: 'Persoal',
      seen: false,
      date: '2025-04-04'
    }
  ];

  // Mock data for historical substitutions
  const historicalSubstitutions: Substitution[] = [
    {
      id: '4',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-30'
    },
    {
      id: '5',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: true,
      date: '2025-03-28'
    },
    {
      id: '6',
      absentTeacher: 'Manuel Torres',
      substituteTeacher: 'Elena Rivas',
      course: '1º Primaria',
      time: '10:00 - 12:00',
      reason: 'Enfermidade',
      seen: true,
      date: '2025-03-25'
    },
    {
      id: '7',
      absentTeacher: 'Sara López',
      substituteTeacher: 'Pablo Sánchez',
      course: '6º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-20'
    }
  ];

  // Function to handle marking a substitution as seen
  const handleToggleSeen = (id: string) => {
    console.log(`Toggled seen status for substitution ${id}`);
    // In a real app, this would update the state or make an API call
  };

  // Form for adding a new substitution
  const form = useForm({
    defaultValues: {
      absentTeacher: '',
      course: '',
      reason: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      substituteTeacher: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log("New substitution data:", data);
    setOpenDialog(false);
    // In a real app, this would make an API call to create the substitution
  };

  // Filter handling for historical substitutions
  const handleFilter = (filterType: string, value: string) => {
    console.log(`Filter applied: ${filterType} - ${value}`);
    setActiveFilter(`${filterType}: ${value}`);
    // In a real app, this would filter the data
  };

  const clearFilter = () => {
    setActiveFilter(null);
    // In a real app, this would reset the filter
  };

  // Mock data for filter dropdowns
  const absentTeachers = ['Carlos Rodríguez', 'Lucía Fernández', 'David Martínez', 'Sara López', 'Manuel Torres'];
  const substituteTeachers = ['María López', 'Ana García', 'Pablo Sánchez', 'Elena Rivas'];
  const months = ['Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Setembro', 'Outubro', 'Novembro', 'Decembro'];
  const weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Substitucións</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        {isDirector && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-scola-primary hover:bg-scola-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Crear Ausencia
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nova Ausencia</DialogTitle>
                <DialogDescription>
                  Complete os datos da nova ausencia e substitución.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="absentTeacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profesor ausente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar profesor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {absentTeachers.map((teacher) => (
                              <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curso</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar curso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1º Primaria">1º Primaria</SelectItem>
                              <SelectItem value="2º Primaria">2º Primaria</SelectItem>
                              <SelectItem value="3º Primaria">3º Primaria</SelectItem>
                              <SelectItem value="4º Primaria">4º Primaria</SelectItem>
                              <SelectItem value="5º Primaria">5º Primaria</SelectItem>
                              <SelectItem value="6º Primaria">6º Primaria</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar motivo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cita médica">Cita médica</SelectItem>
                              <SelectItem value="Formación">Formación</SelectItem>
                              <SelectItem value="Persoal">Persoal</SelectItem>
                              <SelectItem value="Enfermidade">Enfermidade</SelectItem>
                              <SelectItem value="Outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                  </div>
                  
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
                    name="substituteTeacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profesor substituto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar substituto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {substituteTeachers.map((teacher) => (
                              <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
        )}
      </div>

      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Actuais</TabsTrigger>
          <TabsTrigger value="historical">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Substitucións actuais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {substitutions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-scola-gray-dark">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Docente ausente</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Curso</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Substituto</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Visto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {substitutions.map((substitution) => (
                        <tr key={substitution.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2">{substitution.absentTeacher}</td>
                          <td className="py-3 px-2">{substitution.course}</td>
                          <td className="py-3 px-2">{substitution.time}</td>
                          <td className="py-3 px-2 font-medium">{substitution.substituteTeacher}</td>
                          <td className="py-3 px-2">
                            <Checkbox 
                              checked={substitution.seen} 
                              onCheckedChange={() => handleToggleSeen(substitution.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">Non hai substitucións actuais</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historical">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-medium">
                Histórico de substitucións
              </CardTitle>
              
              <div className="flex items-center">
                {activeFilter && (
                  <div className="flex items-center mr-2">
                    <Badge variant="outline" className="mr-1 px-3 py-1">
                      {activeFilter}
                      <button 
                        onClick={clearFilter} 
                        className="ml-2 text-gray-400 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </Badge>
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" /> Filtrar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-gray-500">Por profesor ausente</DropdownMenuLabel>
                      {absentTeachers.map((teacher) => (
                        <DropdownMenuItem 
                          key={teacher} 
                          onClick={() => handleFilter('Ausente', teacher)}
                        >
                          {teacher}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-gray-500">Por profesor substituto</DropdownMenuLabel>
                      {substituteTeachers.map((teacher) => (
                        <DropdownMenuItem 
                          key={teacher} 
                          onClick={() => handleFilter('Substituto', teacher)}
                        >
                          {teacher}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-gray-500">Por mes</DropdownMenuLabel>
                      {months.map((month) => (
                        <DropdownMenuItem 
                          key={month} 
                          onClick={() => handleFilter('Mes', month)}
                        >
                          {month}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-gray-500">Por semana</DropdownMenuLabel>
                      {weeks.map((week) => (
                        <DropdownMenuItem 
                          key={week} 
                          onClick={() => handleFilter('Semana', week)}
                        >
                          {week}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {historicalSubstitutions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-scola-gray-dark">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Data</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Docente ausente</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Curso</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Substituto</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Motivo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalSubstitutions.map((substitution) => (
                        <tr key={substitution.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2">{format(new Date(substitution.date), 'dd/MM/yyyy')}</td>
                          <td className="py-3 px-2">{substitution.absentTeacher}</td>
                          <td className="py-3 px-2">{substitution.course}</td>
                          <td className="py-3 px-2">{substitution.time}</td>
                          <td className="py-3 px-2 font-medium">{substitution.substituteTeacher}</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">{substitution.reason}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">Non hai histórico de substitucións</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SubstitutionsPage;
