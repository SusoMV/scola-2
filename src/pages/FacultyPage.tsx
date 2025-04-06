import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Users } from 'lucide-react';
import FacultyList from '@/components/faculty/FacultyList';
import AddFacultyForm from '@/components/faculty/AddFacultyForm';
import DeleteConfirmation from '@/components/faculty/DeleteConfirmation';
import NewMessageDialog from '@/components/messages/NewMessageDialog';

interface FacultyMember {
  id: string;
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

interface FacultyFormData {
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

const sampleFacultyMembers: FacultyMember[] = [{
  id: '1',
  name: 'Ana García Martínez',
  role: 'directivo',
  specialty: 'Matemáticas',
  email: 'anagarcia@example.com'
}, {
  id: '2',
  name: 'Manuel López Fernández',
  role: 'docente',
  specialty: 'Lengua y Literatura',
  email: 'manuellopez@example.com'
}, {
  id: '3',
  name: 'Carmen Rodríguez Vázquez',
  role: 'docente',
  specialty: 'Ciencias Naturales',
  email: 'carmenrodriguez@example.com'
}, {
  id: '4',
  name: 'David Pérez Santos',
  role: 'docente',
  specialty: 'Inglés',
  email: 'davidperez@example.com'
}, {
  id: '5',
  name: 'Elena Sánchez Gómez',
  role: 'directivo',
  specialty: 'Historia',
  email: 'elenasanchez@example.com'
}];

const FacultyPage = () => {
  const {
    user
  } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyMembers = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const {
            data: profileData,
            error: profileError
          } = await supabase.from('profiles').select('school_id, role').eq('id', user.id);
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            setUserRole('directivo');
            setFacultyMembers(sampleFacultyMembers);
            toast.error('Error ao cargar o perfil, usando datos de proba');
          } else if (profileData && profileData.length > 0) {
            setUserRole(profileData[0].role);
            const {
              data,
              error
            } = await supabase.from('profiles').select('id, full_name, role, specialty, email').eq('school_id', profileData[0].school_id);
            if (error) {
              console.error('Error fetching faculty members:', error);
              toast.error('Error ao cargar os membros do claustro, usando datos de proba');
              setFacultyMembers(sampleFacultyMembers);
            } else if (data && data.length > 0) {
              const formattedData: FacultyMember[] = data.map(item => ({
                id: item.id,
                name: item.full_name,
                role: item.role as 'directivo' | 'docente',
                specialty: item.specialty,
                email: item.email
              }));
              setFacultyMembers(formattedData);
            } else {
              toast.info('Non hai membros do claustro, usando datos de proba');
              setFacultyMembers(sampleFacultyMembers);
            }
          } else {
            setUserRole('directivo');
            setFacultyMembers(sampleFacultyMembers);
            toast.info('Perfil non atopado, usando datos de proba');
          }
        } catch (error) {
          console.error('Error in fetchFacultyMembers:', error);
          setUserRole('directivo');
          setFacultyMembers(sampleFacultyMembers);
          toast.error('Erro inesperado, usando datos de proba');
        }
      } else {
        setUserRole('directivo');
        setFacultyMembers(sampleFacultyMembers);
      }
      setIsLoading(false);
    };
    fetchFacultyMembers();
  }, [user]);

  const handleAddMember = async (data: FacultyFormData) => {
    try {
      const newUserId = crypto.randomUUID();
      const {
        data: profileData,
        error: profileError
      } = await supabase.from('profiles').select('school_id, school_name').eq('id', user?.id).single();
      if (profileError) {
        throw new Error(profileError.message);
      }
      const {
        error
      } = await supabase.from('profiles').insert({
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

  const handleDeleteMember = async () => {
    if (selectedMember) {
      try {
        const {
          error
        } = await supabase.from('profiles').delete().eq('id', selectedMember.id);
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

  const handleSendMessage = (data: {
    content: string;
  }) => {
    if (selectedMember) {
      toast.success(`Mensaxe enviada a ${selectedMember.name}`);
      setOpenNewMessageDialog(false);
      setSelectedMember(null);
    }
  };

  const isDirector = userRole === 'directivo';

  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Claustro</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <Card className="border border-scola-gray-dark">
        <CardHeader className="pb-2">
          <FacultyList facultyMembers={facultyMembers} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading={isLoading} isDirector={isDirector} onMessageClick={member => {
          setSelectedMember(member);
          setOpenNewMessageDialog(true);
        }} onDeleteClick={member => {
          setSelectedMember(member);
          setOpenConfirmDeleteDialog(true);
        }} />
        </CardHeader>
        <CardContent>
          {/* Content is in the FacultyList component now */}
        </CardContent>
      </Card>

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Engadir novo membro</DialogTitle>
          </DialogHeader>
          <AddFacultyForm onSubmit={handleAddMember} onCancel={() => setOpenAddDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirmDeleteDialog} onOpenChange={setOpenConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <DeleteConfirmation memberName={selectedMember?.name} onConfirm={handleDeleteMember} onCancel={() => setOpenConfirmDeleteDialog(false)} />
        </DialogContent>
      </Dialog>

      <NewMessageDialog open={openNewMessageDialog} onOpenChange={setOpenNewMessageDialog} facultyMembers={facultyMembers.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role
    }))} onSubmit={data => {
      toast.success(`Mensaxe enviada a ${selectedMember?.name}`);
      setOpenNewMessageDialog(false);
      setSelectedMember(null);
    }} />
    </DashboardLayout>;
};

export default FacultyPage;
