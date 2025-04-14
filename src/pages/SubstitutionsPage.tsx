
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/substitutions/Header';
import TabsContainer from '@/components/substitutions/TabsContainer';
import CreateSubstitutionDialog from '@/components/substitutions/CreateSubstitutionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useFacultyMembers } from '@/hooks/useFacultyMembers';
import { useSubstitutions } from '@/hooks/useSubstitutions';

const SubstitutionsPage = () => {
  const { user } = useAuth();
  const { isDirector } = useFacultyMembers();
  const [openDialog, setOpenDialog] = useState(false);
  
  const {
    substitutions,
    searchQuery,
    setSearchQuery,
    handleToggleSeen,
    handleSubmitSubstitution,
    getFilteredHistoricalSubstitutions,
    absentTeachers,
    substituteTeachers
  } = useSubstitutions();

  const filteredHistoricalSubstitutions = getFilteredHistoricalSubstitutions();

  return (
    <DashboardLayout>
      <Header isDirector={isDirector} />

      <div className="flex justify-between mb-6">
        <TabsContainer 
          substitutions={substitutions}
          filteredHistoricalSubstitutions={filteredHistoricalSubstitutions}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleToggleSeen={handleToggleSeen}
          openCreateDialog={() => setOpenDialog(true)}
          isDirector={isDirector}
        />
      </div>

      <CreateSubstitutionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={handleSubmitSubstitution}
        absentTeachers={absentTeachers}
        substituteTeachers={substituteTeachers}
      />
    </DashboardLayout>
  );
};

export default SubstitutionsPage;
