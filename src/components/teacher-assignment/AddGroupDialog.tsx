
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Student } from './types';
import { Plus, Trash } from 'lucide-react';

interface AddGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newGroupName: string;
  onNewGroupNameChange: (value: string) => void;
  onAddGroup: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({
  open,
  onOpenChange,
  newGroupName,
  onNewGroupNameChange,
  onAddGroup
}) => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name: '',
      birthDate: '',
      parents: '',
      phone: ''
    };
    
    setStudents([...students, newStudent]);
  };

  const handleRemoveStudent = (index: number) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value
    };
    setStudents(updatedStudents);
  };

  const handleSave = () => {
    // Here we would normally save both the group and its students
    // For now, we'll just call the onAddGroup function
    onAddGroup();
    setStudents([]);
  };

  const handleDialogClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setStudents([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Engadir novo grupo</DialogTitle>
          <DialogDescription>
            Introduce o nome do grupo e o alumnado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome do grupo
            </Label>
            <Input
              id="name"
              value={newGroupName}
              onChange={(e) => onNewGroupNameChange(e.target.value)}
              placeholder="Ex: 1º Primaria B"
              className="col-span-3"
            />
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium">Alumnado</h3>
            </div>
            
            {students.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 text-sm font-medium text-gray-700 pb-2 border-b">
                  <div className="col-span-2">Nome e apelidos</div>
                  <div>Data nacemento</div>
                  <div>Proxenitores</div>
                  <div>Teléfono</div>
                </div>
                
                {students.map((student, index) => (
                  <div key={student.id} className="grid grid-cols-5 gap-2 items-center">
                    <div className="col-span-2">
                      <Input 
                        value={student.name} 
                        onChange={(e) => handleEditStudent(index, 'name', e.target.value)}
                        placeholder="Nome e apelidos"
                        className="text-sm" 
                      />
                    </div>
                    <div>
                      <Input 
                        value={student.birthDate} 
                        onChange={(e) => handleEditStudent(index, 'birthDate', e.target.value)}
                        placeholder="DD/MM/AAAA"
                        className="text-sm" 
                      />
                    </div>
                    <div>
                      <Input 
                        value={student.parents} 
                        onChange={(e) => handleEditStudent(index, 'parents', e.target.value)}
                        placeholder="Nomes"
                        className="text-sm" 
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Input 
                        value={student.phone} 
                        onChange={(e) => handleEditStudent(index, 'phone', e.target.value)}
                        placeholder="Teléfono"
                        className="text-sm" 
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveStudent(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Non hai alumnado neste grupo
              </div>
            )}
            
            <Button 
              onClick={handleAddStudent} 
              className="w-full mt-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Engadir alumno/a
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDialogClose(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            Gardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupDialog;
