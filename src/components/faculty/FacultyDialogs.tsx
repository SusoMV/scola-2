
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddFacultyForm from './AddFacultyForm';
import DeleteConfirmation from './DeleteConfirmation';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import { FacultyMember } from '@/hooks/useFacultyMembers';
import { FacultyFormData } from '@/hooks/useFacultyActions';

interface FacultyDialogsProps {
  openAddDialog: boolean;
  setOpenAddDialog: (open: boolean) => void;
  openConfirmDeleteDialog: boolean;
  setOpenConfirmDeleteDialog: (open: boolean) => void;
  openNewMessageDialog: boolean;
  setOpenNewMessageDialog: (open: boolean) => void;
  selectedMember: FacultyMember | null;
  facultyMembers: FacultyMember[];
  onAddMember: (data: FacultyFormData) => void;
  onDeleteMember: () => void;
  onSendMessage: (data: { content: string }) => void;
}

const FacultyDialogs: React.FC<FacultyDialogsProps> = ({
  openAddDialog,
  setOpenAddDialog,
  openConfirmDeleteDialog,
  setOpenConfirmDeleteDialog,
  openNewMessageDialog,
  setOpenNewMessageDialog,
  selectedMember,
  facultyMembers,
  onAddMember,
  onDeleteMember,
  onSendMessage
}) => {
  return (
    <>
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Engadir novo membro</DialogTitle>
          </DialogHeader>
          <AddFacultyForm onSubmit={onAddMember} onCancel={() => setOpenAddDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirmDeleteDialog} onOpenChange={setOpenConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <DeleteConfirmation 
            memberName={selectedMember?.name} 
            onConfirm={onDeleteMember} 
            onCancel={() => setOpenConfirmDeleteDialog(false)} 
          />
        </DialogContent>
      </Dialog>

      <NewMessageDialog 
        open={openNewMessageDialog} 
        onOpenChange={setOpenNewMessageDialog} 
        facultyMembers={facultyMembers.map(member => ({
          id: member.id,
          name: member.name,
          role: member.role
        }))} 
        onSubmit={onSendMessage}
        initialRecipient={selectedMember ? selectedMember.id : undefined}
      />
    </>
  );
};

export default FacultyDialogs;
