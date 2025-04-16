
import React, { useEffect } from 'react';
import { useStudentGroups } from './hooks/useStudentGroups';
import StudentGroupCard from './StudentGroupCard';
import StudentGroupDetailsDialog from './StudentGroupDetailsDialog';
import AddGroupDialog from './AddGroupDialog';

const StudentGroupsTab: React.FC = () => {
  const {
    groups,
    selectedCourse,
    openAddGroupDialog,
    editingStudents,
    newGroupName,
    setNewGroupName,
    setOpenAddGroupDialog,
    handleOpenCourse,
    handleCloseCourse,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup,
    handleAddStudent,
    handleRemoveStudent
  } = useStudentGroups();

  useEffect(() => {
    const handleOpenAddGroupDialog = () => {
      setOpenAddGroupDialog(true);
    };

    const handleAddStudentToGroup = () => {
      handleAddStudent();
    };

    const handleRemoveStudentFromGroup = (event: CustomEvent) => {
      handleRemoveStudent(event.detail.index);
    };

    document.addEventListener('open-add-group-dialog', handleOpenAddGroupDialog);
    document.addEventListener('add-student-to-group', handleAddStudentToGroup);
    document.addEventListener('remove-student-from-group', handleRemoveStudentFromGroup as EventListener);
    
    return () => {
      document.removeEventListener('open-add-group-dialog', handleOpenAddGroupDialog);
      document.removeEventListener('add-student-to-group', handleAddStudentToGroup);
      document.removeEventListener('remove-student-from-group', handleRemoveStudentFromGroup as EventListener);
    };
  }, [setOpenAddGroupDialog, handleAddStudent, handleRemoveStudent]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          editingStudents={editingStudents}
          onClose={handleCloseCourse}
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
    </div>
  );
};

export default StudentGroupsTab;
