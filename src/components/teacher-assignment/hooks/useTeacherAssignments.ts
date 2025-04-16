
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { TeacherAssignment, initialAssignments, facultyMembers, courses } from '../types/assignment-types';

export const useTeacherAssignments = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(initialAssignments);
  const [editMode, setEditMode] = useState(false);
  const [openAddAssignmentDialog, setOpenAddAssignmentDialog] = useState(false);
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

  const handleChange = (courseIndex: number, field: keyof TeacherAssignment, value: string) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[courseIndex] = {
      ...updatedAssignments[courseIndex],
      [field]: value
    };
    setAssignments(updatedAssignments);
  };

  const handleNewAssignmentChange = (field: keyof TeacherAssignment, value: string) => {
    setNewAssignment({
      ...newAssignment,
      [field]: value
    });
  };

  const handleSave = () => {
    // In a real app, you would send this data to your API
    localStorage.setItem('teacher_assignments', JSON.stringify(assignments));
    setEditMode(false);
    toast.success('Adscrición docente gardada correctamente');
  };

  const cancelEdit = () => {
    setAssignments(initialAssignments);
    setEditMode(false);
  };

  const handleAddAssignment = () => {
    // Validar que o curso non estea xa na lista
    if (assignments.some(assignment => assignment.course === newAssignment.course)) {
      toast.error('Este curso xa existe na adscrición');
      return;
    }

    // Validar que todos os campos teñan valores
    if (!newAssignment.tutor || !newAssignment.english || !newAssignment.physicalEd || 
        !newAssignment.music || !newAssignment.art || !newAssignment.religion) {
      toast.error('Todos os campos son obrigatorios');
      return;
    }

    // Engadir a nova adscrición
    const updatedAssignments = [...assignments, { ...newAssignment }];
    setAssignments(updatedAssignments);
    localStorage.setItem('teacher_assignments', JSON.stringify(updatedAssignments));
    toast.success('Adscrición engadida correctamente');
    
    // Resetear o formulario e pechar o diálogo
    setNewAssignment({
      course: courses[0],
      tutor: '',
      english: '',
      physicalEd: '',
      music: '',
      art: '',
      religion: ''
    });
    setOpenAddAssignmentDialog(false);
  };

  return {
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
  };
};
