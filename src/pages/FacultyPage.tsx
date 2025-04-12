
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import FacultyList from '@/components/faculty/FacultyList';
import FacultyDialogs from '@/components/faculty/FacultyDialogs';
import { useFacultyMembers } from '@/hooks/useFacultyMembers';
import { useFacultyActions } from '@/hooks/useFacultyActions';

const FacultyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { facultyMembers, setFacultyMembers, isLoading, isDirector } = useFacultyMembers();
  
  const {
    openAddDialog,
    setOpenAddDialog,
    openConfirmDeleteDialog,
    setOpenConfirmDeleteDialog,
    selectedMember,
    setSelectedMember,
    openNewMessageDialog,
    setOpenNewMessageDialog,
    handleAddMember,
    handleDeleteMember,
    handleSendMessage
  } = useFacultyActions(facultyMembers, setFacultyMembers);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Claustro</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <Card className="p-6 border-scola-gray-dark">
        <FacultyList 
          facultyMembers={facultyMembers} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isLoading={isLoading} 
          isDirector={isDirector} 
          onMessageClick={(member) => {
            if (member.id === 'new') {
              setOpenAddDialog(true);
            } else {
              setSelectedMember(member);
              setOpenNewMessageDialog(true);
            }
          }} 
          onDeleteClick={(member) => {
            setSelectedMember(member);
            setOpenConfirmDeleteDialog(true);
          }} 
        />
      </Card>

      <FacultyDialogs
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        openConfirmDeleteDialog={openConfirmDeleteDialog}
        setOpenConfirmDeleteDialog={setOpenConfirmDeleteDialog}
        openNewMessageDialog={openNewMessageDialog}
        setOpenNewMessageDialog={setOpenNewMessageDialog}
        selectedMember={selectedMember}
        facultyMembers={facultyMembers}
        onAddMember={handleAddMember}
        onDeleteMember={handleDeleteMember}
        onSendMessage={handleSendMessage}
      />
    </DashboardLayout>
  );
};

export default FacultyPage;
