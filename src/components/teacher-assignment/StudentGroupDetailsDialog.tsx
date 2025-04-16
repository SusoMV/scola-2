
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Student } from './types';
import { FilePlus, FileText, Plus, Trash } from 'lucide-react';

interface StudentGroupDetailsDialogProps {
  selectedCourse: string;
  editingStudents: Student[];
  onClose: () => void;
  onSave: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  onEditStudent: (index: number, field: keyof Student, value: string) => void;
}

const StudentGroupDetailsDialog: React.FC<StudentGroupDetailsDialogProps> = ({
  selectedCourse,
  editingStudents,
  onClose,
  onSave,
  onExportExcel,
  onExportPDF,
  onEditStudent,
}) => {
  const handleAddStudent = () => {
    // Since this component doesn't have access to handleAddStudent,
    // we need to emit an event that can be caught by the parent component
    document.dispatchEvent(new CustomEvent('add-student-to-group'));
  };

  const handleRemoveStudent = (index: number) => {
    document.dispatchEvent(new CustomEvent('remove-student-from-group', { 
      detail: { index } 
    }));
  };

  return (
    <Sheet open={Boolean(selectedCourse)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{selectedCourse}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Lista de alumnado</h3>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onExportExcel}
                className="text-xs md:text-sm"
              >
                <FilePlus className="h-4 w-4 mr-1" />
                Excel
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onExportPDF}
                className="text-xs md:text-sm"
              >
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
          
          {editingStudents.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-sm font-medium text-gray-700 pb-2 border-b">
                <div className="col-span-2">Nome e apelidos</div>
                <div>Data nacemento</div>
                <div>Proxenitores</div>
                <div>Teléfono</div>
              </div>
              
              {editingStudents.map((student, index) => (
                <div key={student.id} className="grid grid-cols-5 gap-2 items-center">
                  <div className="col-span-2">
                    <Input 
                      value={student.name} 
                      onChange={(e) => onEditStudent(index, 'name', e.target.value)}
                      placeholder="Nome e apelidos"
                      className="text-sm" 
                    />
                  </div>
                  <div>
                    <Input 
                      value={student.birthDate} 
                      onChange={(e) => onEditStudent(index, 'birthDate', e.target.value)}
                      placeholder="DD/MM/AAAA"
                      className="text-sm" 
                    />
                  </div>
                  <div>
                    <Input 
                      value={student.parents} 
                      onChange={(e) => onEditStudent(index, 'parents', e.target.value)}
                      placeholder="Nomes"
                      className="text-sm" 
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Input 
                      value={student.phone} 
                      onChange={(e) => onEditStudent(index, 'phone', e.target.value)}
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
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Engadir alumno/a
          </Button>
        </div>
        
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button onClick={onSave} className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            Gardar cambios
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentGroupDetailsDialog;
