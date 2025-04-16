
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { facultyMembers, TeacherAssignment } from './types/assignment-types';
import { courses } from './types';

interface AddAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssignment: (assignment: TeacherAssignment) => void;
}

const AddAssignmentDialog: React.FC<AddAssignmentDialogProps> = ({
  open,
  onOpenChange,
  onAddAssignment
}) => {
  const [newAssignment, setNewAssignment] = useState<TeacherAssignment>({
    course: '',
    tutor: '',
    english: '',
    physicalEd: '',
    music: '',
    art: '',
    religion: ''
  });

  const handleInputChange = (field: keyof TeacherAssignment, value: string) => {
    setNewAssignment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onAddAssignment(newAssignment);
    setNewAssignment({
      course: '',
      tutor: '',
      english: '',
      physicalEd: '',
      music: '',
      art: '',
      religion: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Engadir nova adscrición</DialogTitle>
          <DialogDescription>
            Introduce os datos da nova adscrición docente
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
                onValueChange={(value) => handleInputChange('course', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona curso" />
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
              Titor/a
            </Label>
            <Input
              id="tutor"
              value={newAssignment.tutor}
              onChange={(e) => handleInputChange('tutor', e.target.value)}
              placeholder="Nome do titor/a"
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
              onChange={(e) => handleInputChange('english', e.target.value)}
              placeholder="Docente de inglés"
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
              onChange={(e) => handleInputChange('physicalEd', e.target.value)}
              placeholder="Docente de educación física"
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
              onChange={(e) => handleInputChange('music', e.target.value)}
              placeholder="Docente de música"
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
              onChange={(e) => handleInputChange('art', e.target.value)}
              placeholder="Docente de plástica"
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
              onChange={(e) => handleInputChange('religion', e.target.value)}
              placeholder="Docente de relixión"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Engadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentDialog;
