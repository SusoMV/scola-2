
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, FolderPlus } from 'lucide-react';
import CoursesGrid from './comedor/CoursesGrid';
import CourseDialog from './comedor/CourseDialog';
import StudentManagementDialog from './comedor/StudentManagementDialog';
import { useComedorState } from './comedor/useComedorState';
import CourseManagementDialog from './comedor/CourseManagementDialog';

const ComedorSection = () => {
  const {
    courses,
    selectedCourse,
    isDialogOpen,
    isManageDialogOpen,
    isCourseManageDialogOpen,
    newStudent,
    editingStudent,
    setIsDialogOpen,
    setIsManageDialogOpen,
    setIsCourseManageDialogOpen,
    setNewStudent,
    setEditingStudent,
    handleCourseClick,
    toggleStudentPresence,
    handleAddStudent,
    handleEditStudent,
    handleSaveEdit,
    handleAddCourse,
    handleRemoveCourse
  } = useComedorState();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Xestión de comedor</h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsCourseManageDialogOpen(true)}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Añadir/eliminar curso
              </Button>
              <Button 
                onClick={() => setIsManageDialogOpen(true)}
                className="bg-scola-primary"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Engadir/Editar comensais
              </Button>
            </div>
          </div>
          
          <CoursesGrid 
            courses={courses} 
            onCourseClick={handleCourseClick} 
          />
        </CardContent>
      </Card>

      {/* Dialog for viewing and managing students in a course */}
      <CourseDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedCourse={selectedCourse}
        onToggleStudentPresence={toggleStudentPresence}
        courses={courses}
      />

      {/* Dialog for adding/editing students */}
      <StudentManagementDialog
        isOpen={isManageDialogOpen}
        onOpenChange={setIsManageDialogOpen}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        courses={courses}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        onAddStudent={handleAddStudent}
        onSaveEdit={handleSaveEdit}
        onEditStudent={handleEditStudent}
      />

      {/* Dialog for adding/removing courses */}
      <CourseManagementDialog
        isOpen={isCourseManageDialogOpen}
        onOpenChange={setIsCourseManageDialogOpen}
        courses={courses}
        onAddCourse={handleAddCourse}
        onRemoveCourse={handleRemoveCourse}
      />
    </div>
  );
};

export default ComedorSection;
