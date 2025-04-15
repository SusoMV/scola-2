
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Download, Edit, Save, X, FileSpreadsheet, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface Student {
  id: string;
  name: string;
  birthDate: string;
  parents: string;
  phone: string;
}

interface GroupData {
  [course: string]: Student[];
}

// Sample data - in a real app, this would come from your database
const initialGroups: GroupData = {
  '4º Infantil': [
    { id: '1', name: 'Alba Rodríguez Méndez', birthDate: '15/05/2020', parents: 'Ana Méndez / Carlos Rodríguez', phone: '666111222' },
    { id: '2', name: 'Bruno Sánchez López', birthDate: '23/06/2020', parents: 'Marta López / David Sánchez', phone: '666333444' },
    { id: '3', name: 'Carla Martínez García', birthDate: '12/04/2020', parents: 'Lucía García / Pedro Martínez', phone: '666555666' }
  ],
  '5º Infantil': [
    { id: '4', name: 'Daniel Pérez Fernández', birthDate: '04/08/2019', parents: 'Sofía Fernández / Javier Pérez', phone: '666777888' },
    { id: '5', name: 'Eva González Silva', birthDate: '17/09/2019', parents: 'María Silva / Antonio González', phone: '666999000' }
  ],
  '6º Infantil': [
    { id: '6', name: 'Fernando López Castro', birthDate: '30/11/2018', parents: 'Laura Castro / Marcos López', phone: '677111222' },
    { id: '7', name: 'Gloria Díaz Vázquez', birthDate: '25/10/2018', parents: 'Carmen Vázquez / Roberto Díaz', phone: '677333444' }
  ],
  '1º Primaria': [
    { id: '8', name: 'Hugo Fernández Gómez', birthDate: '14/02/2018', parents: 'Raquel Gómez / Alberto Fernández', phone: '677555666' },
    { id: '9', name: 'Irene Castro Blanco', birthDate: '09/03/2018', parents: 'Nuria Blanco / Luis Castro', phone: '677777888' }
  ],
  '2º Primaria': [
    { id: '10', name: 'Jorge Martín Álvarez', birthDate: '22/04/2017', parents: 'Paula Álvarez / Sergio Martín', phone: '677999000' },
    { id: '11', name: 'Lucía Torres Pérez', birthDate: '11/05/2017', parents: 'Silvia Pérez / José Torres', phone: '688111222' }
  ],
  '3º Primaria': [
    { id: '12', name: 'Mario Ruiz Díaz', birthDate: '07/06/2016', parents: 'Teresa Díaz / Francisco Ruiz', phone: '688333444' },
    { id: '13', name: 'Nuria Soto López', birthDate: '19/07/2016', parents: 'Isabel López / Miguel Soto', phone: '688555666' }
  ],
  '4º Primaria': [
    { id: '14', name: 'Óscar Gil Martínez', birthDate: '03/08/2015', parents: 'Beatriz Martínez / Juan Gil', phone: '688777888' },
    { id: '15', name: 'Paula Calvo Rico', birthDate: '29/09/2015', parents: 'Cristina Rico / Álvaro Calvo', phone: '688999000' }
  ],
  '5º Primaria': [
    { id: '16', name: 'Raúl Moreno Vega', birthDate: '13/10/2014', parents: 'Elena Vega / Iván Moreno', phone: '699111222' },
    { id: '17', name: 'Sara Ortiz Cano', birthDate: '08/11/2014', parents: 'Alicia Cano / Gabriel Ortiz', phone: '699333444' }
  ],
  '6º Primaria': [
    { id: '18', name: 'Tomás Ramos Bravo', birthDate: '24/12/2013', parents: 'Marina Bravo / Víctor Ramos', phone: '699555666' },
    { id: '19', name: 'Valentina Cruz Serrano', birthDate: '16/01/2014', parents: 'Natalia Serrano / Eduardo Cruz', phone: '699777888' }
  ]
};

// List of available courses
const courses = [
  '4º Infantil', '5º Infantil', '6º Infantil',
  '1º Primaria', '2º Primaria', '3º Primaria',
  '4º Primaria', '5º Primaria', '6º Primaria'
];

const StudentGroupsTab: React.FC = () => {
  const [groups, setGroups] = useState<GroupData>(initialGroups);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingStudents, setEditingStudents] = useState<Student[]>([]);
  const isMobile = useIsMobile();

  // In a real app, you would fetch this data from the database
  useEffect(() => {
    // Simulating data loading
    const loadedData = localStorage.getItem('student_groups');
    if (loadedData) {
      try {
        setGroups(JSON.parse(loadedData));
      } catch (e) {
        console.error('Error loading student groups', e);
        setGroups(initialGroups);
      }
    }
  }, []);

  const handleOpenCourse = (course: string) => {
    setSelectedCourse(course);
    setEditMode(false);
    setEditingStudents(groups[course]);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
    setEditMode(false);
  };

  const handleEditMode = () => {
    if (selectedCourse) {
      setEditMode(true);
      setEditingStudents([...groups[selectedCourse]]);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (selectedCourse) {
      setEditingStudents(groups[selectedCourse]);
    }
  };

  const handleSaveChanges = () => {
    if (selectedCourse) {
      const updatedGroups = { ...groups };
      updatedGroups[selectedCourse] = editingStudents;
      setGroups(updatedGroups);
      setEditMode(false);
      
      // In a real app, you would send this data to your API
      localStorage.setItem('student_groups', JSON.stringify(updatedGroups));
      toast.success('Grupo de alumnado gardado correctamente');
    }
  };

  const handleEditStudent = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...editingStudents];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value
    };
    setEditingStudents(updatedStudents);
  };

  const handleExportExcel = () => {
    if (selectedCourse) {
      // In a real app, you would implement actual Excel export functionality
      toast.success(`Lista de ${selectedCourse} exportada a Excel`);
    }
  };

  const handleExportPDF = () => {
    if (selectedCourse) {
      // In a real app, you would implement actual PDF export functionality
      toast.success(`Lista de ${selectedCourse} exportada a PDF`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {courses.map((course) => (
          <Button
            key={course}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center p-2 text-xs md:text-sm border-scola-primary text-scola-primary hover:bg-scola-pastel"
            onClick={() => handleOpenCourse(course)}
          >
            <span className="text-center">{course}</span>
            <span className="text-xs text-gray-500 mt-1">
              {groups[course] ? groups[course].length : 0} alumnos
            </span>
          </Button>
        ))}
      </div>

      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && handleCloseCourse()}>
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
                  onClick={handleExportExcel}
                  className="text-xs md:text-sm"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleExportPDF}
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
                      onClick={handleCancelEdit}
                      className="text-xs md:text-sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSaveChanges}
                      className="text-xs md:text-sm"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Gardar
                    </Button>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={handleEditMode}
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
                  {(editMode ? editingStudents : groups[selectedCourse]).map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell className="py-2">
                        {editMode ? (
                          <Input
                            value={editingStudents[index].name}
                            onChange={(e) => handleEditStudent(index, 'name', e.target.value)}
                            className="h-8 text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-xs md:text-sm">{student.name}</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        {editMode ? (
                          <Input
                            value={editingStudents[index].birthDate}
                            onChange={(e) => handleEditStudent(index, 'birthDate', e.target.value)}
                            className="h-8 text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-xs md:text-sm">{student.birthDate}</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        {editMode ? (
                          <Input
                            value={editingStudents[index].parents}
                            onChange={(e) => handleEditStudent(index, 'parents', e.target.value)}
                            className="h-8 text-xs md:text-sm"
                          />
                        ) : (
                          <span className="text-xs md:text-sm">{student.parents}</span>
                        )}
                      </TableCell>
                      <TableCell className="py-2">
                        {editMode ? (
                          <Input
                            value={editingStudents[index].phone}
                            onChange={(e) => handleEditStudent(index, 'phone', e.target.value)}
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
      )}
    </div>
  );
};

export default StudentGroupsTab;
