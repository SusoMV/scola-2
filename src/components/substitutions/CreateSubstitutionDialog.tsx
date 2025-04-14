
import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubstitutionForm from './SubstitutionForm';

interface CreateSubstitutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  absentTeachers: string[];
  substituteTeachers: string[];
}

const CreateSubstitutionDialog: React.FC<CreateSubstitutionDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  absentTeachers,
  substituteTeachers
}) => {
  const form = useForm({
    defaultValues: {
      absentTeacher: '',
      course: '',
      reason: '',
      specialty: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      substituteTeacher: ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nova Ausencia</DialogTitle>
          <DialogDescription>
            Complete os datos da nova ausencia e substitución.
          </DialogDescription>
        </DialogHeader>
        <SubstitutionForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          absentTeachers={absentTeachers}
          substituteTeachers={substituteTeachers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubstitutionDialog;
