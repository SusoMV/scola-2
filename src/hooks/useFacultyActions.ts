import { useState } from 'react';
import { FacultyMember } from './useFacultyMembers';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface FacultyFormData {
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

export function useFacultyActions(facultyMembers: FacultyMember[], setFacultyMembers: React.Dispatch<React.SetStateAction<FacultyMember[]>>) {
  const { user } = useAuth();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [openCoordinationsDialog, setOpenCoordinationsDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);

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

  const handleSendMessage = (data: { content: string }) => {
    if (selectedMember) {
      toast.success(`Mensaxe enviada a ${selectedMember.name}`);
      
      // Save message to localStorage for syncing with Mensaxes page
      const facultyMessages = localStorage.getItem('faculty-messages') || '[]';
      let messages = [];
      
      try {
        messages = JSON.parse(facultyMessages);
      } catch (error) {
        console.error('Error parsing faculty messages:', error);
      }
      
      messages.push({
        recipientId: selectedMember.id,
        recipientName: selectedMember.name,
        content: data.content,
        timestamp: new Date().toISOString()
      });
      
      localStorage.setItem('faculty-messages', JSON.stringify(messages));
      
      setOpenNewMessageDialog(false);
      setSelectedMember(null);
    }
  };

  return {
    openAddDialog,
    setOpenAddDialog,
    openConfirmDeleteDialog,
    setOpenConfirmDeleteDialog,
    openNewMessageDialog,
    setOpenNewMessageDialog,
    openScheduleDialog,
    setOpenScheduleDialog,
    openCoordinationsDialog,
    setOpenCoordinationsDialog,
    selectedMember,
    setSelectedMember,
    handleAddMember,
    handleDeleteMember,
    handleSendMessage
  };
}
