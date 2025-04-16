
// Define teacher assignment type
export interface TeacherAssignment {
  course: string;
  tutor: string;
  english: string;
  physicalEd: string;
  music: string;
  art: string;
  religion: string;
}

// Available faculty members for dropdown selection
export const facultyMembers = [
  'Ana García Martínez',
  'Manuel López Fernández',
  'Carmen Rodríguez Vázquez',
  'David Pérez Santos',
  'Elena Sánchez Gómez'
];

// List of available courses
export const courses = [
  '4º Infantil', '5º Infantil', '6º Infantil',
  '1º Primaria', '2º Primaria', '3º Primaria',
  '4º Primaria', '5º Primaria', '6º Primaria'
];

// Sample data for initial assignments
export const initialAssignments: TeacherAssignment[] = [
  {
    course: '4º Infantil',
    tutor: 'Ana García Martínez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Ana García Martínez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '5º Infantil',
    tutor: 'Carmen Rodríguez Vázquez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Carmen Rodríguez Vázquez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '6º Infantil',
    tutor: 'Elena Sánchez Gómez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Elena Sánchez Gómez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '1º Primaria',
    tutor: 'Manuel López Fernández',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Manuel López Fernández',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '2º Primaria',
    tutor: 'David Pérez Santos',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'David Pérez Santos',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '3º Primaria',
    tutor: 'Ana García Martínez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Ana García Martínez',
    religion: 'Elena Sánchez Gómez'
  }
];
