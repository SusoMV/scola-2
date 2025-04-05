
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Check, CalendarIcon, Clock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data - in a real app, this would come from the database
const MOCK_STUDENTS = [
  { id: 1, name: 'Ana García' },
  { id: 2, name: 'Carlos Rodríguez' },
  { id: 3, name: 'María López' },
  { id: 4, name: 'David Fernández' },
  { id: 5, name: 'Laura Martínez' },
];

interface Absence {
  id: number;
  studentId: number;
  studentName: string;
  date: Date;
  time: string;
  justified: boolean;
}

const AttendanceControl = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleAddAbsence = () => {
    if (!selectedStudent || !selectedDate || !selectedTime) {
      toast.error('Por favor, complete todos os campos obrigatorios');
      return;
    }

    const selectedStudentObject = MOCK_STUDENTS.find(
      student => student.name === selectedStudent
    );

    if (!selectedStudentObject) {
      toast.error('Estudante non atopado');
      return;
    }

    const newAbsence: Absence = {
      id: Date.now(),
      studentId: selectedStudentObject.id,
      studentName: selectedStudentObject.name,
      date: selectedDate,
      time: selectedTime,
      justified: false,
    };

    setAbsences([...absences, newAbsence]);
    toast.success('Falta de asistencia rexistrada');
    setIsDialogOpen(false);
    
    // Reset form
    setSelectedStudent('');
    setSelectedDate(new Date());
    setSelectedTime('');
  };

  const toggleJustified = (absenceId: number) => {
    setAbsences(
      absences.map(absence => 
        absence.id === absenceId 
          ? { ...absence, justified: !absence.justified } 
          : absence
      )
    );
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Control de asistencia</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scola-primary">Engadir falta</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rexistrar falta de asistencia</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Alumno/a</Label>
                  <select 
                    id="student"
                    className="w-full p-2 border rounded-md"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="">Seleccione alumno/a</option>
                    {MOCK_STUDENTS.map(student => (
                      <option key={student.id} value={student.name}>
                        {student.name}
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
                  <Label htmlFor="time">Hora</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <Input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleAddAbsence}>Gardar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {absences.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno/a</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Accións</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absences.map((absence) => (
                <TableRow key={absence.id}>
                  <TableCell>{absence.studentName}</TableCell>
                  <TableCell>{format(absence.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{absence.time}</TableCell>
                  <TableCell>
                    {absence.justified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" /> Xustificada
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <X className="w-3 h-3 mr-1" /> Non xustificada
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleJustified(absence.id)}
                      className={absence.justified ? "text-red-600 border-red-600 hover:bg-red-50" : "text-green-600 border-green-600 hover:bg-green-50"}
                    >
                      {absence.justified ? "Marcar como non xustificada" : "Marcar como xustificada"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Non hai faltas de asistencia rexistradas
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceControl;
