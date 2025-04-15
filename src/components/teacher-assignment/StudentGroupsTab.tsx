
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useStudentGroups } from './hooks/useStudentGroups';
import StudentGroupCard from './StudentGroupCard';
import StudentGroupDetailsDialog from './StudentGroupDetailsDialog';
import AddGroupDialog from './AddGroupDialog';

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
    handleOpenCourse,
    handleCloseCourse,
    handleEditMode,
    handleCancelEdit,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup
  } = useStudentGroups();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={() => setOpenAddGroupDialog(true)}
          className="bg-scola-primary text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Engadir grupo
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
    </div>
  );
};

export default StudentGroupsTab;
