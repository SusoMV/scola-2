import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Check, CalendarIcon, Clock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
const COURSES = ["4º Infantil", "5º Infantil", "6º Infantil", "1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria", "5º Primaria", "6º Primaria"];
const MOCK_STUDENTS = [{
  id: 1,
  name: 'Ana García'
}, {
  id: 2,
  name: 'Carlos Rodríguez'
}, {
  id: 3,
  name: 'María López'
}, {
  id: 4,
  name: 'David Fernández'
}, {
  id: 5,
  name: 'Laura Martínez'
}];
interface Absence {
  id: number;
  studentId: number;
  studentName: string;
  date: Date;
  startTime: string;
  endTime: string;
  justified: boolean;
}
const AttendanceControl = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const handleAddAbsence = () => {
    if (!selectedStudent || !selectedDate || !startTime || !endTime) {
      toast.error('Por favor, complete todos os campos obrigatorios');
      return;
    }
    const selectedStudentObject = MOCK_STUDENTS.find(student => student.name === selectedStudent);
    if (!selectedStudentObject) {
      toast.error('Estudante non atopado');
      return;
    }
    const newAbsence: Absence = {
      id: Date.now(),
      studentId: selectedStudentObject.id,
      studentName: selectedStudentObject.name,
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
      justified: false
    };
    setAbsences([...absences, newAbsence]);
    toast.success('Falta de asistencia rexistrada');
    setIsDialogOpen(false);
    setSelectedStudent('');
    setSelectedDate(new Date());
    setStartTime('');
    setEndTime('');
  };
  const toggleJustified = (absenceId: number) => {
    setAbsences(absences.map(absence => absence.id === absenceId ? {
      ...absence,
      justified: !absence.justified
    } : absence));
  };
  return <Card className="bg-white">
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
                  <Label htmlFor="course">Curso</Label>
                  <select id="course" className="w-full p-2 border rounded-md" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                    <option value="">Seleccione curso</option>
                    {COURSES.map(course => <option key={course} value={course}>
                        {course}
                      </option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student">Alumno/a</Label>
                  <select id="student" className="w-full p-2 border rounded-md" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                    <option value="">Seleccione alumno/a</option>
                    {MOCK_STUDENTS.map(student => <option key={student.id} value={student.name}>
                        {student.name}
                      </option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : "Seleccione data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Hora de inicio</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input id="startTime" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Hora de fin</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input id="endTime" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                    </div>
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

        {absences.length > 0 ? <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno/a</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Accións</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absences.map(absence => <TableRow key={absence.id}>
                  <TableCell>{absence.studentName}</TableCell>
                  <TableCell>{format(absence.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{absence.startTime} - {absence.endTime}</TableCell>
                  <TableCell>
                    {absence.justified ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" /> Xustificada
                      </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <X className="w-3 h-3 mr-1" /> Non xustificada
                      </span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={absence.justified} onCheckedChange={() => toggleJustified(absence.id)} />
                      
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table> : <div className="text-center py-8 text-gray-500">
            Non hai faltas de asistencia rexistradas
          </div>}
      </CardContent>
    </Card>;
};
export default AttendanceControl;