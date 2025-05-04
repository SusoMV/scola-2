
export interface Student {
  id: number;
  name: string;
  course: string;
  hasAllergies: boolean;
  allergyDetails?: string;
  isPresent: boolean;
}

export interface CourseData {
  name: string;
  totalStudents: number;
  allergicStudents: number;
  students: Student[];
}
