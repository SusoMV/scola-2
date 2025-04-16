
import React from 'react';
import { Input } from '@/components/ui/input';
import { TeacherAssignment } from './types/assignment-types';

interface AssignmentCardProps {
  assignment: TeacherAssignment;
  courseIndex: number;
  editMode: boolean;
  onTeacherChange: (courseIndex: number, field: keyof TeacherAssignment, value: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  courseIndex,
  editMode,
  onTeacherChange
}) => {
  const renderTeacherField = (label: string, field: keyof TeacherAssignment, value: string) => {
    return (
      <div className="mb-4">
        <div className="text-[#0070C0] font-medium mb-1">{label}</div>
        <Input
          value={value}
          readOnly={!editMode}
          onChange={(e) => onTeacherChange(courseIndex, field, e.target.value)}
          className={`border ${!editMode ? 'bg-gray-50' : ''}`}
        />
      </div>
    );
  };

  return (
    <div className="border border-[#0070C0] border-dashed rounded-md p-6">
      <h3 className="font-medium text-[#0070C0] text-lg mb-4">
        {assignment.course}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderTeacherField('Titora/Titor', 'tutor', assignment.tutor)}
        {renderTeacherField('Inglés', 'english', assignment.english)}
        {renderTeacherField('Educación Física', 'physicalEd', assignment.physicalEd)}
        {renderTeacherField('Música', 'music', assignment.music)}
        {renderTeacherField('Plástica', 'art', assignment.art)}
        {renderTeacherField('Relixión', 'religion', assignment.religion)}
      </div>
    </div>
  );
};

export default AssignmentCard;
