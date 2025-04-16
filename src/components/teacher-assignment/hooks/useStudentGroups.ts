
import { useState, useEffect } from 'react';
import { GroupData, Student, initialGroups, courses } from '../types';
import { toast } from 'sonner';

export function useStudentGroups() {
  const [groups, setGroups] = useState<GroupData>(initialGroups);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingStudents, setEditingStudents] = useState<Student[]>([]);
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [newStudents, setNewStudents] = useState<Student[]>([
    { id: crypto.randomUUID(), name: '', birthDate: '', parents: '', phone: '' }
  ]);

  // In a real app, you would fetch this data from the database
  useEffect(() => {
    // Simulating data loading
    const loadedData = localStorage.getItem('student_groups');
    if (loadedData) {
      try {
        setGroups(JSON.parse(loadedData));
      } catch (e) {
        console.error('Error loading student groups', e);
        setGroups(initialGroups);
      }
    }
  }, []);

  const handleOpenCourse = (course: string) => {
    setSelectedCourse(course);
    setEditMode(false);
    setEditingStudents(groups[course]);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
    setEditMode(false);
  };

  const handleEditMode = () => {
    if (selectedCourse) {
      setEditMode(true);
      setEditingStudents([...groups[selectedCourse]]);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (selectedCourse) {
      setEditingStudents(groups[selectedCourse]);
    }
  };

  const handleSaveChanges = () => {
    if (selectedCourse) {
      const updatedGroups = { ...groups };
      updatedGroups[selectedCourse] = editingStudents;
      setGroups(updatedGroups);
      setEditMode(false);
      
      // In a real app, you would send this data to your API
      localStorage.setItem('student_groups', JSON.stringify(updatedGroups));
      toast.success('Grupo de alumnado gardado correctamente');
    }
  };

  const handleEditStudent = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...editingStudents];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value
    };
    setEditingStudents(updatedStudents);
  };

  const handleExportExcel = () => {
    if (selectedCourse) {
      // In a real app, you would implement actual Excel export functionality
      toast.success(`Lista de ${selectedCourse} exportada a Excel`);
    }
  };

  const handleExportPDF = () => {
    if (selectedCourse) {
      // In a real app, you would implement actual PDF export functionality
      toast.success(`Lista de ${selectedCourse} exportada a PDF`);
    }
  };

  const handleAddGroup = () => {
    if (newGroupName && newGroupName.trim() !== '') {
      if (groups[newGroupName]) {
        toast.error('Este grupo xa existe');
        return;
      }
      
      setOpenAddGroupDialog(false);
      setOpenAddStudentDialog(true);
    } else {
      toast.error('Debes especificar un nome para o grupo');
    }
  };

  const handleNewStudentChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...newStudents];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value
    };
    setNewStudents(updatedStudents);
  };

  const handleAddStudentRow = () => {
    setNewStudents([
      ...newStudents,
      { id: crypto.randomUUID(), name: '', birthDate: '', parents: '', phone: '' }
    ]);
  };

  const handleRemoveStudentRow = (index: number) => {
    if (newStudents.length > 1) {
      const updatedStudents = [...newStudents];
      updatedStudents.splice(index, 1);
      setNewStudents(updatedStudents);
    }
  };

  const handleSaveNewGroup = () => {
    // Validar que os estudantes teñan a información completa
    const incompleteStudent = newStudents.find(
      student => !student.name || !student.birthDate || !student.parents || !student.phone
    );
    
    if (incompleteStudent) {
      toast.error('Todos os campos son obrigatorios para cada alumno');
      return;
    }
    
    // Gardar o novo grupo
    const updatedGroups = {
      ...groups,
      [newGroupName]: newStudents
    };
    
    setGroups(updatedGroups);
    localStorage.setItem('student_groups', JSON.stringify(updatedGroups));
    toast.success(`Grupo ${newGroupName} creado correctamente`);
    
    // Resetear formulario
    setNewGroupName('');
    setNewStudents([{ id: crypto.randomUUID(), name: '', birthDate: '', parents: '', phone: '' }]);
    setOpenAddStudentDialog(false);
  };

  const handleCancelNewGroup = () => {
    setNewGroupName('');
    setNewStudents([{ id: crypto.randomUUID(), name: '', birthDate: '', parents: '', phone: '' }]);
    setOpenAddStudentDialog(false);
  };

  return {
    groups,
    selectedCourse,
    editMode,
    editingStudents,
    openAddGroupDialog,
    newGroupName,
    setNewGroupName,
    setOpenAddGroupDialog,
    openAddStudentDialog,
    setOpenAddStudentDialog,
    newStudents,
    handleOpenCourse,
    handleCloseCourse,
    handleEditMode,
    handleCancelEdit,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup,
    handleNewStudentChange,
    handleAddStudentRow,
    handleRemoveStudentRow,
    handleSaveNewGroup,
    handleCancelNewGroup
  };
}
