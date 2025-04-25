import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
const defaultTeachers = [{
  id: "1",
  name: "Suso Martínez"
}, {
  id: "2",
  name: "Ana García"
}];
const defaultHours = ["9:40", "10:30", "11:20", "12:10", "12:35", "13:00", "13:45"];
const defaultDays = ["luns", "martes", "mércores", "xoves", "venres"];
const emptySchedule = () => Object.fromEntries(defaultHours.map(hour => [hour, Object.fromEntries(defaultDays.map(day => [day, {
  subject: "",
  group: ""
}]))]));
const DocumentUploader = () => {
  const [teachers, setTeachers] = useState(defaultTeachers);
  const [selectedId, setSelectedId] = useState(defaultTeachers[0].id);
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, any>>({
    "1": emptySchedule(),
    "2": emptySchedule()
  });
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value);
  const handleAddTeacher = () => {
    const name = window.prompt("Nome do novo docente?");
    if (!name) return;
    const id = crypto.randomUUID();
    setTeachers(t => [...t, {
      id,
      name
    }]);
    setTeacherSchedules(ts => ({
      ...ts,
      [id]: emptySchedule()
    }));
    setSelectedId(id);
  };
  const handleDeleteTeacher = () => {
    if (teachers.length <= 1) {
      window.alert("Debe haber polo menos un docente.");
      return;
    }
    const currentTeacher = teachers.find(t => t.id === selectedId);
    if (!window.confirm(`¿Eliminar a ${currentTeacher?.name}?`)) return;
    setTeachers(t => t.filter(tr => tr.id !== selectedId));
    setSelectedId(t => {
      const idx = teachers.findIndex(tr => tr.id === selectedId);
      if (idx > 0) return teachers[idx - 1].id;
      if (idx === 0 && teachers.length > 1) return teachers[1].id;
      return "";
    });
    setTeacherSchedules(ts => {
      const copy = {
        ...ts
      };
      delete copy[selectedId];
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
  };
  return <div className="rounded-lg bg-white p-8">
      {/* Título */}
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-black mb-6 flex-1">Horarios docentes</h2>
      </div>

      {/* Barra superior: Dropdown, +, Papelera, Editar */}
      <div className="flex items-center mb-8 gap-3 justify-between">
        <div className="flex items-center gap-2">
          <select className="border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-scola-primary bg-white min-w-[180px]" value={selectedId} onChange={handleSelect}>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <Button size="sm" variant="outline" className="border-scola-primary text-scola-primary" onClick={handleAddTeacher} title="Engadir docente">
            <Plus className="w-5 h-5" />
          </Button>
          <Button size="sm" variant="outline" className="border-transparent" onClick={handleDeleteTeacher} title="Eliminar docente" disabled={teachers.length <= 1}>
            <Trash2 className="w-5 h-5 text-red-600" />
          </Button>
        </div>
        <Button size="lg" className="bg-scola-primary text-white px-7 py-2 text-base font-semibold hover:bg-scola-primary-dark" onClick={() => setEditing(!editing)}>
          {editing ? "Gardar" : "Editar horario"}
        </Button>
      </div>

      {/* Cuadrícula */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-white" style={{
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }}></th>
              {defaultDays.map(day => <th key={day} style={{
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }} className="pb-3 text-base font-medium text-gray-700 text-center py-[5px] my-0 mx-0 px-0 bg-transparent">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, i) => <tr key={hour}>
                {/* Hora */}
                <td style={{
              borderRight: "1px dashed #0070C0",
              borderBottom: "1px dashed #0070C0",
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }} className="bg-[#E1F0FA] font-medium pl-6 text-base border-0 align-middle px-[29px] mx-0 my-0 py-0">
                  {hour}
                </td>
                {defaultDays.map((day, j) => <td key={day} className="text-center align-middle border-0" style={{
              borderRight: j === defaultDays.length - 1 ? undefined : "1px dashed #0070C0",
              borderBottom: "1px dashed #0070C0",
              color: "#999",
              fontSize: "1.15rem",
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }}>
                    {/* Empty schedule visual */}
                    <span className="text-gray-400">—</span>
                  </td>)}
              </tr>)}
            {/* Última fila para + */}
            <tr>
              <td style={{
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }}>
                <Button size="sm" variant="ghost" onClick={handleAddHour} title="Engadir franxa" className="rounded-full px-3">
                  <Plus className="w-5 h-5" />
                </Button>
              </td>
              {defaultDays.map(day => <td key={day} style={{
              width: 120,
              height: 56,
              minWidth: 120,
              minHeight: 56
            }}></td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
};
export default DocumentUploader;