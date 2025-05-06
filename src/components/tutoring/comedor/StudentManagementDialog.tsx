
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { CourseData, Student } from './types';
import StudentForm from './StudentForm';
import StudentsList from './StudentsList';

interface StudentManagementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newStudent: Partial<Student>;
  setNewStudent: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  courses: CourseData[];
  editingStudent: Student | null;
  setEditingStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  onAddStudent: () => void;
  onSaveEdit: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

const StudentManagementDialog: React.FC<StudentManagementDialogProps> = ({
  isOpen,
  onOpenChange,
  newStudent,
  setNewStudent,
  courses,
  editingStudent,
  setEditingStudent,
  onAddStudent,
  onSaveEdit,
  onEditStudent,
  onDeleteStudent
}) => {
  const [filteredCourse, setFilteredCourse] = useState<string>('');
  
  // Reset filter when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFilteredCourse('');
    }
  }, [isOpen]);

  const resetForm = () => {
    setEditingStudent(null);
    setNewStudent({
      name: '',
      course: '',
      hasAllergies: false,
      allergyDetails: '',
      isPresent: true
    });
    onOpenChange(false);
  };

  // Get all students across all courses
  const allStudents = courses.flatMap(course => course.students);
  
  // Get course names for dropdown
  const courseNames = courses.map(course => course.name);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? 'Editar comensal' : 'Engadir novo comensal'}
          </DialogTitle>
        </DialogHeader>
        
        <StudentForm
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          editingStudent={editingStudent}
          onSave={editingStudent ? onSaveEdit : onAddStudent}
          onCancel={resetForm}
          courses={courseNames}
        />

        <div className="mt-4">
          <StudentsList
            students={allStudents}
            filteredCourse={filteredCourse}
            setFilteredCourse={setFilteredCourse}
            onEditStudent={onEditStudent}
            onDeleteStudent={onDeleteStudent}
            courses={courseNames}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentManagementDialog;
