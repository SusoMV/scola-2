
import React from 'react';
import { GroupData } from './types';
import { Users } from 'lucide-react';

interface StudentGroupCardProps {
  course: string;
  groups: GroupData;
  onClick: (course: string) => void;
}

const StudentGroupCard: React.FC<StudentGroupCardProps> = ({ course, groups, onClick }) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-5 hover:border-[#9b87f5] hover:shadow-md transition-all cursor-pointer bg-white"
      onClick={() => onClick(course)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-[#D3E4FD] p-2 rounded-md mr-3">
            <Users className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{course}</div>
            <div className="text-gray-500 text-sm">
              {groups[course].length} {groups[course].length === 1 ? 'alumno' : 'alumnos'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentGroupCard;
