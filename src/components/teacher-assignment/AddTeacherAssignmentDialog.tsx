
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeacherAssignment, courses } from './types/assignment-types';

interface AddTeacherAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newAssignment: TeacherAssignment;
  onNewAssignmentChange: (value: TeacherAssignment) => void;
  onAddAssignment: () => void;
}

const AddTeacherAssignmentDialog: React.FC<AddTeacherAssignmentDialogProps> = ({
  open,
  onOpenChange,
  newAssignment,
  onNewAssignmentChange,
  onAddAssignment
}) => {
  const handleChange = (field: keyof TeacherAssignment, value: string) => {
    onNewAssignmentChange({
      ...newAssignment,
      [field]: value
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Engadir nova adscrición</DialogTitle>
          <DialogDescription>
            Introduce os datos da nova adscrición de docentes
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Curso
            </Label>
            <div className="col-span-3">
              <Select
                value={newAssignment.course}
                onValueChange={(value) => handleChange('course', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tutor" className="text-right">
              Titora/Titor
            </Label>
            <Input
              id="tutor"
              value={newAssignment.tutor}
              onChange={(e) => handleChange('tutor', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="english" className="text-right">
              Inglés
            </Label>
            <Input
              id="english"
              value={newAssignment.english}
              onChange={(e) => handleChange('english', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="physicalEd" className="text-right">
              Educación Física
            </Label>
            <Input
              id="physicalEd"
              value={newAssignment.physicalEd}
              onChange={(e) => handleChange('physicalEd', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="music" className="text-right">
              Música
            </Label>
            <Input
              id="music"
              value={newAssignment.music}
              onChange={(e) => handleChange('music', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="art" className="text-right">
              Plástica
            </Label>
            <Input
              id="art"
              value={newAssignment.art}
              onChange={(e) => handleChange('art', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="religion" className="text-right">
              Relixión
            </Label>
            <Input
              id="religion"
              value={newAssignment.religion}
              onChange={(e) => handleChange('religion', e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onAddAssignment} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            Gardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeacherAssignmentDialog;
