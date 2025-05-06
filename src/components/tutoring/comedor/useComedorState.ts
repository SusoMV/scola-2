import { useState, useEffect } from 'react';
import { CourseData, Student } from './types';
import { initialCourses } from './data/initialCourses';
import { 
  toggleStudentPresence, 
  addStudent, 
  editStudent,
  deleteStudent 
} from './utils/studentUtils';
import { 
  saveCourses, 
  loadCourses, 
  isNewDay, 
  resetAttendanceForNewDay, 
  saveCurrentDate 
} from './utils/storageUtils';

export const useComedorState = () => {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isCourseManageDialogOpen, setIsCourseManageDialogOpen] = useState(false);
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
    if (isNewDay()) {
      // Reset attendance for a new day
      setCourses(resetAttendanceForNewDay(courses));
    } else {
      // Load saved data if it's the same day
      const storedCourses = loadCourses();
      if (storedCourses) {
        setCourses(storedCourses);
      } else {
        // Initialize data for the first time
        saveCurrentDate();
        saveCourses(courses);
      }
    }
  }, []);

  // Save data whenever courses change
  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  // Handle opening course dialog
  const handleCourseClick = (course: CourseData) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Handle toggling student presence
  const handleToggleStudentPresence = (courseIndex: number, studentId: number) => {
    const updatedCourses = toggleStudentPresence(courses, courseIndex, studentId);
    setCourses(updatedCourses);
  };

  // Handle adding a new student
  const handleAddStudent = () => {
    const result = addStudent(courses, newStudent);
    if (result.success) {
      setCourses(result.courses);
      setNewStudent({
        name: '',
        course: '',
        hasAllergies: false,
        allergyDetails: '',
        isPresent: true
      });
    }
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
    if (!editingStudent) return;

    const result = editStudent(courses, editingStudent, newStudent);
    if (result.success) {
      setCourses(result.courses);
      setEditingStudent(null);
      setNewStudent({
        name: '',
        course: '',
        hasAllergies: false,
        allergyDetails: '',
        isPresent: true
      });
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = (student: Student) => {
    const result = deleteStudent(courses, student);
    if (result.success) {
      setCourses(result.courses);
    }
  };

  // Handle adding a new course
  const handleAddCourse = (courseName: string) => {
    // Create new course
    const newCourse: CourseData = {
      name: courseName,
      totalStudents: 0,
      allergicStudents: 0,
      students: []
    };
    
    // Add course to the list
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
  };

  // Handle removing a course
  const handleRemoveCourse = (courseName: string) => {
    // Only allow removal if course has no students
    const courseToRemove = courses.find(course => course.name === courseName);
    if (courseToRemove && courseToRemove.students.length > 0) {
      return;
    }
    
    // Remove course from the list
    const updatedCourses = courses.filter(course => course.name !== courseName);
    setCourses(updatedCourses);
  };

  return {
    courses,
    selectedCourse,
    isDialogOpen,
    isManageDialogOpen,
    isCourseManageDialogOpen,
    newStudent,
    editingStudent,
    setIsDialogOpen,
    setIsManageDialogOpen,
    setIsCourseManageDialogOpen,
    setNewStudent,
    setEditingStudent,
    handleCourseClick,
    toggleStudentPresence: handleToggleStudentPresence,
    handleAddStudent,
    handleEditStudent,
    handleSaveEdit,
    handleDeleteStudent,
    handleAddCourse,
    handleRemoveCourse
  };
};
