
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save } from 'lucide-react';
import { Student } from './types';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  students: Student[];
  onStudentChange: (index: number, field: keyof Student, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({
  open,
  onOpenChange,
  groupName,
  students,
  onStudentChange,
  onAddRow,
  onRemoveRow,
  onSave,
  onCancel
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Engadir alumnado ao grupo: {groupName}</DialogTitle>
          <DialogDescription>
            Introduce os datos do alumnado que queres engadir ao grupo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm">
            <div className="col-span-3">Nome e apelidos</div>
            <div className="col-span-2">Data de nacemento</div>
            <div className="col-span-3">Nome dos proxenitores</div>
            <div className="col-span-3">Teléfono de contacto</div>
            <div className="col-span-1"></div>
          </div>
          
          {students.map((student, index) => (
            <div key={student.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <Input
                  value={student.name}
                  onChange={(e) => onStudentChange(index, 'name', e.target.value)}
                  placeholder="Nome e apelidos"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={student.birthDate}
                  onChange={(e) => onStudentChange(index, 'birthDate', e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div className="col-span-3">
                <Input
                  value={student.parents}
                  onChange={(e) => onStudentChange(index, 'parents', e.target.value)}
                  placeholder="Nomes dos proxenitores"
                />
              </div>
              <div className="col-span-3">
                <Input
                  value={student.phone}
                  onChange={(e) => onStudentChange(index, 'phone', e.target.value)}
                  placeholder="Teléfono"
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveRow(index)}
                  disabled={students.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onAddRow}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Engadir alumno/a
          </Button>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={onSave} className="bg-scola-primary">
            <Save className="h-4 w-4 mr-1" />
            Gardar grupo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
