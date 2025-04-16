
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TeacherAssignment, initialAssignments, courses } from '../types/assignment-types';

export const useTeacherAssignments = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(initialAssignments);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState<TeacherAssignment>({
    course: courses[0],
    tutor: '',
    english: '',
    physicalEd: '',
    music: '',
    art: '',
    religion: ''
  });

  // In a real app, you would fetch this data from the database
  useEffect(() => {
    // Simulating data loading
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

  useEffect(() => {
    const handleOpenAddTeacherDialog = () => {
      setOpenAddDialog(true);
    };

    document.addEventListener('open-add-teacher-dialog', handleOpenAddTeacherDialog);
    
    return () => {
      document.removeEventListener('open-add-teacher-dialog', handleOpenAddTeacherDialog);
    };
  }, []);

  const handleAddAssignment = () => {
    // Validate all fields are filled
    const requiredFields = ['tutor', 'english', 'physicalEd', 'music', 'art', 'religion'];
    for (const field of requiredFields) {
      if (!newAssignment[field as keyof TeacherAssignment]) {
        toast.error(`Campo ${field} é obrigatorio`);
        return;
      }
    }

    // Check if the course already exists
    if (assignments.some(a => a.course === newAssignment.course)) {
      toast.error(`Xa existe unha adscrición para ${newAssignment.course}`);
      return;
    }

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('teacher_assignments', JSON.stringify(updatedAssignments));
    
    // Reset form and close dialog
    setNewAssignment({
      course: courses[0],
      tutor: '',
      english: '',
      physicalEd: '',
      music: '',
      art: '',
      religion: ''
    });
    
    setOpenAddDialog(false);
    toast.success('Adscrición engadida correctamente');
  };

  return {
    assignments,
    openAddDialog,
    setOpenAddDialog,
    newAssignment,
    setNewAssignment,
    handleAddAssignment
  };
};
