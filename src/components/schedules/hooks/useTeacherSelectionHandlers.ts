
import { Dispatch, SetStateAction } from "react";
import { Teacher, ScheduleData } from "../TeacherSchedule";
import { createDefaultScheduleData } from "../utils/scheduleUtils";

interface UseTeacherSelectionHandlersProps {
  teachers: Teacher[];
  setTeachers: Dispatch<SetStateAction<Teacher[]>>;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  hours: string[];
  defaultDays: string[];
  setTeacherSchedules: Dispatch<SetStateAction<Record<string, ScheduleData>>>;
}

export const useTeacherSelectionHandlers = ({
  teachers,
  setTeachers,
  selectedId,
  setSelectedId,
  hours,
  defaultDays,
  setTeacherSchedules,
}: UseTeacherSelectionHandlersProps) => {
  
  const handleSelect = (id: string) => setSelectedId(id);

  const handleAddTeacher = () => {
    const name = window.prompt("Nome do novo docente?");
    if (!name) return;
    const id = crypto.randomUUID();
    setTeachers(t => [...t, { id, name }]);
    setTeacherSchedules(ts => ({
      ...ts,
      [id]: createDefaultScheduleData(hours, defaultDays)
    }));
    setSelectedId(id);
  };

  const handleDeleteTeacher = (id: string) => {
    if (teachers.length <= 1) {
      window.alert("Debe haber polo menos un docente.");
      return;
    }
    const currentTeacher = teachers.find(t => t.id === id);
    if (!window.confirm(`¿Eliminar a ${currentTeacher?.name}?`)) return;
    setTeachers(t => t.filter(tr => tr.id !== id));
    setSelectedId(t => {
      const idx = teachers.findIndex(tr => tr.id === id);
      if (idx > 0) return teachers[idx - 1].id;
      if (idx === 0 && teachers.length > 1) return teachers[1].id;
      return "";
    });
    setTeacherSchedules(ts => {
      const copy = { ...ts };
      delete copy[id];
      return copy;
    });
  };

  const handleAddHour = () => {
    const time = window.prompt("Nova hora?", "");
    if (!time || hours.includes(time)) return;
    
    // Add the new hour to the hours array
    setTeacherSchedules(ts => {
      const updatedSchedules = { ...ts };
      Object.keys(updatedSchedules).forEach(teacherId => {
        updatedSchedules[teacherId] = {
          ...updatedSchedules[teacherId],
          [time]: Object.fromEntries(defaultDays.map(day => [day, {
            subject: "",
            group: ""
          }]))
        };
      });
      return updatedSchedules;
    });
  };

  return {
    handleSelect,
    handleAddTeacher,
    handleDeleteTeacher,
    handleAddHour
  };
};
