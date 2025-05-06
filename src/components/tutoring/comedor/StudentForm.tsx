
import React from 'react';
import { Button } from '@/components/ui/button';
import { Student } from './types';

interface StudentFormProps {
  newStudent: Partial<Student>;
  setNewStudent: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  editingStudent: Student | null;
  onSave: () => void;
  onCancel: () => void;
  courses: string[];
}

const StudentForm: React.FC<StudentFormProps> = ({
  newStudent,
  setNewStudent,
  editingStudent,
  onSave,
  onCancel,
  courses,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome completo
        </label>
        <input
          id="name"
          className="w-full p-2 border rounded-md"
          value={newStudent.name}
          onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="course" className="text-sm font-medium">
          Curso
        </label>
        <select
          id="course"
          className="w-full p-2 border rounded-md"
          value={newStudent.course}
          onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
        >
          <option value="">Selecciona un curso</option>
          {courses.map((courseName) => (
            <option key={courseName} value={courseName}>{courseName}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hasAllergies"
          checked={newStudent.hasAllergies}
          onChange={(e) => setNewStudent({...newStudent, hasAllergies: e.target.checked})}
          className="h-4 w-4"
        />
        <label htmlFor="hasAllergies" className="text-sm font-medium">
          Ten alerxias
        </label>
      </div>

      {newStudent.hasAllergies && (
        <div className="space-y-2">
          <label htmlFor="allergyDetails" className="text-sm font-medium">
            Descrición das alerxias
          </label>
          <input
            id="allergyDetails"
            className="w-full p-2 border rounded-md"
            value={newStudent.allergyDetails}
            onChange={(e) => setNewStudent({...newStudent, allergyDetails: e.target.value})}
            placeholder="Ex: Lactosa, Frutos secos..."
          />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          onClick={onSave}
          className="bg-scola-primary"
        >
          {editingStudent ? 'Gardar cambios' : 'Engadir'}
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
