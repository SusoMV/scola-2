
import React, { useState } from "react";
import FacultyDropdown from "../schedules/FacultyDropdown";
import { ScheduleGrid } from "../schedules/ScheduleGrid";
import { Button } from "../ui/button";

const defaultTeachers = [
  { id: "1", name: "Ana García Martínez" },
  { id: "2", name: "Manuel López Fernández" },
];

const defaultHours = [
  "9:40", "10:30", "11:20", "12:10", "12:35", "13:00", "13:45"
];

const defaultDays = ["Luns", "Martes", "Mércores", "Xoves", "Venres"];

const emptySchedule = () =>
  Object.fromEntries(
    defaultHours.map(hour => [
      hour,
      Object.fromEntries(defaultDays.map(day => [day, { subject: "", group: "" }])),
    ])
  );

const DocumentUploader = () => {
  const [teachers, setTeachers] = useState(defaultTeachers);
  const [selectedId, setSelectedId] = useState(defaultTeachers[0].id);
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, any>>({
    "1": emptySchedule(),
    "2": emptySchedule(),
  });
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);

  const handleSelect = (id: string) => setSelectedId(id);

  const handleAddTeacher = () => {
    const name = window.prompt("Nome do novo docente?");
    if (!name) return;
    const id = crypto.randomUUID();
    setTeachers((t) => [...t, { id, name }]);
    setTeacherSchedules((ts) => ({ ...ts, [id]: emptySchedule() }));
    setSelectedId(id);
  };

  const handleDeleteTeacher = (id: string) => {
    if (teachers.length <= 1) {
      window.alert("Debe haber polo menos un docente.");
      return;
    }
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

  const handleSlotChange = (hour: string, day: string, value: { subject: string; group: string }) => {
    setTeacherSchedules(ts => ({
      ...ts,
      [selectedId]: {
        ...ts[selectedId],
        [hour]: {
          ...ts[selectedId][hour],
          [day]: value,
        }
      },
    }));
  };

  const handleAddHour = () => {
    const time = window.prompt("Nova hora?", "");
    if (!time || hours.includes(time)) return;
    setHours(hs => [...hs, time]);
    setTeacherSchedules(ts => ({
      ...ts,
      [selectedId]: {
        ...ts[selectedId],
        [time]: Object.fromEntries(defaultDays.map(day => [day, { subject: "", group: "" }])),
      }
    }));
  };

  const handleSave = () => {
    setEditing(false);
    window.alert("Cambios gardados!");
  };

  return (
    <div className="shadow-sm border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="text-xl font-bold mb-6 text-scola-primary">Horarios docentes</h3>
      <div className="flex items-center justify-between mb-4">
        <FacultyDropdown
          teachers={teachers}
          selectedId={selectedId}
          onSelect={handleSelect}
          onAdd={handleAddTeacher}
          onDelete={handleDeleteTeacher}
        />
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)}>Editar horario</Button>
        ) : (
          <Button variant="default" onClick={handleSave}>Gardar</Button>
        )}
      </div>
      <ScheduleGrid
        schedule={teacherSchedules[selectedId]}
        hours={hours}
        days={defaultDays}
        editing={editing}
        onSlotChange={handleSlotChange}
        onAddHour={handleAddHour}
      />
    </div>
  );
};

export default DocumentUploader;
