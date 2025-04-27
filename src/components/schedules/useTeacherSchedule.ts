
import { useState } from "react";
import { Teacher, ScheduleData } from "./TeacherSchedule";

interface UseTeacherScheduleProps {
  defaultTeachers: Teacher[];
  defaultHours: string[];
  defaultDays: string[];
}

export const emptySchedule = (hours: string[], days: string[]) => 
  Object.fromEntries(hours.map(hour => [hour, Object.fromEntries(days.map(day => [day, {
    subject: "",
    group: ""
  }]))]));

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
    initialSchedules[teacher.id] = emptySchedule(defaultHours, defaultDays);
  });
  
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, ScheduleData>>(initialSchedules);
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);
  const [editingHours, setEditingHours] = useState<string[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleData>({});

  const handleSelect = (id: string) => setSelectedId(id);

  const handleAddTeacher = () => {
    const name = window.prompt("Nome do novo docente?");
    if (!name) return;
    const id = crypto.randomUUID();
    setTeachers(t => [...t, { id, name }]);
    setTeacherSchedules(ts => ({
      ...ts,
      [id]: emptySchedule(hours, defaultDays)
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
    setHours(hs => [...hs, time]);
    
    // Update all teacher schedules with the new hour
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
    
    // If currently editing, update the editing schedule too
    if (editing) {
      setEditingSchedule(es => ({
        ...es,
        [time]: Object.fromEntries(defaultDays.map(day => [day, {
          subject: "",
          group: ""
        }]))
      }));
    }
  };

  const handleEdit = () => {
    setEditing(true);
    // Make a deep copy of the current teacher's schedule
    const currentSchedule = teacherSchedules[selectedId] || emptySchedule(hours, defaultDays);
    setEditingSchedule(JSON.parse(JSON.stringify(currentSchedule)));
    setEditingHours([...hours]);
  };

  const handleSave = () => {
    const filteredHours = editingHours.map(h => h.trim()).filter(h => !!h);

    const oldSchedule = editingSchedule;
    const newSchedule: ScheduleData = {};
    
    // Ensure each hour has entries for all days
    filteredHours.forEach(hour => {
      if (oldSchedule[hour]) {
        newSchedule[hour] = { ...oldSchedule[hour] };
        
        // Make sure all days are present
        defaultDays.forEach(day => {
          if (!newSchedule[hour][day]) {
            newSchedule[hour][day] = { subject: "", group: "" };
          }
        });
      } else {
        newSchedule[hour] = Object.fromEntries(defaultDays.map(day => [day, { subject: "", group: "" }]));
      }
    });

    setTeacherSchedules(ts => ({
      ...ts,
      [selectedId]: newSchedule
    }));
    setHours(filteredHours);
    setEditing(false);
  };

  const handleHourChange = (idx: number, newHour: string) => {
    setEditingHours(prev => {
      const copy = [...prev];
      copy[idx] = newHour;
      return copy;
    });
    
    setEditingSchedule(prev => {
      const oldHour = editingHours[idx];
      const newSchedule: ScheduleData = {};
      
      // Copy all hours except the one being changed
      Object.keys(prev).forEach(hour => {
        if (hour !== oldHour) {
          newSchedule[hour] = prev[hour];
        }
      });
      
      // Add the hour with the new key
      if (oldHour && prev[oldHour]) {
        newSchedule[newHour] = prev[oldHour];
      } else {
        // If the old hour doesn't exist in the schedule, create a new entry
        newSchedule[newHour] = Object.fromEntries(defaultDays.map(day => [day, { subject: "", group: "" }]));
      }
      
      return newSchedule;
    });
  };

  const handleCellChange = (hour: string, day: string, field: "subject" | "group", value: string) => {
    setEditingSchedule(prev => {
      // Make sure the hour exists
      if (!prev[hour]) {
        prev[hour] = {};
      }
      
      // Make sure the day exists for this hour
      if (!prev[hour][day]) {
        prev[hour][day] = { subject: "", group: "" };
      }
      
      return {
        ...prev,
        [hour]: {
          ...prev[hour],
          [day]: {
            ...prev[hour][day],
            [field]: value
          }
        }
      };
    });
  };

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
