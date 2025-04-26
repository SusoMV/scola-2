
import React from "react";
import TeacherControls from "./TeacherControls";
import ScheduleTable from "./ScheduleTable";
import { Button } from "../ui/button";
import { Edit, Save } from "lucide-react";

// Define the types for our component
export interface Teacher {
  id: string;
  name: string;
}

export interface ScheduleCell {
  subject: string;
  group: string;
}

export interface ScheduleData {
  [hour: string]: {
    [day: string]: ScheduleCell;
  };
}

export interface TeacherScheduleProps {
  defaultTeachers?: Teacher[];
  defaultHours?: string[];
  defaultDays?: string[];
}

const defaultTeachers = [{
  id: "1",
  name: "Suso Martínez"
}, {
  id: "2",
  name: "Ana García"
}];
const defaultHours = ["9:40", "10:30", "11:20", "12:10", "12:35", "13:00", "13:45"];
const defaultDays = ["luns", "martes", "mércores", "xoves", "venres"];

export const emptySchedule = (hours: string[], days: string[]) => 
  Object.fromEntries(hours.map(hour => [hour, Object.fromEntries(days.map(day => [day, {
    subject: "",
    group: ""
  }]))]));

const TeacherSchedule: React.FC<TeacherScheduleProps> = ({
  defaultTeachers: initialTeachers = defaultTeachers,
  defaultHours: initialHours = defaultHours,
  defaultDays: initialDays = defaultDays,
}) => {
  const [teachers, setTeachers] = React.useState<Teacher[]>(initialTeachers);
  const [selectedId, setSelectedId] = React.useState(initialTeachers[0].id);
  const [teacherSchedules, setTeacherSchedules] = React.useState<Record<string, ScheduleData>>({
    "1": emptySchedule(initialHours, initialDays),
    "2": emptySchedule(initialHours, initialDays)
  });
  const [editing, setEditing] = React.useState(false);
  const [hours, setHours] = React.useState(initialHours);
  const [editingHours, setEditingHours] = React.useState<string[]>([]);
  const [editingSchedule, setEditingSchedule] = React.useState<ScheduleData>({});

  const handleSelect = (id: string) => setSelectedId(id);

  const handleAddTeacher = () => {
    const name = window.prompt("Nome do novo docente?");
    if (!name) return;
    const id = crypto.randomUUID();
    setTeachers(t => [...t, { id, name }]);
    setTeacherSchedules(ts => ({
      ...ts,
      [id]: emptySchedule(hours, initialDays)
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

  const scheduleToShow = editing ? editingSchedule : teacherSchedules[selectedId];
  const hoursToShow = editing ? editingHours : hours;

  return (
    <div className="rounded-lg bg-white p-8">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-black mb-6 flex-1">Horarios docentes</h2>
      </div>

      <div className="flex items-center mb-8 gap-3 justify-between my-0 py-[2px]">
        <TeacherControls
          teachers={teachers}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAdd={handleAddTeacher}
          onDelete={handleDeleteTeacher}
          disabled={editing}
        />
        <Button 
          size="lg" 
          onClick={editing ? handleSave : handleEdit} 
          className="bg-scola-primary text-white text-base font-semibold hover:bg-scola-primary-dark px-[18px] py-0 flex items-center gap-2"
        >
          {editing ? (
            <>
              <Save className="w-5 h-5" />
              Gardar
            </>
          ) : (
            <>
              <Edit className="w-5 h-5" />
              Editar horario
            </>
          )}
        </Button>
      </div>

      <ScheduleTable
        days={defaultDays}
        hours={hoursToShow}
        schedule={scheduleToShow}
        editing={editing}
        onHourChange={handleHourChange}
        onCellChange={handleCellChange}
        onAddHour={handleAddHour}
      />
    </div>
  );
};

export default TeacherSchedule;
