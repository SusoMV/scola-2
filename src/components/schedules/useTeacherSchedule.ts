
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
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, ScheduleData>>({
    "1": emptySchedule(defaultHours, defaultDays),
    "2": emptySchedule(defaultHours, defaultDays)
  });
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
    setHours(hs => [...hs, time]);
    setTeacherSchedules(ts => ({
      ...ts,
      [selectedId]: {
        ...ts[selectedId],
        [time]: Object.fromEntries(defaultDays.map(day => [day, {
          subject: "",
          group: ""
        }]))
      }
    }));
    setEditingSchedule(es => ({
      ...es,
      [time]: Object.fromEntries(defaultDays.map(day => [day, {
        subject: "",
        group: ""
      }]))
    }));
  };

  const handleEdit = () => {
    setEditing(true);
    setEditingSchedule(JSON.parse(JSON.stringify(teacherSchedules[selectedId])));
    setEditingHours([...hours]);
  };

  const handleSave = () => {
    const filteredHours = editingHours.map(h => h.trim()).filter(h => !!h);

    const oldSchedule = editingSchedule;
    const newSchedule: ScheduleData = {};
    filteredHours.forEach(hour => {
      if (oldSchedule[hour]) {
        newSchedule[hour] = oldSchedule[hour];
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
      const copy = { ...prev };
      const oldHour = hours[idx];
      const newCopy: any = {};
      Object.keys(copy).forEach((h, i) => {
        if (i === idx) {
          newCopy[newHour] = copy[h];
        } else {
          newCopy[h] = copy[h];
        }
      });
      return newCopy;
    });
  };

  const handleCellChange = (hour: string, day: string, field: "subject" | "group", value: string) => {
    setEditingSchedule((prev: any) => ({
      ...prev,
      [hour]: {
        ...prev[hour],
        [day]: {
          ...prev[hour][day],
          [field]: value
        }
      }
    }));
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

