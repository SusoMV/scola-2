
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

// Import our new components
import FacultyList from '@/components/faculty/FacultyList';
import AddFacultyForm, { FacultyFormData } from '@/components/faculty/AddFacultyForm';
import MessageForm from '@/components/faculty/MessageForm';
import DeleteConfirmation from '@/components/faculty/DeleteConfirmation';

// Define the faculty member interface
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

  // Handle adding a new faculty member
  const handleAddMember = async (data: FacultyFormData) => {
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
        role: data.role,
        specialty: data.specialty,
        email: data.email
      };

      setFacultyMembers([...facultyMembers, newMember]);
      toast.success('Membro engadido correctamente');
      setOpenAddDialog(false);
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
  const handleSendMessage = (data: { content: string }) => {
    if (selectedMember) {
      // This will be properly implemented in the MessagesPage
      // For now, just show a toast message
      toast.success(`Mensaxe enviada a ${selectedMember.name}`);
      setOpenNewMessageDialog(false);
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
          <FacultyList 
            facultyMembers={facultyMembers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={isLoading}
            isDirector={isDirector}
            onMessageClick={(member) => {
              setSelectedMember(member);
              setOpenNewMessageDialog(true);
            }}
            onDeleteClick={(member) => {
              setSelectedMember(member);
              setOpenConfirmDeleteDialog(true);
            }}
          />
        </CardHeader>
        <CardContent>
          {/* Content is in the FacultyList component now */}
        </CardContent>
      </Card>

      {/* Dialog to add new faculty member */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Engadir novo membro</DialogTitle>
          </DialogHeader>
          <AddFacultyForm 
            onSubmit={handleAddMember}
            onCancel={() => setOpenAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog to confirm deletion */}
      <Dialog open={openConfirmDeleteDialog} onOpenChange={setOpenConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <DeleteConfirmation 
            memberName={selectedMember?.name}
            onConfirm={handleDeleteMember}
            onCancel={() => setOpenConfirmDeleteDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog to send a new message */}
      <Dialog open={openNewMessageDialog} onOpenChange={setOpenNewMessageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova mensaxe</DialogTitle>
          </DialogHeader>
          <MessageForm 
            recipient={selectedMember ? { id: selectedMember.id, name: selectedMember.name } : null}
            onSubmit={handleSendMessage}
            onCancel={() => setOpenNewMessageDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FacultyPage;
