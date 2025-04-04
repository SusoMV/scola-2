
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Plus, Trash2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for faculty
const facultyMockData = [
  {
    id: '1',
    name: 'Ana María López',
    role: 'Directivo',
    specialty: 'Matemáticas',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Docente',
    specialty: 'Lingua Galega',
  },
  {
    id: '3',
    name: 'Laura Fernández',
    role: 'Docente',
    specialty: 'Ciencias Naturais',
  },
  {
    id: '4',
    name: 'Miguel González',
    role: 'Docente',
    specialty: 'Educación Física',
  },
  {
    id: '5',
    name: 'Elena Martínez',
    role: 'Directivo',
    specialty: 'Inglés',
  },
  {
    id: '6',
    name: 'Pablo Sánchez',
    role: 'Docente',
    specialty: 'Historia',
  },
  {
    id: '7',
    name: 'Carmen Díaz',
    role: 'Docente',
    specialty: 'Música',
  },
  {
    id: '8',
    name: 'Javier Álvarez',
    role: 'Docente',
    specialty: 'Tecnoloxía',
  },
];

const FacultyPage = () => {
  const [faculty, setFaculty] = useState(facultyMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [sendMessageDialogOpen, setSendMessageDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  // Create a form for adding a new faculty member
  const addUserForm = useForm({
    defaultValues: {
      name: '',
      role: 'Docente',
      specialty: '',
    },
  });

  // Create a form for sending a message
  const sendMessageForm = useForm({
    defaultValues: {
      message: '',
    },
  });

  // Filter faculty based on search term
  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new faculty member
  const handleAddUser = (data: any) => {
    const newUser = {
      id: `${faculty.length + 1}`,
      name: data.name,
      role: data.role,
      specialty: data.specialty,
    };
    
    setFaculty([...faculty, newUser]);
    addUserForm.reset();
    setAddUserDialogOpen(false);
  };

  // Handle sending a message
  const handleSendMessage = (data: any) => {
    console.log('Message sent to user ID:', selectedUser, 'Message:', data.message);
    sendMessageForm.reset();
    setSendMessageDialogOpen(false);
  };

  // Handle deleting a faculty member
  const handleDeleteUser = (userId: string) => {
    setFaculty(faculty.filter((member) => member.id !== userId));
  };

  // Handle opening message dialog
  const handleOpenMessageDialog = (userId: string) => {
    setSelectedUser(userId);
    setSendMessageDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Claustro</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-scola-primary hover:bg-scola-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Engadir Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Engadir Novo Usuario</DialogTitle>
              <DialogDescription>
                Engade un novo membro ao claustro do centro educativo.
              </DialogDescription>
            </DialogHeader>
            <Form {...addUserForm}>
              <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="space-y-4">
                <FormField
                  control={addUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome e apelidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Directivo">Directivo</SelectItem>
                          <SelectItem value="Docente">Docente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Especialidade docente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Engadir</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-scola-gray-dark">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              Membros do claustro
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar profesor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="text-right">Accións</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.specialty}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleOpenMessageDialog(member.id)}
                            title="Enviar mensaxe"
                          >
                            <MessageSquare className="h-4 w-4 text-scola-primary" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleDeleteUser(member.id)}
                            title="Eliminar usuario"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      Non se atoparon resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Dialog for sending messages */}
      <Dialog open={sendMessageDialogOpen} onOpenChange={setSendMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Mensaxe</DialogTitle>
            <DialogDescription>
              Enviar unha mensaxe ao usuario seleccionado.
            </DialogDescription>
          </DialogHeader>
          <Form {...sendMessageForm}>
            <form onSubmit={sendMessageForm.handleSubmit(handleSendMessage)} className="space-y-4">
              <div className="mb-4">
                <p className="text-sm font-medium">Destinatario:</p>
                <p className="text-sm text-gray-600">
                  {selectedUser && faculty.find(u => u.id === selectedUser)?.name}
                </p>
              </div>
              
              <FormField
                control={sendMessageForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaxe</FormLabel>
                    <FormControl>
                      <textarea 
                        className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        placeholder="Escriba a súa mensaxe aquí..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSendMessageDialogOpen(false)}
                  className="mr-2"
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
