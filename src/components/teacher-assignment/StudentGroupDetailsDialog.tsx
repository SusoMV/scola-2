
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileSpreadsheet, FileText, Edit, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Student } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface StudentGroupDetailsDialogProps {
  selectedCourse: string | null;
  editMode: boolean;
  editingStudents: Student[];
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
  onEditStudent: (index: number, field: keyof Student, value: string) => void;
}

const StudentGroupDetailsDialog: React.FC<StudentGroupDetailsDialogProps> = ({
  selectedCourse,
  editMode,
  editingStudents,
  onClose,
  onEdit,
  onCancel,
  onSave,
  onExportExcel,
  onExportPDF,
  onEditStudent
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`sm:max-w-[900px] ${isMobile ? 'p-3' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-medium text-scola-primary">
            {selectedCourse}
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Lista de alumnado matriculado neste curso
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={onExportExcel}
              className="text-xs md:text-sm"
            >
              <FileSpreadsheet className="h-4 w-4 mr-1" />
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
          
          <div>
            {editMode ? (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={onCancel}
                  className="text-xs md:text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  onClick={onSave}
                  className="text-xs md:text-sm"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Gardar
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                onClick={onEdit}
                className="text-xs md:text-sm"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs md:text-sm font-medium">Nome e apelidos</TableHead>
                <TableHead className="text-xs md:text-sm font-medium">Data de nacemento</TableHead>
                <TableHead className="text-xs md:text-sm font-medium">Proxenitores</TableHead>
                <TableHead className="text-xs md:text-sm font-medium">Teléfono</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editingStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="py-2">
                    {editMode ? (
                      <Input
                        value={student.name}
                        onChange={(e) => onEditStudent(index, 'name', e.target.value)}
                        className="h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <span className="text-xs md:text-sm">{student.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2">
                    {editMode ? (
                      <Input
                        value={student.birthDate}
                        onChange={(e) => onEditStudent(index, 'birthDate', e.target.value)}
                        className="h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <span className="text-xs md:text-sm">{student.birthDate}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2">
                    {editMode ? (
                      <Input
                        value={student.parents}
                        onChange={(e) => onEditStudent(index, 'parents', e.target.value)}
                        className="h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <span className="text-xs md:text-sm">{student.parents}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2">
                    {editMode ? (
                      <Input
                        value={student.phone}
                        onChange={(e) => onEditStudent(index, 'phone', e.target.value)}
                        className="h-8 text-xs md:text-sm"
                      />
                    ) : (
                      <span className="text-xs md:text-sm">{student.phone}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentGroupDetailsDialog;
