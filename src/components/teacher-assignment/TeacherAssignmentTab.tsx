
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
    openAddDialog,
    setEditMode,
    setOpenAddDialog,
    handleChange,
    handleSave,
    cancelEdit,
    handleAddAssignment,
    handleDeleteAssignment
  } = useTeacherAssignments();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => setOpenAddDialog(true)} 
            className="text-xs md:text-sm bg-[#0070C0] hover:bg-[#0070C0]/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            Engadir adscrición
          </Button>
          {editMode ? (
            <>
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
                className="text-xs md:text-sm bg-[#0070C0] hover:bg-[#0070C0]/90"
              >
                Gardar cambios
              </Button>
            </>
          ) : (
            <Button 
              size="sm" 
              onClick={() => setEditMode(true)} 
              className="text-xs md:text-sm bg-[#0070C0] hover:bg-[#0070C0]/90"
            >
              Editar adscrición
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-dotted border-[#0070C0] pt-4">
        <div className="space-y-6">
          {assignments.map((assignment, courseIndex) => (
            <CourseCard 
              key={assignment.course}
              assignment={assignment}
              courseIndex={courseIndex}
              editMode={editMode}
              onTeacherChange={handleChange}
              onDelete={handleDeleteAssignment}
            />
          ))}
        </div>
      </div>
      
      <AddAssignmentDialog 
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
};

export default TeacherAssignmentTab;
