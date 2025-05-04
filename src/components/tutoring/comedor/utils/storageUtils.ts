
import { CourseData } from '../types';

const STORAGE_KEY_COURSES = 'comedor_courses';
const STORAGE_KEY_DATE = 'comedor_last_date';

// Save courses to local storage
export const saveCourses = (courses: CourseData[]): void => {
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
};

// Load courses from local storage
export const loadCourses = (): CourseData[] | null => {
  const storedCourses = localStorage.getItem(STORAGE_KEY_COURSES);
  return storedCourses ? JSON.parse(storedCourses) : null;
};

// Save the current date to local storage
export const saveCurrentDate = (): void => {
  const today = new Date().toDateString();
  localStorage.setItem(STORAGE_KEY_DATE, today);
};

// Check if it's a new day
export const isNewDay = (): boolean => {
  const lastDate = localStorage.getItem(STORAGE_KEY_DATE);
  const today = new Date().toDateString();
  return lastDate !== today;
};

// Reset student attendance for a new day
export const resetAttendanceForNewDay = (courses: CourseData[]): CourseData[] => {
  const resetCourses = courses.map(course => ({
    ...course,
    students: course.students.map(student => ({
      ...student,
      isPresent: true
    }))
  }));
  
  saveCurrentDate();
  saveCourses(resetCourses);
  
  return resetCourses;
};
