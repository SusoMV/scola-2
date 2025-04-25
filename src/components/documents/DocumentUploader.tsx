import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2, Edit, Save } from "lucide-react";

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
const CELL_WIDTH = 80;
const CELL_HEIGHT = 48;

const DocumentUploader = () => {
  const [teachers, setTeachers] = useState(defaultTeachers);
  const [selectedId, setSelectedId] = useState(defaultTeachers[0].id);
  const [teacherSchedules, setTeacherSchedules] = useState<Record<string, any>>({
    "1": emptySchedule(),
    "2": emptySchedule()
  });
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);

  const [editingSchedule, setEditingSchedule] = useState<any>({});

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
  };

  const handleSave = () => {
    setTeacherSchedules(ts => ({
      ...ts,
      [selectedId]: editingSchedule
    }));
    setEditing(false);
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
  return <div className="rounded-lg bg-white p-8">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-black mb-6 flex-1">Horarios docentes</h2>
      </div>

      <div className="flex items-center mb-8 gap-3 justify-between my-0 py-[2px]">
        <div className="flex items-center gap-2">
          <select value={selectedId} onChange={handleSelect} className="border border-gray-300 rounded-md py-2 text-base focus:outline-none focus:ring-2 focus:ring-scola-primary bg-white min-w-[180px] px-[8px] mx-0">
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <Button size="sm" variant="outline" className="border-scola-primary text-scola-primary" onClick={handleAddTeacher} title="Engadir docente" disabled={editing}>
            <Plus className="w-5 h-5" />
          </Button>
          <Button size="sm" variant="outline" className="border-transparent" onClick={handleDeleteTeacher} title="Eliminar docente" disabled={teachers.length <= 1 || editing}>
            <Trash2 className="w-5 h-5 text-red-600" />
          </Button>
        </div>
        <Button size="lg" onClick={editing ? handleSave : handleEdit} className="bg-scola-primary text-white text-base font-semibold hover:bg-scola-primary-dark px-[18px] py-0 flex items-center gap-2">
          {editing ? <>
              <Save className="w-5 h-5" />
              Gardar
            </> : <>
              <Edit className="w-5 h-5" />
              Editar horario
            </>}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-center align-middle pb-3 text-base font-medium text-gray-700 bg-transparent" style={{
              width: CELL_WIDTH,
              minWidth: CELL_WIDTH,
              height: CELL_HEIGHT,
              minHeight: CELL_HEIGHT,
              borderRight: `1px dashed #0070C0`,
              borderBottom: `1px dashed #0070C0`,
              boxSizing: 'border-box'
            }}></th>
              {defaultDays.map((day, idx) => <th key={day} className="text-center align-middle pb-3 text-base font-medium text-gray-700 bg-transparent" style={{
              width: CELL_WIDTH,
              minWidth: CELL_WIDTH,
              height: CELL_HEIGHT,
              minHeight: CELL_HEIGHT,
              borderRight: idx === defaultDays.length - 1 ? undefined : "1px dashed #0070C0",
              borderBottom: "1px dashed #0070C0",
              boxSizing: 'border-box'
            }}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, i) => <tr key={hour}>
                <td style={{
              borderRight: "1px dashed #0070C0",
              borderBottom: "1px dashed #0070C0",
              width: CELL_WIDTH,
              minWidth: CELL_WIDTH,
              maxWidth: CELL_WIDTH,
              height: CELL_HEIGHT,
              minHeight: CELL_HEIGHT,
              maxHeight: CELL_HEIGHT,
              boxSizing: 'border-box',
              overflow: 'hidden'
            }} className="bg-[#E1F0FA] font-medium text-center align-middle">
                  {hour}
                </td>
                {defaultDays.map((day, j) => <td key={day} className="text-center align-middle"
                 style={{
                  borderRight: j === defaultDays.length - 1 ? undefined : "1px dashed #0070C0",
                  borderBottom: "1px dashed #0070C0",
                  width: CELL_WIDTH,
                  minWidth: CELL_WIDTH,
                  maxWidth: CELL_WIDTH,
                  height: CELL_HEIGHT,
                  minHeight: CELL_HEIGHT,
                  maxHeight: CELL_HEIGHT,
                  boxSizing: 'border-box',
                  padding: 4,
                  overflow: "hidden"
                }}>
                    {editing ? <div className="flex flex-col gap-1 items-center justify-center w-full h-full"
                      style={{height: CELL_HEIGHT, minHeight: CELL_HEIGHT, maxHeight: CELL_HEIGHT}}
                    >
                          <input
                            type="text"
                            placeholder="Asignatura"
                            value={scheduleToShow?.[hour]?.[day]?.subject || ""}
                            maxLength={16}
                            style={{
                              width: "66px",
                              minWidth: "66px",
                              maxWidth: "66px",
                              height: "20px",
                              minHeight: "20px",
                              maxHeight: "20px",
                              boxSizing: "border-box",
                              overflow: "hidden",
                              fontSize: "12px"
                            }}
                            onChange={e => handleCellChange(hour, day, "subject", e.target.value)}
                            className="border border-gray-300 text-xs rounded text-center px-0"
                          />
                          <input
                            type="text"
                            placeholder="Curso"
                            value={scheduleToShow?.[hour]?.[day]?.group || ""}
                            maxLength={10}
                            style={{
                              width: "66px",
                              minWidth: "66px",
                              maxWidth: "66px",
                              height: "20px",
                              minHeight: "20px",
                              maxHeight: "20px",
                              boxSizing: "border-box",
                              overflow: "hidden",
                              fontSize: "12px"
                            }}
                            onChange={e => handleCellChange(hour, day, "group", e.target.value)}
                            className="border border-gray-300 text-xs rounded text-center px-0"
                          />
                        </div>
                    : scheduleToShow?.[hour]?.[day]?.subject || scheduleToShow?.[hour]?.[day]?.group
                      ? <span>
                          <span className="font-semibold">{scheduleToShow[hour][day].subject}</span>
                          {scheduleToShow[hour][day].group && <span className="block text-xs text-gray-500">{scheduleToShow[hour][day].group}</span>}
                        </span>
                      : <span className="text-gray-400 text-xs">—</span>}
                  </td>)}
              </tr>)}
            <tr>
              <td style={{
              width: CELL_WIDTH,
              minWidth: CELL_WIDTH,
              maxWidth: CELL_WIDTH,
              height: CELL_HEIGHT,
              minHeight: CELL_HEIGHT,
              maxHeight: CELL_HEIGHT,
              borderRight: "1px dashed #0070C0",
              boxSizing: 'border-box',
              overflow: 'hidden'
            }} className="text-center align-middle">
                <Button size="sm" variant="ghost" onClick={handleAddHour} title="Engadir franxa" className="rounded-full px-3" disabled={editing}>
                  <Plus className="w-5 h-5" />
                </Button>
              </td>
              {defaultDays.map((day, j) => <td key={day} style={{
                  width: CELL_WIDTH,
                  minWidth: CELL_WIDTH,
                  maxWidth: CELL_WIDTH,
                  height: CELL_HEIGHT,
                  minHeight: CELL_HEIGHT,
                  maxHeight: CELL_HEIGHT,
                  borderRight: j === defaultDays.length - 1 ? undefined : "1px dashed #0070C0",
                  boxSizing: 'border-box',
                  overflow: "hidden"
                }} className="text-center align-middle" />)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
};

export default DocumentUploader;
