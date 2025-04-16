
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTeacherAssignments } from './hooks/useTeacherAssignments';
import { Plus } from 'lucide-react';
import AddAssignmentDialog from './AddAssignmentDialog';
import AssignmentCard from './AssignmentCard';

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
    <div className="space-y-6">
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={() => setOpenAddAssignmentDialog(true)}
          className="bg-[#0070C0] hover:bg-[#0058a2] text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Engadir adscrición
        </Button>
        {editMode ? (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={cancelEdit}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-[#0070C0] hover:bg-[#0058a2] text-white"
            >
              Gardar cambios
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setEditMode(true)}
            className="bg-[#0070C0] hover:bg-[#0058a2] text-white"
          >
            Editar adscrición
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {assignments.map((assignment, courseIndex) => (
          <AssignmentCard
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
