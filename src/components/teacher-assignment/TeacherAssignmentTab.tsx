
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTeacherAssignments } from './hooks/useTeacherAssignments';
import CourseCard from './CourseCard';
import AddAssignmentDialog from './AddAssignmentDialog';
import { Plus, Edit, Save, X } from 'lucide-react';

const TeacherAssignmentTab: React.FC = () => {
  const {
    assignments,
    editMode,
    openAddDialog,
    setEditMode,
    setOpenAddDialog,
    handleChange,
    handleSave,
    cancelEdit,
    handleAddAssignment,
    handleDeleteAssignment
  } = useTeacherAssignments();

  return <div className="space-y-4">
      <div className="flex justify-end items-center gap-2">
        <Button 
          onClick={() => setOpenAddDialog(true)} 
          className="bg-scola-primary hover:bg-scola-primary-dark text-white px-2" 
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Engadir
        </Button>
        {editMode ? <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={cancelEdit} 
              className="border-scola-primary text-scola-primary hover:bg-scola-pastel px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave} 
              className="bg-scola-primary hover:bg-scola-primary-dark text-white px-2"
            >
              <Save className="h-4 w-4 mr-1" />
              Gardar
            </Button>
          </> : <Button 
            size="sm" 
            onClick={() => setEditMode(true)} 
            className="bg-scola-primary hover:bg-scola-primary-dark text-white px-2"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>}
      </div>

      <div className="mt-6 space-y-6">
        {assignments.map((assignment, courseIndex) => (
          <CourseCard 
            key={assignment.course} 
            assignment={assignment} 
            courseIndex={courseIndex} 
            editMode={editMode} 
            onTeacherChange={handleChange} 
            onDelete={handleDeleteAssignment} 
          />
        ))}
      </div>
      
      <AddAssignmentDialog 
        open={openAddDialog} 
        onOpenChange={setOpenAddDialog} 
        onAddAssignment={handleAddAssignment} 
      />
    </div>;
};

export default TeacherAssignmentTab;
