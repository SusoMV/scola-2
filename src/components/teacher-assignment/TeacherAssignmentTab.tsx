
import React, { useEffect } from 'react';
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

  useEffect(() => {
    const handleToggleEditMode = () => {
      if (editMode) {
        handleSave();
      } else {
        setEditMode(true);
      }
    };

    document.addEventListener('toggle-edit-mode', handleToggleEditMode);
    
    return () => {
      document.removeEventListener('toggle-edit-mode', handleToggleEditMode);
    };
  }, [editMode, handleSave, setEditMode]);

  return (
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
  );
};

export default TeacherAssignmentTab;
