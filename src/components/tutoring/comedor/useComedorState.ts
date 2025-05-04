import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CourseData, Student } from './types';

// Initial course data for demonstration
const initialCourses: CourseData[] = [
  { 
    name: "4º Infantil", 
    totalStudents: 10, 
    allergicStudents: 2,
    students: [
      { id: 1, name: "Ana Pérez", course: "4º Infantil", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
      { id: 2, name: "Marcos López", course: "4º Infantil", hasAllergies: false, isPresent: true },
      { id: 3, name: "Laura Rodríguez", course: "4º Infantil", hasAllergies: false, isPresent: true },
      { id: 4, name: "David García", course: "4º Infantil", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
    ]
  },
  { 
    name: "5º Infantil", 
    totalStudents: 8, 
    allergicStudents: 1,
    students: [
      { id: 5, name: "Carlos Vázquez", course: "5º Infantil", hasAllergies: false, isPresent: true },
      { id: 6, name: "Elena Fernández", course: "5º Infantil", hasAllergies: true, allergyDetails: "Gluten", isPresent: true },
    ]
  },
  { 
    name: "6º Infantil", 
    totalStudents: 12, 
    allergicStudents: 3,
    students: [
      { id: 7, name: "Pablo Martínez", course: "6º Infantil", hasAllergies: true, allergyDetails: "Mariscos", isPresent: true },
      { id: 8, name: "Sofía González", course: "6º Infantil", hasAllergies: true, allergyDetails: "Huevos", isPresent: true },
      { id: 9, name: "Mario Alonso", course: "6º Infantil", hasAllergies: true, allergyDetails: "Soja", isPresent: true },
    ]
  },
  { 
    name: "1º Primaria", 
    totalStudents: 15, 
    allergicStudents: 2,
    students: [
      { id: 10, name: "Lucía Castro", course: "1º Primaria", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
      { id: 11, name: "Hugo Sánchez", course: "1º Primaria", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
    ]
  },
  { 
    name: "2º Primaria", 
    totalStudents: 14, 
    allergicStudents: 1,
    students: [
      { id: 12, name: "Carla Díaz", course: "2º Primaria", hasAllergies: true, allergyDetails: "Pescado", isPresent: true },
    ]
  },
  { 
    name: "3º Primaria", 
    totalStudents: 16, 
    allergicStudents: 4,
    students: [
      { id: 13, name: "Daniel Torres", course: "3º Primaria", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
      { id: 14, name: "Sara Romero", course: "3º Primaria", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
      { id: 15, name: "Adrián Varela", course: "3º Primaria", hasAllergies: true, allergyDetails: "Pescado", isPresent: true },
      { id: 16, name: "Marta Blanco", course: "3º Primaria", hasAllergies: true, allergyDetails: "Gluten", isPresent: true },
    ]
  },
  { 
    name: "4º Primaria", 
    totalStudents: 13, 
    allergicStudents: 2,
    students: [
      { id: 17, name: "Martín Rodríguez", course: "4º Primaria", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
      { id: 18, name: "Claudia Gómez", course: "4º Primaria", hasAllergies: true, allergyDetails: "Kiwi", isPresent: true },
    ]
  },
  { 
    name: "5º Primaria", 
    totalStudents: 15, 
    allergicStudents: 3,
    students: [
      { id: 19, name: "Alejandro García", course: "5º Primaria", hasAllergies: false, isPresent: true },
      { id: 20, name: "Emma Vázquez", course: "5º Primaria", hasAllergies: true, allergyDetails: "Gluten", isPresent: true },
      { id: 21, name: "Bruno Martínez", course: "5º Primaria", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
      { id: 22, name: "Carmen López", course: "5º Primaria", hasAllergies: true, allergyDetails: "Pescado", isPresent: true },
    ]
  },
  { 
    name: "6º Primaria", 
    totalStudents: 14, 
    allergicStudents: 1,
    students: [
      { id: 23, name: "Lucas Fernández", course: "6º Primaria", hasAllergies: false, isPresent: true },
      { id: 24, name: "Valeria Castro", course: "6º Primaria", hasAllergies: true, allergyDetails: "Soja", isPresent: true },
    ]
  },
];

export const useComedorState = () => {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    course: '',
    hasAllergies: false,
    allergyDetails: '',
    isPresent: true
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Load data on component mount and reset counters if it's a new day
  useEffect(() => {
    // Get the stored date and student data
    const lastDate = localStorage.getItem('comedor_last_date');
    const storedCourses = localStorage.getItem('comedor_courses');
    const today = new Date().toDateString();

    if (lastDate !== today) {
      // Reset attendance for a new day
      const resetCourses = courses.map(course => ({
        ...course,
        students: course.students.map(student => ({
          ...student,
          isPresent: true
        }))
      }));
      
      setCourses(resetCourses);
      localStorage.setItem('comedor_last_date', today);
      localStorage.setItem('comedor_courses', JSON.stringify(resetCourses));
    } else if (storedCourses) {
      // Load saved data if it's the same day
      setCourses(JSON.parse(storedCourses));
    } else {
      // Initialize data for the first time
      localStorage.setItem('comedor_last_date', today);
      localStorage.setItem('comedor_courses', JSON.stringify(courses));
    }
  }, []);

  // Save data whenever courses change
  useEffect(() => {
    localStorage.setItem('comedor_courses', JSON.stringify(courses));
  }, [courses]);

  // Handle opening course dialog
  const handleCourseClick = (course: CourseData) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Handle toggling student presence
  const toggleStudentPresence = (courseIndex: number, studentId: number) => {
    const updatedCourses = [...courses];
    const courseStudents = [...updatedCourses[courseIndex].students];
    
    const studentIndex = courseStudents.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
      courseStudents[studentIndex] = {
        ...courseStudents[studentIndex],
        isPresent: !courseStudents[studentIndex].isPresent
      };
    }

    // Update counts based on students who are present
    const presentStudents = courseStudents.filter(s => s.isPresent);
    const presentNonAllergicStudents = presentStudents.filter(s => !s.hasAllergies);
    const presentAllergicStudents = presentStudents.filter(s => s.hasAllergies);
    
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      students: courseStudents,
      totalStudents: presentNonAllergicStudents.length,
      allergicStudents: presentAllergicStudents.length
    };
    
    setCourses(updatedCourses);
    toast.success(`Estado de asistencia actualizado`);
  };

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.course) {
      toast.error("Por favor, completa os campos obrigatorios");
      return;
    }

    const courseIndex = courses.findIndex(c => c.name === newStudent.course);
    if (courseIndex === -1) {
      toast.error("Curso non válido");
      return;
    }

    const updatedCourses = [...courses];
    const newId = Math.max(0, ...courses.flatMap(c => c.students.map(s => s.id))) + 1;
    
    const studentToAdd = {
      id: newId,
      name: newStudent.name!,
      course: newStudent.course!,
      hasAllergies: newStudent.hasAllergies || false,
      allergyDetails: newStudent.hasAllergies ? newStudent.allergyDetails || '' : '',
      isPresent: true
    };

    updatedCourses[courseIndex].students.push(studentToAdd);
    
    // Update counts based on students who are present
    const presentStudents = updatedCourses[courseIndex].students.filter(s => s.isPresent);
    const presentNonAllergicStudents = presentStudents.filter(s => !s.hasAllergies);
    const presentAllergicStudents = presentStudents.filter(s => s.hasAllergies);
    
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      totalStudents: presentNonAllergicStudents.length,
      allergicStudents: presentAllergicStudents.length
    };

    setCourses(updatedCourses);
    setNewStudent({
      name: '',
      course: '',
      hasAllergies: false,
      allergyDetails: '',
      isPresent: true
    });
    toast.success("Alumno engadido correctamente");
  };

  // Handle editing a student
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      course: student.course,
      hasAllergies: student.hasAllergies,
      allergyDetails: student.allergyDetails || '',
      isPresent: student.isPresent
    });
  };

  // Handle saving edited student
  const handleSaveEdit = () => {
    if (!editingStudent || !newStudent.name || !newStudent.course) {
      return;
    }

    const updatedCourses = [...courses];
    
    // Find the student in the original course
    let originalCourseIndex = -1;
    let studentIndex = -1;
    
    for (let i = 0; i < updatedCourses.length; i++) {
      const foundIndex = updatedCourses[i].students.findIndex(s => s.id === editingStudent.id);
      if (foundIndex !== -1) {
        originalCourseIndex = i;
        studentIndex = foundIndex;
        break;
      }
    }

    if (originalCourseIndex === -1 || studentIndex === -1) {
      toast.error("Estudante non atopado");
      return;
    }

    const targetCourseIndex = courses.findIndex(c => c.name === newStudent.course);
    if (targetCourseIndex === -1) {
      toast.error("Curso de destino non válido");
      return;
    }

    // Create updated student object
    const updatedStudent = {
      id: editingStudent.id,
      name: newStudent.name!,
      course: newStudent.course!,
      hasAllergies: newStudent.hasAllergies || false,
      allergyDetails: newStudent.hasAllergies ? newStudent.allergyDetails || '' : '',
      isPresent: newStudent.isPresent || true
    };

    if (originalCourseIndex === targetCourseIndex) {
      // Just update the student in the same course
      updatedCourses[originalCourseIndex].students[studentIndex] = updatedStudent;
    } else {
      // Remove from original course and add to new course
      updatedCourses[originalCourseIndex].students.splice(studentIndex, 1);
      updatedCourses[targetCourseIndex].students.push(updatedStudent);
    }

    // Recalculate counts for both courses
    for (const idx of [originalCourseIndex, targetCourseIndex]) {
      const presentStudents = updatedCourses[idx].students.filter(s => s.isPresent);
      const presentNonAllergicStudents = presentStudents.filter(s => !s.hasAllergies);
      const presentAllergicStudents = presentStudents.filter(s => s.hasAllergies);
      
      updatedCourses[idx] = {
        ...updatedCourses[idx],
        totalStudents: presentNonAllergicStudents.length,
        allergicStudents: presentAllergicStudents.length
      };
    }

    setCourses(updatedCourses);
    setEditingStudent(null);
    setNewStudent({
      name: '',
      course: '',
      hasAllergies: false,
      allergyDetails: '',
      isPresent: true
    });
    toast.success("Estudante actualizado correctamente");
  };

  return {
    courses,
    selectedCourse,
    isDialogOpen,
    isManageDialogOpen,
    newStudent,
    editingStudent,
    setIsDialogOpen,
    setIsManageDialogOpen,
    setNewStudent,
    setEditingStudent,
    handleCourseClick,
    toggleStudentPresence,
    handleAddStudent,
    handleEditStudent,
    handleSaveEdit
  };
};
