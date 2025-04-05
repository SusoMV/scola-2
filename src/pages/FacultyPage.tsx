
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Load faculty members from Supabase
  useEffect(() => {
    const fetchFacultyMembers = async () => {
      setIsLoading(true);
      
      if (user) {
        // First, get current user's school_id and role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('school_id, role')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast.error('Error ao cargar o perfil');
          setIsLoading(false);
          return;
        }
        
        setUserRole(profileData.role);
        
        // Then get all users from the same school
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, specialty, email')
          .eq('school_id', profileData.school_id);
          
        if (error) {
          console.error('Error fetching faculty members:', error);
          toast.error('Error ao cargar os membros do claustro');
        } else if (data) {
          const formattedData: FacultyMember[] = data.map(item => ({
            id: item.id,
            name: item.full_name,
            role: item.role as 'directivo' | 'docente',
            specialty: item.specialty,
            email: item.email
          }));
          
          setFacultyMembers(formattedData);
        }
      }
      
      setIsLoading(false);
    };
    
    fetchFacultyMembers();
  }, [user]);

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
  const handleAddMember = async (data: any) => {
    try {
      // In a real app, you'd create a user account here
      // For this example, we're just adding a "fictional" profile
      
      // Generate a random ID for this fictional user
      const newUserId = crypto.randomUUID();
      
      // Get current user's school info
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('school_id, school_name')
        .eq('id', user?.id)
        .single();
        
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      // Insert the new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: newUserId,
          full_name: data.name,
          role: data.role,
          specialty: data.specialty,
          email: data.email,
          school_id: profileData.school_id,
          school_name: profileData.school_name
        });
        
      if (error) {
        throw new Error(error.message);
      }
      
      // Add to local state
      const newMember = {
        id: newUserId,
        name: data.name,
        role: data.role as 'directivo' | 'docente',
        specialty: data.specialty,
        email: data.email
      };

      setFacultyMembers([...facultyMembers, newMember]);
      toast.success('Membro engadido correctamente');
      setOpenAddDialog(false);
      addForm.reset();
    } catch (error: any) {
      console.error('Error adding member:', error);
      toast.error(`Error ao engadir membro: ${error.message}`);
    }
  };

  // Handle deleting a faculty member
  const handleDeleteMember = async () => {
    if (selectedMember) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', selectedMember.id);
          
        if (error) {
          throw new Error(error.message);
        }
        
        setFacultyMembers(facultyMembers.filter(member => member.id !== selectedMember.id));
        toast.success('Membro eliminado correctamente');
        setOpenConfirmDeleteDialog(false);
        setSelectedMember(null);
      } catch (error: any) {
        console.error('Error deleting member:', error);
        toast.error(`Error ao eliminar membro: ${error.message}`);
      }
    }
  };

  // Handle sending a message
  const handleSendMessage = (data: any) => {
    if (selectedMember) {
      // This will be properly implemented in the MessagesPage
      // For now, just show a toast message
      toast.success(`Mensaxe enviada a ${selectedMember.name}`);
      setOpenNewMessageDialog(false);
      messageForm.reset();
      setSelectedMember(null);
    }
  };

  // Check if user has director role
  const isDirector = userRole === 'directivo';

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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      Cargando membros do claustro...
                    </TableCell>
                  </TableRow>
                ) : filteredMembers.length > 0 ? (
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
