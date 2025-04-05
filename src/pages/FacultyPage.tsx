
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Search, MessageSquare, Plus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface FacultyMember {
  id: string;
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

const FacultyPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);

  // Check if user has director role (mock value)
  const isDirector = true; // In a real app, this would come from user.role

  // Mock data for faculty members
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([
    {
      id: '1',
      name: 'María López García',
      role: 'directivo',
      specialty: 'Dirección / Lingua Galega',
      email: 'maria.lopez@edu.xunta.gal'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez Fernández',
      role: 'directivo',
      specialty: 'Xefatura de estudos / Matemáticas',
      email: 'carlos.rodriguez@edu.xunta.gal'
    },
    {
      id: '3',
      name: 'Ana García Pérez',
      role: 'docente',
      specialty: 'Educación Primaria',
      email: 'ana.garcia@edu.xunta.gal'
    },
    {
      id: '4',
      name: 'Pablo Sánchez Martínez',
      role: 'docente',
      specialty: 'Educación Física',
      email: 'pablo.sanchez@edu.xunta.gal'
    },
    {
      id: '5',
      name: 'Lucía Fernández Castro',
      role: 'docente',
      specialty: 'Música',
      email: 'lucia.fernandez@edu.xunta.gal'
    },
    {
      id: '6',
      name: 'David Martínez López',
      role: 'docente',
      specialty: 'Lingua Inglesa',
      email: 'david.martinez@edu.xunta.gal'
    }
  ]);

  // Form for adding a new faculty member
  const addForm = useForm({
    defaultValues: {
      name: '',
      role: 'docente',
      specialty: '',
      email: ''
    }
  });

  const messageForm = useForm({
    defaultValues: {
      content: ''
    }
  });

  // Filter faculty members based on search query
  const filteredMembers = facultyMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new faculty member
  const handleAddMember = (data: any) => {
    const newMember = {
      id: Date.now().toString(),
      name: data.name,
      role: data.role as 'directivo' | 'docente',
      specialty: data.specialty,
      email: data.email
    };

    setFacultyMembers([...facultyMembers, newMember]);
    setOpenAddDialog(false);
    addForm.reset();
  };

  // Handle deleting a faculty member
  const handleDeleteMember = () => {
    if (selectedMember) {
      setFacultyMembers(facultyMembers.filter(member => member.id !== selectedMember.id));
      setOpenConfirmDeleteDialog(false);
      setSelectedMember(null);
    }
  };

  // Handle sending a message
  const handleSendMessage = (data: any) => {
    if (selectedMember) {
      console.log(`Message sent to ${selectedMember.name}: ${data.content}`);
      setOpenNewMessageDialog(false);
      messageForm.reset();
      setSelectedMember(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Claustro</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        {isDirector && (
          <Button 
            className="bg-scola-primary hover:bg-scola-primary/90"
            onClick={() => setOpenAddDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Engadir membro
          </Button>
        )}
      </div>

      <Card className="border border-scola-gray-dark">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-medium">
              Membros do claustro
            </CardTitle>
            <div className="w-full sm:w-64 relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar profesor..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome e apelidos</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="text-right">Accións</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          member.role === 'directivo' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {member.role === 'directivo' ? 'Directivo' : 'Docente'}
                        </span>
                      </TableCell>
                      <TableCell>{member.specialty}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-blue-600"
                            onClick={() => {
                              setSelectedMember(member);
                              setOpenNewMessageDialog(true);
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span className="sr-only">Enviar mensaxe</span>
                          </Button>
                          
                          {isDirector && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => {
                                setSelectedMember(member);
                                setOpenConfirmDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      Non se atoparon resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog to add new faculty member */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Engadir novo membro</DialogTitle>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddMember)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome e apelidos</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="directivo">Directivo</SelectItem>
                        <SelectItem value="docente">Docente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addForm.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenAddDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Gardar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog to confirm deletion */}
      <Dialog open={openConfirmDeleteDialog} onOpenChange={setOpenConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Estás seguro de que queres eliminar a{' '}
            <span className="font-medium">{selectedMember?.name}</span>?
          </p>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpenConfirmDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteMember}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog to send a new message */}
      <Dialog open={openNewMessageDialog} onOpenChange={setOpenNewMessageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova mensaxe</DialogTitle>
          </DialogHeader>
          <Form {...messageForm}>
            <form onSubmit={messageForm.handleSubmit(handleSendMessage)} className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Para:</p>
                <p className="font-medium">{selectedMember?.name}</p>
              </div>
              
              <FormField
                control={messageForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaxe</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Escribe a túa mensaxe..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenNewMessageDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Enviar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FacultyPage;
