
import { ScheduleData } from "../TeacherSchedule";

// Sample data for generating default schedules
export const sampleSubjects = [
  { subject: "Matemáticas", group: "5º Primaria" },
  { subject: "Lingua Galega", group: "6º Primaria" },
  { subject: "Ciencias Naturais", group: "5º Primaria" },
  { subject: "Educación Física", group: "3º Primaria" },
  { subject: "Artes", group: "4º Primaria" },
  { subject: "Inglés", group: "6º Primaria" },
  { subject: "Historia", group: "5º Primaria" }
];

/**
 * Creates an empty schedule structure with no classes
 */
export const emptySchedule = (hours: string[], days: string[]): ScheduleData => 
  Object.fromEntries(hours.map(hour => [hour, Object.fromEntries(days.map(day => [day, {
    subject: "",
    group: ""
  }]))]));

/**
 * Creates a default schedule with randomly populated classes
 */
export const createDefaultScheduleData = (hours: string[], days: string[]): ScheduleData => {
  const defaultSchedule: ScheduleData = {};
  
  hours.forEach(hour => {
    defaultSchedule[hour] = {};
    days.forEach(day => {
      // Randomly decide if this cell should have data (about 30% chance)
      if (Math.random() < 0.3) {
        const randomSample = sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)];
        defaultSchedule[hour][day] = {
          subject: randomSample.subject,
          group: randomSample.group
        };
      } else {
        defaultSchedule[hour][day] = {
          subject: "",
          group: ""
        };
      }
    });
  });
  
  return defaultSchedule;
};
