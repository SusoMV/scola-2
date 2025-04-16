
import React from 'react';
import { TeacherAssignment } from './types/assignment-types';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
  assignment: TeacherAssignment;
  courseIndex: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  assignment
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center mb-4">
        <div className="bg-[#D3E4FD] p-2 rounded-md mr-3">
          <BookOpen className="h-5 w-5 text-[#9b87f5]" />
        </div>
        <h3 className="font-medium text-gray-900">
          {assignment.course}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Titora/Titor</p>
          <p className="text-sm text-gray-900">{assignment.tutor}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Inglés</p>
          <p className="text-sm text-gray-900">{assignment.english}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Educación Física</p>
          <p className="text-sm text-gray-900">{assignment.physicalEd}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Música</p>
          <p className="text-sm text-gray-900">{assignment.music}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Plástica</p>
          <p className="text-sm text-gray-900">{assignment.art}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Relixión</p>
          <p className="text-sm text-gray-900">{assignment.religion}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
