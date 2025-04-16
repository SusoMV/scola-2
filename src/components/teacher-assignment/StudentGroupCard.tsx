
import React from 'react';
import { GroupData } from './types';

interface StudentGroupCardProps {
  course: string;
  groups: GroupData;
  onClick: (course: string) => void;
}

const StudentGroupCard: React.FC<StudentGroupCardProps> = ({ course, groups, onClick }) => {
  return (
    <div 
      className="border border-[#0070C0] border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-scola-pastel transition-colors"
      onClick={() => onClick(course)}
    >
      <div className="text-[#0070C0] font-medium mb-1">{course}</div>
      <div className="text-gray-500 text-xs">
        {groups[course].length} {groups[course].length === 1 ? 'alumno' : 'alumnos'}
      </div>
    </div>
  );
};

export default StudentGroupCard;
