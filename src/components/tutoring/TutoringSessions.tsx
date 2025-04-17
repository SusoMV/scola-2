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
import { CalendarIcon, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

const COURSES = [
  "4º Infantil",
  "5º Infantil",
  "6º Infantil",
  "1º Primaria",
  "2º Primaria",
  "3º Primaria",
  "4º Primaria",
  "5º Primaria",
  "6º Primaria"
];

const MOCK_STUDENTS = [{
  id: 1,
  name: 'Ana García',
  family: 'García Fernández'
}, {
  id: 2,
  name: 'Carlos Rodríguez',
  family: 'Rodríguez Martínez'
}, {
  id: 3,
  name: 'María López',
  family: 'López Sánchez'
}, {
  id: 4,
  name: 'David Fernández',
  family: 'Fernández Pérez'
}, {
  id: 5,
  name: 'Laura Martínez',
  family: 'Martínez López'
}];

interface TutoringSession {
  id: number;
  studentId: number;
  studentName: string;
  family: string;
  date: Date;
  time: string;
  topics: string;
}

const TutoringSessions = () => {
  const [sessions, setSessions] = useState<TutoringSession[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [topics, setTopics] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleAddSession = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || !topics) {
      toast.error('Por favor, complete todos os campos obrigatorios');
      return;
    }
    const selectedStudentObject = MOCK_STUDENTS.find(student => student.name === selectedStudent);
    if (!selectedStudentObject) {
      toast.error('Estudante non atopado');
      return;
    }
    const newSession: TutoringSession = {
      id: Date.now(),
      studentId: selectedStudentObject.id,
      studentName: selectedStudentObject.name,
      family: selectedStudentObject.family,
      date: selectedDate,
      time: selectedTime,
      topics: topics
    };
    setSessions([...sessions, newSession]);
    toast.success('Titoría solicitada con éxito');
    setIsDialogOpen(false);

    setSelectedStudent('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setTopics('');
  };

  return <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Titorías solicitadas</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scola-primary">Engadir titoría</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar nova titoría</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
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
                  <Label htmlFor="course">Curso</Label>
                  <select 
                    id="course"
                    className="w-full p-2 border rounded-md"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Seleccione curso</option>
                    {COURSES.map(course => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
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

                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <Input id="time" type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topics">Asuntos a tratar</Label>
                  <Textarea id="topics" placeholder="Introduza os asuntos a tratar na titoría" value={topics} onChange={e => setTopics(e.target.value)} rows={4} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleAddSession}>Gardar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {sessions.length > 0 ? <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Familia</TableHead>
                <TableHead>Alumno/a</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Asuntos a tratar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map(session => <TableRow key={session.id}>
                  <TableCell>{session.family}</TableCell>
                  <TableCell>{session.studentName}</TableCell>
                  <TableCell>{format(session.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={session.topics}>
                      {session.topics}
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table> : <div className="text-center py-8 text-gray-500">
            Non hai titorías solicitadas
          </div>}
      </CardContent>
    </Card>;
};

export default TutoringSessions;
