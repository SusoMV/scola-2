
import { CourseData, Student } from '../types';
import { toast } from 'sonner';

// Function to toggle a student's presence
export const toggleStudentPresence = (courses: CourseData[], courseIndex: number, studentId: number): CourseData[] => {
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
  updatedCourses[courseIndex] = {
    ...updatedCourses[courseIndex],
    students: courseStudents,
    ...updateCourseCounts(courseStudents)
  };
  
  toast.success(`Estado de asistencia actualizado`);
  return updatedCourses;
};

// Function to add a new student
export const addStudent = (
  courses: CourseData[],
  newStudent: Partial<Student>
): { success: boolean; courses: CourseData[] } => {
  if (!newStudent.name || !newStudent.course) {
    toast.error("Por favor, completa os campos obrigatorios");
    return { success: false, courses };
  }

  const courseIndex = courses.findIndex(c => c.name === newStudent.course);
  if (courseIndex === -1) {
    toast.error("Curso non válido");
    return { success: false, courses };
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
  
  // Update counts
  updatedCourses[courseIndex] = {
    ...updatedCourses[courseIndex],
    ...updateCourseCounts(updatedCourses[courseIndex].students)
  };

  toast.success("Alumno engadido correctamente");
  return { success: true, courses: updatedCourses };
};

// Function to edit a student
export const editStudent = (
  courses: CourseData[],
  editingStudent: Student,
  updatedStudentData: Partial<Student>
): { success: boolean; courses: CourseData[] } => {
  if (!updatedStudentData.name || !updatedStudentData.course) {
    toast.error("Por favor, completa os campos obrigatorios");
    return { success: false, courses };
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
    return { success: false, courses };
  }

  const targetCourseIndex = courses.findIndex(c => c.name === updatedStudentData.course);
  if (targetCourseIndex === -1) {
    toast.error("Curso de destino non válido");
    return { success: false, courses };
  }

  // Create updated student object
  const updatedStudent = {
    id: editingStudent.id,
    name: updatedStudentData.name!,
    course: updatedStudentData.course!,
    hasAllergies: updatedStudentData.hasAllergies || false,
    allergyDetails: updatedStudentData.hasAllergies ? updatedStudentData.allergyDetails || '' : '',
    isPresent: updatedStudentData.isPresent || true
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
    updatedCourses[idx] = {
      ...updatedCourses[idx],
      ...updateCourseCounts(updatedCourses[idx].students)
    };
  }

  toast.success("Estudante actualizado correctamente");
  return { success: true, courses: updatedCourses };
};

// Helper function to update course counts
export const updateCourseCounts = (students: Student[]) => {
  const presentStudents = students.filter(s => s.isPresent);
  const presentNonAllergicStudents = presentStudents.filter(s => !s.hasAllergies);
  const presentAllergicStudents = presentStudents.filter(s => s.hasAllergies);
  
  return {
    totalStudents: presentNonAllergicStudents.length,
    allergicStudents: presentAllergicStudents.length
  };
};
