
import { useState, useEffect } from 'react';
import { GroupData, Student, initialGroups } from '../types';
import { toast } from 'sonner';

export function useStudentGroups() {
  const [groups, setGroups] = useState<GroupData>(initialGroups);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editingStudents, setEditingStudents] = useState<Student[]>([]);
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

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
    setEditingStudents(groups[course]);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
  };

  const handleSaveChanges = () => {
    if (selectedCourse) {
      const updatedGroups = { ...groups };
      updatedGroups[selectedCourse] = editingStudents;
      setGroups(updatedGroups);
      
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
      
      const updatedGroups = {
        ...groups,
        [newGroupName]: []
      };
      
      setGroups(updatedGroups);
      localStorage.setItem('student_groups', JSON.stringify(updatedGroups));
      setNewGroupName('');
      setOpenAddGroupDialog(false);
      toast.success(`Grupo ${newGroupName} creado correctamente`);
    } else {
      toast.error('Debes especificar un nome para o grupo');
    }
  };

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name: '',
      birthDate: '',
      parents: '',
      phone: ''
    };
    
    setEditingStudents([...editingStudents, newStudent]);
  };

  const handleRemoveStudent = (index: number) => {
    const updatedStudents = [...editingStudents];
    updatedStudents.splice(index, 1);
    setEditingStudents(updatedStudents);
  };

  return {
    groups,
    selectedCourse,
    editingStudents,
    openAddGroupDialog,
    newGroupName,
    setNewGroupName,
    setOpenAddGroupDialog,
    handleOpenCourse,
    handleCloseCourse,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup,
    handleAddStudent,
    handleRemoveStudent
  };
}
