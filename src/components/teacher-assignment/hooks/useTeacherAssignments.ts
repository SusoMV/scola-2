import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TeacherAssignment, initialAssignments } from '../types/assignment-types';

export const useTeacherAssignments = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(initialAssignments);
  const [editMode, setEditMode] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    const loadedData = localStorage.getItem('teacher_assignments');
    if (loadedData) {
      try {
        setAssignments(JSON.parse(loadedData));
      } catch (e) {
        console.error('Error loading teacher assignments', e);
        setAssignments(initialAssignments);
      }
    }
  }, []);

  const handleChange = (courseIndex: number, field: keyof TeacherAssignment, value: string) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[courseIndex] = {
      ...updatedAssignments[courseIndex],
      [field]: value
    };
    setAssignments(updatedAssignments);
  };

  const handleSave = () => {
    localStorage.setItem('teacher_assignments', JSON.stringify(assignments));
    setEditMode(false);
    toast.success('Adscrición docente gardada correctamente');
  };

  const cancelEdit = () => {
    setAssignments(initialAssignments);
    setEditMode(false);
  };

  const handleAddAssignment = (newAssignment: TeacherAssignment) => {
    if (assignments.some(a => a.course === newAssignment.course)) {
      toast.error('Este curso xa ten unha adscrición');
      return;
    }
    
    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('teacher_assignments', JSON.stringify(updatedAssignments));
    toast.success('Adscrición engadida correctamente');
  };

  const handleDeleteAssignment = (courseIndex: number) => {
    const updatedAssignments = assignments.filter((_, index) => index !== courseIndex);
    setAssignments(updatedAssignments);
    localStorage.setItem('teacher_assignments', JSON.stringify(updatedAssignments));
    toast.success('Adscrición eliminada correctamente');
  };

  return {
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
  };
};
