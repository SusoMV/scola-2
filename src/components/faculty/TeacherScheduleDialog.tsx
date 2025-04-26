
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TeacherSchedule from '@/components/schedules/TeacherSchedule';
import { FacultyMember } from '@/hooks/useFacultyMembers';

interface TeacherScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: FacultyMember | null;
}

const TeacherScheduleDialog: React.FC<TeacherScheduleDialogProps> = ({
  open,
  onOpenChange,
  teacher
}) => {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Horario de {teacher.name}</DialogTitle>
        </DialogHeader>
        <TeacherSchedule defaultTeachers={[{ id: teacher.id, name: teacher.name }]} />
      </DialogContent>
    </Dialog>
  );
};

export default TeacherScheduleDialog;
