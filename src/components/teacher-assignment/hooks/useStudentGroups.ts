
import { useState, useEffect } from 'react';
import { GroupData, Student, initialGroups } from '../types';
import { toast } from 'sonner';

export function useStudentGroups() {
  const [groups, setGroups] = useState<GroupData>(initialGroups);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
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

  return {
    groups,
    selectedCourse,
    editMode,
    editingStudents,
    openAddGroupDialog,
    newGroupName,
    setNewGroupName,
    setOpenAddGroupDialog,
    handleOpenCourse,
    handleCloseCourse,
    handleEditMode,
    handleCancelEdit,
    handleSaveChanges,
    handleEditStudent,
    handleExportExcel,
    handleExportPDF,
    handleAddGroup
  };
}
