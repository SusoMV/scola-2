
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Student } from './types';

interface StudentsListProps {
  students: Student[];
  filteredCourse: string;
  setFilteredCourse: React.Dispatch<React.SetStateAction<string>>;
  onEditStudent: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
  courses: string[];
}

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  filteredCourse,
  setFilteredCourse,
  onEditStudent,
  onDeleteStudent,
  courses,
}) => {
  // Filter students based on selected course
  const filteredStudents = filteredCourse
    ? students.filter(student => student.course === filteredCourse)
    : students;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Comensais existentes</h3>
        <select
          className="p-1 text-sm border rounded-md"
          value={filteredCourse}
          onChange={(e) => setFilteredCourse(e.target.value)}
        >
          <option value="">Todos os cursos</option>
          {courses.map((courseName) => (
            <option key={courseName} value={courseName}>{courseName}</option>
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <TableRow key={student.id} className={student.hasAllergies ? "bg-amber-50" : ""}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditStudent(student)}
                      >
                        Editar
                      </Button>
                      {onDeleteStudent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => onDeleteStudent(student)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  Non hai comensais {filteredCourse ? `no curso ${filteredCourse}` : ''}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsList;
