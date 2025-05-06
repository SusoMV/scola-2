
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { CourseData } from './types';

interface CourseManagementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  courses: CourseData[];
  onAddCourse: (courseName: string) => void;
  onRemoveCourse: (courseName: string) => void;
}

const CourseManagementDialog: React.FC<CourseManagementDialogProps> = ({
  isOpen,
  onOpenChange,
  courses,
  onAddCourse,
  onRemoveCourse
}) => {
  const [newCourseName, setNewCourseName] = useState('');
  const [error, setError] = useState('');

  const handleAddCourse = () => {
    if (!newCourseName.trim()) {
      setError('O nome do curso non pode estar baleiro');
      return;
    }
    
    // Check if course name already exists
    if (courses.some(course => course.name === newCourseName.trim())) {
      setError('Xa existe un curso con ese nome');
      return;
    }
    
    setError('');
    onAddCourse(newCourseName.trim());
    setNewCourseName('');
  };

  const handleRemoveCourse = (courseName: string) => {
    // Confirm before removing
    if (window.confirm(`¿Está seguro de que quere eliminar o curso "${courseName}" e todos os seus comensais?`)) {
      onRemoveCourse(courseName);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Xestión de cursos</DialogTitle>
          <DialogDescription>
            Engade novos cursos ou elimina os existentes
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="courseName">Nome do novo curso</Label>
            <div className="flex items-center gap-2">
              <Input
                id="courseName"
                placeholder="Introduce o nome do curso"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddCourse}>Engadir</Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Cursos existentes</h3>
            <div className="max-h-[300px] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do curso</TableHead>
                    <TableHead>Comensais</TableHead>
                    <TableHead>Accións</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map(course => (
                    <TableRow key={course.name}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.totalStudents}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCourse(course.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          disabled={course.totalStudents > 0}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {courses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        Non hai cursos engadidos
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Nota: Só se poden eliminar cursos que non teñan comensais asignados
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Pechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseManagementDialog;
