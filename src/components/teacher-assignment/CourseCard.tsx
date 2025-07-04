
import React from 'react';
import TeacherSelector from './TeacherSelector';
import { TeacherAssignment } from './types/assignment-types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  assignment: TeacherAssignment;
  courseIndex: number;
  editMode: boolean;
  onTeacherChange: (courseIndex: number, field: keyof TeacherAssignment, value: string) => void;
  onDelete: (courseIndex: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  assignment,
  courseIndex,
  editMode,
  onTeacherChange,
  onDelete
}) => {
  return (
    <div className="border border-dashed border-scola-primary rounded-md p-4 relative bg-white hover:bg-scola-pastel hover:border-solid transition-all duration-200">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-medium text-scola-primary text-lg">
          {assignment.course}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(courseIndex)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <TeacherSelector
            label="Titora/Titor"
            value={assignment.tutor}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'tutor', value)}
          />
        </div>
        
        <div>
          <TeacherSelector
            label="Inglés"
            value={assignment.english}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'english', value)}
          />
        </div>
        
        <div>
          <TeacherSelector
            label="Educación Física"
            value={assignment.physicalEd}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'physicalEd', value)}
          />
        </div>
        
        <div>
          <TeacherSelector
            label="Música"
            value={assignment.music}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'music', value)}
          />
        </div>
        
        <div>
          <TeacherSelector
            label="Plástica"
            value={assignment.art}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'art', value)}
          />
        </div>
        
        <div>
          <TeacherSelector
            label="Relixión"
            value={assignment.religion}
            editMode={editMode}
            onChange={(value) => onTeacherChange(courseIndex, 'religion', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
