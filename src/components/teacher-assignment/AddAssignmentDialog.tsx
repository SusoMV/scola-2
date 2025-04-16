
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeacherAssignment, facultyMembers, courses } from './types/assignment-types';

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
            <Select
              value={newAssignment.course}
              onValueChange={(value) => onFieldChange('course', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tutor" className="text-right">
              Titora/Titor
            </Label>
            <Select
              value={newAssignment.tutor}
              onValueChange={(value) => onFieldChange('tutor', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="english" className="text-right">
              Inglés
            </Label>
            <Select
              value={newAssignment.english}
              onValueChange={(value) => onFieldChange('english', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="physicalEd" className="text-right">
              Educación Física
            </Label>
            <Select
              value={newAssignment.physicalEd}
              onValueChange={(value) => onFieldChange('physicalEd', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="music" className="text-right">
              Música
            </Label>
            <Select
              value={newAssignment.music}
              onValueChange={(value) => onFieldChange('music', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="art" className="text-right">
              Plástica
            </Label>
            <Select
              value={newAssignment.art}
              onValueChange={(value) => onFieldChange('art', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="religion" className="text-right">
              Relixión
            </Label>
            <Select
              value={newAssignment.religion}
              onValueChange={(value) => onFieldChange('religion', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un docente" />
              </SelectTrigger>
              <SelectContent>
                {facultyMembers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onAddAssignment} className="bg-scola-primary">Engadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignmentDialog;
