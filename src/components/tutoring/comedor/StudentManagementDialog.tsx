
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { CourseData, Student } from './types';

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
  onEditStudent
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

  // Filter students based on selected course
  const filteredStudents = filteredCourse 
    ? courses.flatMap(course => 
        course.name === filteredCourse 
          ? course.students 
          : []
      )
    : courses.flatMap(course => course.students);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? 'Editar comensal' : 'Engadir novo comensal'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome completo
            </label>
            <input
              id="name"
              className="w-full p-2 border rounded-md"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="text-sm font-medium">
              Curso
            </label>
            <select
              id="course"
              className="w-full p-2 border rounded-md"
              value={newStudent.course}
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
            >
              <option value="">Selecciona un curso</option>
              {courses.map((course) => (
                <option key={course.name} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasAllergies"
              checked={newStudent.hasAllergies}
              onChange={(e) => setNewStudent({...newStudent, hasAllergies: e.target.checked})}
              className="h-4 w-4"
            />
            <label htmlFor="hasAllergies" className="text-sm font-medium">
              Ten alerxias
            </label>
          </div>

          {newStudent.hasAllergies && (
            <div className="space-y-2">
              <label htmlFor="allergyDetails" className="text-sm font-medium">
                Descrición das alerxias
              </label>
              <input
                id="allergyDetails"
                className="w-full p-2 border rounded-md"
                value={newStudent.allergyDetails}
                onChange={(e) => setNewStudent({...newStudent, allergyDetails: e.target.value})}
                placeholder="Ex: Lactosa, Frutos secos..."
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={resetForm}>
            Cancelar
          </Button>
          <Button 
            onClick={editingStudent ? onSaveEdit : onAddStudent}
            className="bg-scola-primary"
          >
            {editingStudent ? 'Gardar cambios' : 'Engadir'}
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Comensais existentes</h3>
            <select
              className="p-1 text-sm border rounded-md"
              value={filteredCourse}
              onChange={(e) => setFilteredCourse(e.target.value)}
            >
              <option value="">Todos os cursos</option>
              {courses.map((course) => (
                <option key={course.name} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Accións</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map(student => (
                  <TableRow key={student.id} className={student.hasAllergies ? "bg-amber-50" : ""}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditStudent(student)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentManagementDialog;
