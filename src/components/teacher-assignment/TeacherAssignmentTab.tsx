
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Define teacher assignment type
interface TeacherAssignment {
  course: string;
  tutor: string;
  english: string;
  physicalEd: string;
  music: string;
  art: string;
  religion: string;
}

// Sample data - in a real app, this would come from your database
const initialAssignments: TeacherAssignment[] = [
  {
    course: '4º Infantil',
    tutor: 'Ana García Martínez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Ana García Martínez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '5º Infantil',
    tutor: 'Carmen Rodríguez Vázquez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Carmen Rodríguez Vázquez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '6º Infantil',
    tutor: 'Elena Sánchez Gómez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Elena Sánchez Gómez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '1º Primaria',
    tutor: 'Manuel López Fernández',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Manuel López Fernández',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '2º Primaria',
    tutor: 'David Pérez Santos',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'David Pérez Santos',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '3º Primaria',
    tutor: 'Ana García Martínez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Ana García Martínez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '4º Primaria',
    tutor: 'Carmen Rodríguez Vázquez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Carmen Rodríguez Vázquez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '5º Primaria',
    tutor: 'Elena Sánchez Gómez',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Elena Sánchez Gómez',
    religion: 'Elena Sánchez Gómez'
  },
  {
    course: '6º Primaria',
    tutor: 'Manuel López Fernández',
    english: 'David Pérez Santos',
    physicalEd: 'Manuel López Fernández',
    music: 'Carmen Rodríguez Vázquez',
    art: 'Manuel López Fernández',
    religion: 'Elena Sánchez Gómez'
  }
];

// Sample faculty for dropdown
const facultyMembers = [
  'Ana García Martínez',
  'Manuel López Fernández',
  'Carmen Rodríguez Vázquez',
  'David Pérez Santos',
  'Elena Sánchez Gómez'
];

const TeacherAssignmentTab: React.FC = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(initialAssignments);
  const [editMode, setEditMode] = useState(false);
  const isMobile = useIsMobile();

  // In a real app, you would fetch this data from the database
  useEffect(() => {
    // Simulating data loading
    const loadedData = localStorage.getItem('teacher_assignments');
    if (loadedData) {
      try {
        setAssignments(JSON.parse(loadedData));
      } catch (e) {
        console.error('Error loading teacher assignments', e);
        setAssignments(initialAssignments);
      }
    }
  }, []);

  const handleChange = (courseIndex: number, field: keyof TeacherAssignment, value: string) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[courseIndex] = {
      ...updatedAssignments[courseIndex],
      [field]: value
    };
    setAssignments(updatedAssignments);
  };

  const handleSave = () => {
    // In a real app, you would send this data to your API
    localStorage.setItem('teacher_assignments', JSON.stringify(assignments));
    setEditMode(false);
    toast.success('Adscrición docente gardada correctamente');
  };

  const renderTeacherSelect = (
    courseIndex: number, 
    field: keyof TeacherAssignment, 
    label: string
  ) => {
    const value = assignments[courseIndex][field];
    
    return editMode ? (
      <div className="space-y-1">
        <Label className="text-xs md:text-sm font-medium text-gray-700">{label}</Label>
        <Select
          value={value}
          onValueChange={(newValue) => handleChange(courseIndex, field, newValue)}
        >
          <SelectTrigger className="w-full h-8 text-xs md:text-sm">
            <SelectValue placeholder={`Seleccionar ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {facultyMembers.map((teacher) => (
              <SelectItem key={teacher} value={teacher} className="text-xs md:text-sm">
                {teacher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ) : (
      <div className="space-y-1">
        <Label className="text-xs md:text-sm font-medium text-gray-700">{label}</Label>
        <Input 
          value={value} 
          readOnly 
          className="h-8 text-xs md:text-sm bg-gray-50" 
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        {editMode ? (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setAssignments(initialAssignments);
                setEditMode(false);
              }}
              className="text-xs md:text-sm"
            >
              Cancelar
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="text-xs md:text-sm"
            >
              Gardar cambios
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            onClick={() => setEditMode(true)}
            className="text-xs md:text-sm"
          >
            Editar adscrición
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {assignments.map((assignment, courseIndex) => (
          <Card key={assignment.course} className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-medium text-scola-primary mb-3 text-sm md:text-base">
                {assignment.course}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderTeacherSelect(courseIndex, 'tutor', 'Titora/Titor')}
                {renderTeacherSelect(courseIndex, 'english', 'Inglés')}
                {renderTeacherSelect(courseIndex, 'physicalEd', 'Educación Física')}
                {renderTeacherSelect(courseIndex, 'music', 'Música')}
                {renderTeacherSelect(courseIndex, 'art', 'Plástica')}
                {renderTeacherSelect(courseIndex, 'religion', 'Relixión')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherAssignmentTab;
