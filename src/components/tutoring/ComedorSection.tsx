
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, UserPlus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// Types for our data structures
interface Student {
  id: number;
  name: string;
  course: string;
  hasAllergies: boolean;
  allergyDetails?: string;
  isPresent: boolean;
}

interface CourseData {
  name: string;
  totalStudents: number;
  allergicStudents: number;
  students: Student[];
}

const ComedorSection = () => {
  // Initial course data for demonstration
  const initialCourses: CourseData[] = [
    { 
      name: "4º Infantil", 
      totalStudents: 10, 
      allergicStudents: 2,
      students: [
        { id: 1, name: "Ana Pérez", course: "4º Infantil", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
        { id: 2, name: "Marcos López", course: "4º Infantil", hasAllergies: false, isPresent: true },
        { id: 3, name: "Laura Rodríguez", course: "4º Infantil", hasAllergies: false, isPresent: true },
        { id: 4, name: "David García", course: "4º Infantil", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
      ]
    },
    { 
      name: "5º Infantil", 
      totalStudents: 8, 
      allergicStudents: 1,
      students: [
        { id: 5, name: "Carlos Vázquez", course: "5º Infantil", hasAllergies: false, isPresent: true },
        { id: 6, name: "Elena Fernández", course: "5º Infantil", hasAllergies: true, allergyDetails: "Gluten", isPresent: true },
      ]
    },
    { 
      name: "6º Infantil", 
      totalStudents: 12, 
      allergicStudents: 3,
      students: [
        { id: 7, name: "Pablo Martínez", course: "6º Infantil", hasAllergies: true, allergyDetails: "Mariscos", isPresent: true },
        { id: 8, name: "Sofía González", course: "6º Infantil", hasAllergies: true, allergyDetails: "Huevos", isPresent: true },
        { id: 9, name: "Mario Alonso", course: "6º Infantil", hasAllergies: true, allergyDetails: "Soja", isPresent: true },
      ]
    },
    { 
      name: "1º Primaria", 
      totalStudents: 15, 
      allergicStudents: 2,
      students: [
        { id: 10, name: "Lucía Castro", course: "1º Primaria", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
        { id: 11, name: "Hugo Sánchez", course: "1º Primaria", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
      ]
    },
    { 
      name: "2º Primaria", 
      totalStudents: 14, 
      allergicStudents: 1,
      students: [
        { id: 12, name: "Carla Díaz", course: "2º Primaria", hasAllergies: true, allergyDetails: "Pescado", isPresent: true },
      ]
    },
    { 
      name: "3º Primaria", 
      totalStudents: 16, 
      allergicStudents: 4,
      students: [
        { id: 13, name: "Daniel Torres", course: "3º Primaria", hasAllergies: true, allergyDetails: "Lactosa", isPresent: true },
        { id: 14, name: "Sara Romero", course: "3º Primaria", hasAllergies: true, allergyDetails: "Frutos secos", isPresent: true },
        { id: 15, name: "Adrián Varela", course: "3º Primaria", hasAllergies: true, allergyDetails: "Pescado", isPresent: true },
        { id: 16, name: "Marta Blanco", course: "3º Primaria", hasAllergies: true, allergyDetails: "Gluten", isPresent: true },
      ]
    },
  ];

  // State variables
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    course: '',
    hasAllergies: false,
    allergyDetails: '',
    isPresent: true
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Load data on component mount and reset counters if it's a new day
  useEffect(() => {
    // Get the stored date and student data
    const lastDate = localStorage.getItem('comedor_last_date');
    const storedCourses = localStorage.getItem('comedor_courses');
    const today = new Date().toDateString();

    if (lastDate !== today) {
      // Reset attendance for a new day
      const resetCourses = courses.map(course => ({
        ...course,
        students: course.students.map(student => ({
          ...student,
          isPresent: true
        }))
      }));
      
      setCourses(resetCourses);
      localStorage.setItem('comedor_last_date', today);
      localStorage.setItem('comedor_courses', JSON.stringify(resetCourses));
    } else if (storedCourses) {
      // Load saved data if it's the same day
      setCourses(JSON.parse(storedCourses));
    } else {
      // Initialize data for the first time
      localStorage.setItem('comedor_last_date', today);
      localStorage.setItem('comedor_courses', JSON.stringify(courses));
    }
  }, []);

  // Save data whenever courses change
  useEffect(() => {
    localStorage.setItem('comedor_courses', JSON.stringify(courses));
  }, [courses]);

  // Handle opening course dialog
  const handleCourseClick = (course: CourseData) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // Handle toggling student presence
  const toggleStudentPresence = (courseIndex: number, studentId: number) => {
    const updatedCourses = [...courses];
    const courseStudents = [...updatedCourses[courseIndex].students];
    
    const studentIndex = courseStudents.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
      courseStudents[studentIndex] = {
        ...courseStudents[studentIndex],
        isPresent: !courseStudents[studentIndex].isPresent
      };
    }

    // Update total and allergic counters
    const presentStudents = courseStudents.filter(s => s.isPresent);
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      students: courseStudents,
      totalStudents: presentStudents.length,
      allergicStudents: presentStudents.filter(s => s.hasAllergies).length
    };
    
    setCourses(updatedCourses);
    toast.success(`Estado de asistencia actualizado`);
  };

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.course) {
      toast.error("Por favor, completa os campos obrigatorios");
      return;
    }

    const courseIndex = courses.findIndex(c => c.name === newStudent.course);
    if (courseIndex === -1) {
      toast.error("Curso non válido");
      return;
    }

    const updatedCourses = [...courses];
    const newId = Math.max(0, ...courses.flatMap(c => c.students.map(s => s.id))) + 1;
    
    const studentToAdd = {
      id: newId,
      name: newStudent.name,
      course: newStudent.course,
      hasAllergies: newStudent.hasAllergies || false,
      allergyDetails: newStudent.hasAllergies ? newStudent.allergyDetails || '' : '',
      isPresent: true
    };

    updatedCourses[courseIndex].students.push(studentToAdd);
    
    // Recalculate counters
    const presentStudents = updatedCourses[courseIndex].students.filter(s => s.isPresent);
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      totalStudents: presentStudents.length,
      allergicStudents: presentStudents.filter(s => s.hasAllergies).length
    };

    setCourses(updatedCourses);
    setNewStudent({
      name: '',
      course: '',
      hasAllergies: false,
      allergyDetails: '',
      isPresent: true
    });
    toast.success("Alumno engadido correctamente");
  };

  // Handle editing a student
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      course: student.course,
      hasAllergies: student.hasAllergies,
      allergyDetails: student.allergyDetails || '',
      isPresent: student.isPresent
    });
  };

  // Handle saving edited student
  const handleSaveEdit = () => {
    if (!editingStudent || !newStudent.name || !newStudent.course) {
      return;
    }

    const updatedCourses = [...courses];
    
    // Find the student in the original course
    let originalCourseIndex = -1;
    let studentIndex = -1;
    
    for (let i = 0; i < updatedCourses.length; i++) {
      const foundIndex = updatedCourses[i].students.findIndex(s => s.id === editingStudent.id);
      if (foundIndex !== -1) {
        originalCourseIndex = i;
        studentIndex = foundIndex;
        break;
      }
    }

    if (originalCourseIndex === -1 || studentIndex === -1) {
      toast.error("Estudante non atopado");
      return;
    }

    const targetCourseIndex = courses.findIndex(c => c.name === newStudent.course);
    if (targetCourseIndex === -1) {
      toast.error("Curso de destino non válido");
      return;
    }

    // Create updated student object
    const updatedStudent = {
      id: editingStudent.id,
      name: newStudent.name,
      course: newStudent.course,
      hasAllergies: newStudent.hasAllergies || false,
      allergyDetails: newStudent.hasAllergies ? newStudent.allergyDetails || '' : '',
      isPresent: newStudent.isPresent || true
    };

    if (originalCourseIndex === targetCourseIndex) {
      // Just update the student in the same course
      updatedCourses[originalCourseIndex].students[studentIndex] = updatedStudent;
    } else {
      // Remove from original course and add to new course
      updatedCourses[originalCourseIndex].students.splice(studentIndex, 1);
      updatedCourses[targetCourseIndex].students.push(updatedStudent);
    }

    // Recalculate counters for both courses
    for (const idx of [originalCourseIndex, targetCourseIndex]) {
      const presentStudents = updatedCourses[idx].students.filter(s => s.isPresent);
      updatedCourses[idx] = {
        ...updatedCourses[idx],
        totalStudents: presentStudents.length,
        allergicStudents: presentStudents.filter(s => s.hasAllergies).length
      };
    }

    setCourses(updatedCourses);
    setEditingStudent(null);
    setNewStudent({
      name: '',
      course: '',
      hasAllergies: false,
      allergyDetails: '',
      isPresent: true
    });
    toast.success("Estudante actualizado correctamente");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Xestión de comedor</h2>
        <Button 
          onClick={() => setIsManageDialogOpen(true)}
          className="bg-scola-primary"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Engadir/Editar comensais
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course, index) => (
              <Button
                key={course.name}
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2 border-2 hover:bg-gray-50"
                onClick={() => handleCourseClick(course)}
              >
                <span className="font-semibold">{course.name}</span>
                <div className="flex justify-center w-full gap-2">
                  <div className="text-xl font-bold">{course.totalStudents}</div>
                  <div className="text-xl font-bold bg-amber-100 px-2 rounded-md">
                    {course.allergicStudents}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for viewing and managing students in a course */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Comensais de {selectedCourse?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[500px] overflow-y-auto">
            {selectedCourse && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Alerxias</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead>Accións</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourse.students.map((student) => {
                    const courseIndex = courses.findIndex(c => c.name === selectedCourse.name);
                    return (
                      <TableRow 
                        key={student.id}
                        className={student.hasAllergies ? "bg-amber-50" : ""}
                      >
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>
                          {student.hasAllergies ? (
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                              <span>{student.allergyDetails}</span>
                            </div>
                          ) : 'Non'}
                        </TableCell>
                        <TableCell>
                          {student.isPresent ? 'Presente' : 'Ausente'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`${student.isPresent ? 'text-green-600' : 'text-gray-400'}`}
                              onClick={() => toggleStudentPresence(courseIndex, student.id)}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Pechar</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding/editing students */}
      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? 'Editar comensal' : 'Engadir novo comensal'}
            </DialogTitle>
          </DialogHeader>
          
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
                {courses.map((course) => (
                  <option key={course.name} value={course.name}>{course.name}</option>
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
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setEditingStudent(null);
                setNewStudent({
                  name: '',
                  course: '',
                  hasAllergies: false,
                  allergyDetails: '',
                  isPresent: true
                });
                setIsManageDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={editingStudent ? handleSaveEdit : handleAddStudent}
              className="bg-scola-primary"
            >
              {editingStudent ? 'Gardar cambios' : 'Engadir'}
            </Button>
          </div>

          {/* Show existing students list for editing */}
          <div className="mt-4 max-h-[300px] overflow-y-auto">
            <h3 className="text-sm font-semibold mb-2">Comensais existentes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Accións</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.flatMap(course => 
                  course.students.map(student => (
                    <TableRow key={student.id} className={student.hasAllergies ? "bg-amber-50" : ""}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditStudent(student)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComedorSection;
