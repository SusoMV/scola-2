
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTeacherAssignments } from './hooks/useTeacherAssignments';
import CourseCard from './CourseCard';
import AddAssignmentDialog from './AddAssignmentDialog';
import { Plus } from 'lucide-react';

const TeacherAssignmentTab: React.FC = () => {
  const {
    assignments,
    editMode,
    setEditMode,
    handleChange,
    handleSave,
    cancelEdit,
    openAddAssignmentDialog,
    setOpenAddAssignmentDialog,
    newAssignment,
    handleNewAssignmentChange,
    handleAddAssignment
  } = useTeacherAssignments();

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <Button 
          onClick={() => setOpenAddAssignmentDialog(true)}
          className="text-xs md:text-sm bg-scola-primary"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Engadir adscrición
        </Button>
        
        {editMode ? (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={cancelEdit}
              className="text-xs md:text-sm"
            >
              Cancelar
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="text-xs md:text-sm"
            >
              Gardar cambios
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            onClick={() => setEditMode(true)}
            className="text-xs md:text-sm bg-scola-primary"
          >
            Editar adscrición
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {assignments.map((assignment, courseIndex) => (
          <CourseCard
            key={assignment.course}
            assignment={assignment}
            courseIndex={courseIndex}
            editMode={editMode}
            onTeacherChange={handleChange}
          />
        ))}
      </div>
      
      <AddAssignmentDialog
        open={openAddAssignmentDialog}
        onOpenChange={setOpenAddAssignmentDialog}
        newAssignment={newAssignment}
        onFieldChange={handleNewAssignmentChange}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
};

export default TeacherAssignmentTab;
