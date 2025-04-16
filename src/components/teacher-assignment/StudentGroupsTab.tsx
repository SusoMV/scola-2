
import React, { useEffect } from 'react';
import { useStudentGroups } from './hooks/useStudentGroups';
import StudentGroupCard from './StudentGroupCard';
import StudentGroupDetailsDialog from './StudentGroupDetailsDialog';
import AddGroupDialog from './AddGroupDialog';
import AddStudentDialog from './AddStudentDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const StudentGroupsTab: React.FC = () => {
  const {
    groups,
    selectedCourse,
    editMode,
    editingStudents,
    openAddGroupDialog,
    newGroupName,
    setNewGroupName,
    setOpenAddGroupDialog,
    openAddStudentDialog,
    setOpenAddStudentDialog,
    newStudents,
    handleOpenCourse,
    handleCloseCourse,
    handleEditMode,
    handleCancelEdit,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup,
    handleNewStudentChange,
    handleAddStudentRow,
    handleRemoveStudentRow,
    handleSaveNewGroup,
    handleCancelNewGroup
  } = useStudentGroups();

  useEffect(() => {
    const handleOpenAddGroupDialog = () => {
      setOpenAddGroupDialog(true);
    };

    document.addEventListener('open-add-group-dialog', handleOpenAddGroupDialog);
    
    return () => {
      document.removeEventListener('open-add-group-dialog', handleOpenAddGroupDialog);
    };
  }, [setOpenAddGroupDialog]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={() => setOpenAddGroupDialog(true)}
          className="bg-[#0070C0] hover:bg-[#0058a2] text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Engadir grupo
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {Object.keys(groups).map((course) => (
          <StudentGroupCard
            key={course}
            course={course}
            groups={groups}
            onClick={handleOpenCourse}
          />
        ))}
      </div>

      {selectedCourse && (
        <StudentGroupDetailsDialog
          selectedCourse={selectedCourse}
          editMode={editMode}
          editingStudents={editingStudents}
          onClose={handleCloseCourse}
          onEdit={handleEditMode}
          onCancel={handleCancelEdit}
          onSave={handleSaveChanges}
          onExportExcel={handleExportExcel}
          onExportPDF={handleExportPDF}
          onEditStudent={handleEditStudent}
        />
      )}
      
      <AddGroupDialog
        open={openAddGroupDialog}
        onOpenChange={setOpenAddGroupDialog}
        newGroupName={newGroupName}
        onNewGroupNameChange={setNewGroupName}
        onAddGroup={handleAddGroup}
      />
      
      <AddStudentDialog
        open={openAddStudentDialog}
        onOpenChange={setOpenAddStudentDialog}
        groupName={newGroupName}
        students={newStudents}
        onStudentChange={handleNewStudentChange}
        onAddRow={handleAddStudentRow}
        onRemoveRow={handleRemoveStudentRow}
        onSave={handleSaveNewGroup}
        onCancel={handleCancelNewGroup}
      />
    </div>
  );
};

export default StudentGroupsTab;
