
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Search, Book } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Datos de ejemplo para estudiantes
const MOCK_STUDENTS = [{
  id: 1,
  name: 'Ana García',
  grade: '1º Primaria'
}, {
  id: 2,
  name: 'Carlos Rodríguez',
  grade: '2º Primaria'
}, {
  id: 3,
  name: 'María López',
  grade: '3º Primaria'
}, {
  id: 4,
  name: 'David Fernández',
  grade: '4º Primaria'
}, {
  id: 5,
  name: 'Laura Martínez',
  grade: '5º Primaria'
}];

// Tipo para las anotaciones
interface StudentNote {
  id: number;
  studentId: number;
  studentName: string;
  date: Date;
  note: string;
  grade: string;
}

const NotesSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState<StudentNote[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (!selectedStudent || !selectedDate || !noteText) {
      toast.error('Por favor, complete todos os campos obrigatorios');
      return;
    }

    const selectedStudentObject = MOCK_STUDENTS.find(student => student.name === selectedStudent);
    if (!selectedStudentObject) {
      toast.error('Estudante non atopado');
      return;
    }

    const newNote: StudentNote = {
      id: Date.now(),
      studentId: selectedStudentObject.id,
      studentName: selectedStudentObject.name,
      date: selectedDate,
      note: noteText,
      grade: selectedStudentObject.grade
    };

    setNotes([...notes, newNote]);
    toast.success('Anotación gardada con éxito');
    setIsDialogOpen(false);

    // Resetear el formulario
    setSelectedStudent('');
    setSelectedDate(new Date());
    setNoteText('');
  };

  const filteredNotes = notes.filter(note => 
    note.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
    note.note.toLowerCase().includes(searchText.toLowerCase()) ||
    format(note.date, 'dd/MM/yyyy').includes(searchText)
  );

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <Book className="h-5 w-5 text-scola-primary" />
            Anotacións de alumnos
          </h2>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar anotacións..."
                className="pl-8 w-[220px]"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-scola-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Engadir anotación
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova anotación</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Alumno/a</Label>
                    <select
                      id="student"
                      className="w-full p-2 border rounded-md"
                      value={selectedStudent}
                      onChange={e => setSelectedStudent(e.target.value)}
                    >
                      <option value="">Seleccione alumno/a</option>
                      {MOCK_STUDENTS.map(student => (
                        <option key={student.id} value={student.name}>
                          {student.name} - {student.grade}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : "Seleccione data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Anotación</Label>
                    <Textarea
                      id="note"
                      placeholder="Escriba a anotación"
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button onClick={handleAddNote}>Gardar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {notes.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Alumno/a</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Anotación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotes.map(note => (
                  <TableRow key={note.id}>
                    <TableCell>{format(note.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{note.studentName}</TableCell>
                    <TableCell>{note.grade}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={note.note}>
                        {note.note}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Non hai anotacións. Pulse o botón "Engadir anotación" para crear unha nova.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotesSection;
