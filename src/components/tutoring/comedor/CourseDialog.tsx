
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
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
import { Switch } from '@/components/ui/switch';
import { AlertTriangle } from 'lucide-react';
import { CourseData } from './types';

interface CourseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCourse: CourseData | null;
  onToggleStudentPresence: (courseIndex: number, studentId: number) => void;
  courses: CourseData[];
}

const CourseDialog: React.FC<CourseDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  selectedCourse, 
  onToggleStudentPresence,
  courses
}) => {
  if (!selectedCourse) return null;
  
  const courseIndex = courses.findIndex(c => c.name === selectedCourse.name);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Comensais de {selectedCourse.name}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Alerxias</TableHead>
                <TableHead>Asistencia</TableHead>
                <TableHead>Accións</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCourse.students.map((student) => (
                <TableRow 
                  key={student.id}
                  className={student.hasAllergies ? "bg-amber-50" : ""}
                >
                  <TableCell className="font-medium">
                    {student.name}
                  </TableCell>
                  <TableCell>
                    {student.hasAllergies ? (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                        <span>{student.allergyDetails}</span>
                      </div>
                    ) : 'Non'}
                  </TableCell>
                  <TableCell>
                    {student.isPresent ? 'Presente' : 'Ausente'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch 
                        checked={student.isPresent} 
                        onCheckedChange={() => onToggleStudentPresence(courseIndex, student.id)}
                        className={student.isPresent ? "bg-green-500" : "bg-gray-300"}
                      />
                      <span className={`ml-2 text-sm ${student.isPresent ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                        {student.isPresent ? 'Asiste' : 'Non asiste'}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Pechar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
