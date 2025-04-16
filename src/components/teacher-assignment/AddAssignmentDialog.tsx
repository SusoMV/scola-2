
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TeacherAssignment } from './types/assignment-types';

interface AddAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newAssignment: TeacherAssignment;
  onFieldChange: (field: keyof TeacherAssignment, value: string) => void;
  onAddAssignment: () => void;
}

const AddAssignmentDialog: React.FC<AddAssignmentDialogProps> = ({
  open,
  onOpenChange,
  newAssignment,
  onFieldChange,
  onAddAssignment
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Engadir nova adscrición</DialogTitle>
          <DialogDescription>
            Introduce a información da nova adscrición docente
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Curso
            </Label>
            <Input
              id="course"
              value={newAssignment.course}
              onChange={(e) => onFieldChange('course', e.target.value)}
              placeholder="Introduce o curso (ej: 4º Infantil)"
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tutor" className="text-right">
              Titora/Titor
            </Label>
            <Input
              id="tutor"
              value={newAssignment.tutor}
              onChange={(e) => onFieldChange('tutor', e.target.value)}
              placeholder="Nome do titor"
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
              onChange={(e) => onFieldChange('english', e.target.value)}
              placeholder="Profesor de inglés"
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
              onChange={(e) => onFieldChange('physicalEd', e.target.value)}
              placeholder="Profesor de educación física"
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
              onChange={(e) => onFieldChange('music', e.target.value)}
              placeholder="Profesor de música"
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
              onChange={(e) => onFieldChange('art', e.target.value)}
              placeholder="Profesor de plástica"
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
              onChange={(e) => onFieldChange('religion', e.target.value)}
              placeholder="Profesor de relixión"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onAddAssignment} className="bg-[#0070C0] hover:bg-[#0058a2]">Engadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentDialog;
