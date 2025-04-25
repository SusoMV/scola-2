
import React, { useState, useRef } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Plus, Trash, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeacherScheduleGrid from "./TeacherScheduleGrid";

type TimeSlot = string;
type DayOfWeek = "Luns" | "Martes" | "Mércores" | "Xoves" | "Venres";

interface Cell {
  subject: string;
  course: string;
}

interface Teacher {
  id: string;
  name: string;
  schedule: Record<DayOfWeek, Record<TimeSlot, Cell>>;
}

// Core slot times for matching the mockup
const defaultSlots: TimeSlot[] = [
  "9:40", "10:30", "11:20", "12:10", "13:00", "13:45"
];

// Map to grid slot display ranges
const slotRanges: string[] = [
  "9:40 - 10:30",
  "10:30 - 11:20",
  "11:20 - 12:10",
  "12:10 - 12:35\n12:35 - 13:00",
  "13:00 - 13:45",
  "13:45 - 14:40"
];

const days: DayOfWeek[] = ["Luns", "Martes", "Mércores", "Xoves", "Venres"];

const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "Juan Ángel Anca Pena",
    schedule: days.reduce((acc, day) => ({
      ...acc,
      [day]: {
        "9:40": { subject: day === "Luns" ? "" : day === "Martes" ? "5 anos A" : day === "Mércores" ? "3ºC" : day === "Xoves" ? "5 anos B" : "3ºB", course: "" },
        "10:30": { subject: day === "Luns" ? "3ºA" : day === "Martes" ? "4 anos A" : day === "Mércores" ? "3ºB" : day === "Xoves" ? "3 anos A" : "3ºC", course: "" },
        "11:20": { subject: day === "Luns" ? "3ºC" : day === "Martes" ? "4 anos B" : day === "Mércores" ? "3ºA" : day === "Xoves" ? "3 anos B" : "3ºA", course: "" },
        "12:10": { subject: "Recreo\nHora de ler", course: "" },
        "13:00": { subject: day === "Luns" ? "2ºA" : day === "Martes" ? "2ºB" : day === "Mércores" ? "GARDA" : day === "Xoves" ? "2ºB" : "2ºA", course: "" },
        "13:45": { subject: day === "Luns" ? "1ºB" : day === "Martes" ? "1ºB" : day === "Mércores" ? "1ºA" : day === "Xoves" ? "1ºA" : "GARDA", course: "" }
      }
    }), {} as Record<DayOfWeek, Record<TimeSlot, Cell>>),
  }
];

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now();
}

const TeacherTabs: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [selectedId, setSelectedId] = useState(teachers[0]?.id || "");
  const [editing, setEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState<Record<string, Teacher>>({});

  const addTeacher = () => {
    const name = window.prompt("Nome do docente:");
    if (!name) return;
    const id = generateId();
    const newTeacher: Teacher = {
      id, name,
      schedule: days.reduce((acc, day) => ({
        ...acc,
        [day]: Object.fromEntries(
          defaultSlots.map(slot => [slot, { subject: "", course: "" }])
        ),
      }), {} as Record<DayOfWeek, Record<TimeSlot, Cell>>),
    };
    setTeachers([...teachers, newTeacher]);
    setSelectedId(id);
  };

  const deleteTeacher = (id: string) => {
    if (window.confirm("¿Seguro que queres eliminar este docente e o seu horario?")) {
      setTeachers(teachers.filter(t => t.id !== id));
      if (selectedId === id && teachers.length > 1) {
        setSelectedId(teachers[0].id);
      }
      if (selectedId === id && teachers.length <= 1) {
        setSelectedId("");
      }
    }
  };

  const startEdit = () => {
    setEditBuffer(Object.fromEntries(teachers.map(t => [t.id, JSON.parse(JSON.stringify(t))])));
    setEditing(true);
  };

  const saveEdit = () => {
    setTeachers(teachers.map(t =>
      editBuffer[t.id] ? { ...editBuffer[t.id] } : t
    ));
    setEditing(false);
  };

  const onCellChange = (day: DayOfWeek, slot: TimeSlot, value: Cell) => {
    setEditBuffer(buffer => ({
      ...buffer,
      [selectedId]: {
        ...buffer[selectedId],
        schedule: {
          ...buffer[selectedId].schedule,
          [day]: {
            ...buffer[selectedId].schedule[day],
            [slot]: value
          }
        }
      }
    }));
  };

  const handleAddSlot = (slot: string) => {
    setEditBuffer(buffer => {
      let teacher = buffer[selectedId];
      if (!teacher) return buffer;
      const alreadyExists = defaultSlots.includes(slot) || Object.keys(teacher.schedule["Luns"]).includes(slot);
      if (alreadyExists) return buffer;
      const updatedSchedule: Record<DayOfWeek, Record<TimeSlot, Cell>> = { ...teacher.schedule };
      days.forEach(day => {
        updatedSchedule[day] = { ...updatedSchedule[day], [slot]: { subject: "", course: "" } };
      });
      return {
        ...buffer,
        [selectedId]: {
          ...teacher,
          schedule: updatedSchedule
        }
      };
    });
  };

  const selectedTeacher = teachers.find(t => t.id === selectedId)
    || (editing && editBuffer[selectedId]);

  const slots = defaultSlots;
  const editSlots = defaultSlots;

  const slotInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div />
        <div>
          {!editing ? (
            <Button variant="default" size="sm" onClick={startEdit} className="mr-2">
              <Edit className="w-4 h-4 mr-2" /> Editar horario
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={saveEdit} className="">
              <Save className="w-4 h-4 mr-2" /> Gardar
            </Button>
          )}
        </div>
      </div>
      <Tabs
        value={selectedId}
        onValueChange={setSelectedId}
        className="w-full"
      >
        <div className="relative w-full flex mb-2">
          <TabsList className="flex-1 overflow-x-auto whitespace-nowrap">
            {teachers.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="relative pr-8 group">
                <span>{t.name}</span>
                {editing &&
                  <Trash
                    className="absolute top-1/2 transform -translate-y-1/2 right-1.5 w-4 h-4 text-red-500 cursor-pointer opacity-80 group-hover:opacity-100 hover:scale-110 transition"
                    onClick={e => {
                      e.stopPropagation();
                      deleteTeacher(t.id);
                    }}
                  />}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 p-2 hover:bg-scola-primary/10"
            onClick={addTeacher}
            aria-label="Engadir docente"
          >
            <Plus className="w-5 h-5 text-scola-primary" />
          </Button>
        </div>
        {teachers.map((t) => (
          <TabsContent
            value={t.id}
            key={t.id}
            className="animate-fade-in"
          >
            <TeacherScheduleGrid
              teacher={editing ? (editBuffer[t.id] || t) : t}
              days={days}
              slots={editing ? editSlots : slots}
              editing={editing && selectedId === t.id}
              onCellChange={onCellChange}
              onAddSlot={handleAddSlot}
              slotInputRef={slotInputRef}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TeacherTabs;
