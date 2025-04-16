
import React from 'react';
import { useTeacherAssignments } from './hooks/useTeacherAssignments';
import CourseCard from './CourseCard';
import AddTeacherAssignmentDialog from './AddTeacherAssignmentDialog';

const TeacherAssignmentTab: React.FC = () => {
  const {
    assignments,
    openAddDialog,
    setOpenAddDialog,
    handleAddAssignment,
    newAssignment,
    setNewAssignment
  } = useTeacherAssignments();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment, courseIndex) => (
          <CourseCard
            key={assignment.course}
            assignment={assignment}
            courseIndex={courseIndex}
          />
        ))}
      </div>
      
      <AddTeacherAssignmentDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        newAssignment={newAssignment}
        onNewAssignmentChange={setNewAssignment}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
};

export default TeacherAssignmentTab;
