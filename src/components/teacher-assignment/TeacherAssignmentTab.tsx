
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTeacherAssignments } from './hooks/useTeacherAssignments';
import CourseCard from './CourseCard';

const TeacherAssignmentTab: React.FC = () => {
  const {
    assignments,
    editMode,
    setEditMode,
    handleChange,
    handleSave,
    cancelEdit
  } = useTeacherAssignments();

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
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
    </div>
  );
};

export default TeacherAssignmentTab;
