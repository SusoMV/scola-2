
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { Student } from './types';

interface AddStudentGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGroup: (groupName: string, students: Student[]) => void;
}

const AddStudentGroupDialog: React.FC<AddStudentGroupDialogProps> = ({
  open,
  onOpenChange,
  onAddGroup
}) => {
  const [groupName, setGroupName] = useState('');
  const [students, setStudents] = useState<Student[]>([
    { 
      id: crypto.randomUUID(), 
      name: '', 
      birthDate: '', 
      parents: '', 
      phone: '' 
    }
  ]);

  const handleAddStudent = () => {
    setStudents([
      ...students,
      { 
        id: crypto.randomUUID(), 
        name: '', 
        birthDate: '', 
        parents: '', 
        phone: '' 
      }
    ]);
  };

  const handleRemoveStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleStudentChange = (id: string, field: keyof Student, value: string) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, [field]: value } : student
    ));
  };

  const handleSubmit = () => {
    if (groupName.trim() === '') {
      return;
    }
    
    const validStudents = students.filter(student => 
      student.name.trim() !== '' && 
      student.birthDate.trim() !== '' && 
      student.parents.trim() !== '' && 
      student.phone.trim() !== ''
    );
    
    onAddGroup(groupName, validStudents);
    setGroupName('');
    setStudents([
      { 
        id: crypto.randomUUID(), 
        name: '', 
        birthDate: '', 
        parents: '', 
        phone: '' 
      }
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Engadir novo grupo</DialogTitle>
          <DialogDescription>
            Introduce o nome do grupo e os datos do alumnado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupName" className="text-right">
              Nome do grupo
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Ex: 1º Primaria A"
              className="col-span-3"
            />
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Listado de alumnado</h3>
              <Button 
                type="button" 
                size="sm" 
                onClick={handleAddStudent}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Engadir alumno/a
              </Button>
            </div>
            
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome e apelidos</TableHead>
                    <TableHead>Data de nacemento</TableHead>
                    <TableHead>Proxenitores</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="p-2">
                        <Input
                          value={student.name}
                          onChange={(e) => handleStudentChange(student.id, 'name', e.target.value)}
                          className="h-8 text-xs"
                          placeholder="Nome completo"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input
                          value={student.birthDate}
                          onChange={(e) => handleStudentChange(student.id, 'birthDate', e.target.value)}
                          className="h-8 text-xs"
                          placeholder="DD/MM/AAAA"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input
                          value={student.parents}
                          onChange={(e) => handleStudentChange(student.id, 'parents', e.target.value)}
                          className="h-8 text-xs"
                          placeholder="Nome dos proxenitores"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input
                          value={student.phone}
                          onChange={(e) => handleStudentChange(student.id, 'phone', e.target.value)}
                          className="h-8 text-xs"
                          placeholder="Teléfono"
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveStudent(student.id)}
                          disabled={students.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Engadir grupo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentGroupDialog;
