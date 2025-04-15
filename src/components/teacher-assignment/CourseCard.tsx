
import React from 'react';
import TeacherSelector from './TeacherSelector';
import { TeacherAssignment } from './types/assignment-types';

interface CourseCardProps {
  assignment: TeacherAssignment;
  courseIndex: number;
  editMode: boolean;
  onTeacherChange: (courseIndex: number, field: keyof TeacherAssignment, value: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  assignment,
  courseIndex,
  editMode,
  onTeacherChange
}) => {
  return (
    <div className="border border-[#0070C0] border-dashed rounded-md p-4">
      <h3 className="font-medium text-[#0070C0] mb-4 text-sm md:text-base">
        {assignment.course}
      </h3>
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
