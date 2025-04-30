
import { useState } from "react";
import { Teacher, ScheduleData } from "./TeacherSchedule";
import { createDefaultScheduleData } from "./utils/scheduleUtils";

interface UseTeacherScheduleProps {
  defaultTeachers: Teacher[];
  defaultHours: string[];
  defaultDays: string[];
}

export const useTeacherSchedule = ({
  defaultTeachers,
  defaultHours,
  defaultDays
}: UseTeacherScheduleProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [selectedId, setSelectedId] = useState(defaultTeachers[0].id);
  
  // Initialize teacher schedules for all default teachers
  const initialSchedules: Record<string, ScheduleData> = {};
  defaultTeachers.forEach(teacher => {
    initialSchedules[teacher.id] = createDefaultScheduleData(defaultHours, defaultDays);
  });
  
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, ScheduleData>>(initialSchedules);
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);
  const [editingHours, setEditingHours] = useState<string[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleData>({});

  // Handler functions will be imported from separate files
  const { 
    handleSelect,
    handleAddTeacher,
    handleDeleteTeacher,
    handleAddHour
  } = useTeacherSelectionHandlers({
    teachers,
    setTeachers,
    selectedId,
    setSelectedId,
    hours,
    defaultDays,
    setTeacherSchedules
  });

  const {
    handleEdit,
    handleSave,
    handleHourChange,
    handleCellChange
  } = useScheduleEditHandlers({
    editing,
    setEditing,
    selectedId,
    teacherSchedules,
    setTeacherSchedules,
    hours, 
    setHours,
    defaultDays,
    editingHours,
    setEditingHours,
    editingSchedule,
    setEditingSchedule
  });

  return {
    teachers,
    selectedId,
    teacherSchedules,
    editing,
    hours,
    editingHours,
    editingSchedule,
    handleSelect,
    handleAddTeacher,
    handleDeleteTeacher,
    handleAddHour,
    handleEdit,
    handleSave,
    handleHourChange,
    handleCellChange
  };
};

// Import the handler hooks
import { useTeacherSelectionHandlers } from './hooks/useTeacherSelectionHandlers';
import { useScheduleEditHandlers } from './hooks/useScheduleEditHandlers';
