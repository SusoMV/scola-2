
import { CourseData } from '../types';

// Initial course data for demonstration
export const initialCourses: CourseData[] = [
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
