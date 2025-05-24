
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { COURSES, MOCK_STUDENTS } from './constants';
import { Absence } from './types';

interface AddAbsenceDialogProps {
  onAddAbsence: (absence: Absence) => void;
}

const AddAbsenceDialog: React.FC<AddAbsenceDialogProps> = ({ onAddAbsence }) => {
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

    onAddAbsence(newAbsence);
    toast.success('Falta de asistencia rexistrada');
    setIsDialogOpen(false);
    setSelectedStudent('');
    setSelectedDate(new Date());
    setStartTime('');
    setEndTime('');
  };

  return (
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
            <select 
              id="course" 
              className="w-full p-2 border rounded-md" 
              value={selectedCourse} 
              onChange={e => setSelectedCourse(e.target.value)}
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
                  {student.name}
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
                <Calendar 
                  mode="single" 
                  selected={selectedDate} 
                  onSelect={setSelectedDate} 
                  initialFocus 
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Hora de inicio</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="startTime" 
                  type="time" 
                  value={startTime} 
                  onChange={e => setStartTime(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">Hora de fin</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="endTime" 
                  type="time" 
                  value={endTime} 
                  onChange={e => setEndTime(e.target.value)} 
                />
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
  );
};

export default AddAbsenceDialog;
