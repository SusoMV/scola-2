
import React from 'react';
import { Button } from '@/components/ui/button';
import { CourseData } from './types';

interface CoursesGridProps {
  courses: CourseData[];
  onCourseClick: (course: CourseData) => void;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, onCourseClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map((course) => {
        // Count students who are present, divided into allergic and non-allergic
        const presentStudents = course.students.filter(s => s.isPresent);
        const regularStudents = presentStudents.filter(s => !s.hasAllergies).length;
        const allergicStudents = presentStudents.filter(s => s.hasAllergies).length;
        
        return (
          <Button
            key={course.name}
            variant="outline"
            className="h-auto p-4 flex flex-col gap-2 border border-dashed border-[#0070C0] hover:bg-gray-50"
            onClick={() => onCourseClick(course)}
          >
            <span className="font-semibold">{course.name}</span>
            <div className="flex justify-center w-full gap-2">
              <div className="text-xl font-bold">{regularStudents}</div>
              <div className="text-xl font-bold bg-amber-100 px-2 rounded-md">
                {allergicStudents}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default CoursesGrid;
