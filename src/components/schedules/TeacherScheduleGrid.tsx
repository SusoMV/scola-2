
import React, { useEffect, useRef } from 'react';
import { Plus } from "lucide-react";

type TimeSlot = string;
type DayOfWeek = "Luns" | "Martes" | "Mércores" | "Xoves" | "Venres";

interface Cell {
  subject: string;
  course: string;
}

interface Props {
  teacher: {
    id: string;
    name: string;
    schedule: Record<DayOfWeek, Record<TimeSlot, Cell>>;
  };
  days: DayOfWeek[];
  slots: TimeSlot[];
  editing: boolean;
  onCellChange: (day: DayOfWeek, slot: TimeSlot, value: Cell) => void;
  onAddSlot: (slot: string) => void;
  slotInputRef: React.RefObject<HTMLInputElement>;
}

const CELL_WIDTH = 120;

const TeacherScheduleGrid: React.FC<Props> = ({
  teacher, days, slots, editing, onCellChange, onAddSlot, slotInputRef
}) => {
  // Calcular para animar a liña horaria actual
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentLineTop = () => {
    // Asumir que slots están ordenados 09:40 a 13:45. Busca a franxa máis próxima á hora actual.
    const now = new Date();
    const getMinutes = (s: string) => {
      const [h, m] = s.split(":").map(Number);
      return h * 60 + m;
    };
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    let idx = slots.findIndex(s =>
      nowMinutes < getMinutes(s)
    );
    if (idx === -1) idx = slots.length - 1;
    // Altura da cabeceira + altura de celas previas
    const HEADER_HEIGHT = 44;
    const CELL_HEIGHT = 44;
    return HEADER_HEIGHT + idx * CELL_HEIGHT;
  };

  // Animación liña horaria
  const [linePosition, setLinePosition] = React.useState(getCurrentLineTop());

  useEffect(() => {
    if (!editing) {
      const interval = setInterval(() => {
        setLinePosition(getCurrentLineTop());
      }, 60000);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line
  }, [slots, editing]);

  useEffect(() => {
    setLinePosition(getCurrentLineTop());
    // eslint-disable-next-line
  }, [slots]);

  // Engadir nova franxa horaria
  function handleAddSlot() {
    if (!slotInputRef.current) return;
    const val = slotInputRef.current.value.trim();
    if (!val) return;
    onAddSlot(val);
    slotInputRef.current.value = "";
  }

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-300 bg-white shadow">
      <div ref={containerRef} className="min-w-[700px]">
        {/* Cadro cuadrícula */}
        <div className="grid" style={{
          gridTemplateColumns: `100px repeat(${days.length}, ${CELL_WIDTH}px)`
        }}>
          {/* Fila de cabeceira: slots vazíos á esquerda + días */}
          <div className="h-11 border-b border-r border-scola-primary bg-gradient-to-r from-scola-primary/80 to-scola-primary/60 text-white flex items-center justify-center font-semibold select-none text-sm rounded-tl-lg">
            {/* Primeira cela vacía */}
          </div>
          {days.map(day => (
            <div
              key={day}
              className="h-11 border-b border-scola-primary bg-scola-primary text-white flex items-center justify-center font-semibold select-none text-sm"
              style={{ width: CELL_WIDTH }}
            >
              {day}
            </div>
          ))}
          {/* Fila por cada slot */}
          {slots.map((slot, rowIdx) => (
            <React.Fragment key={slot}>
              {/* Columna das horas */}
              <div className="h-11 flex items-center justify-center border-b border-r border-scola-primary bg-gray-50 font-medium text-scola-primary select-none text-sm">
                {slot}
              </div>
              {days.map((day, colIdx) => {
                const cell = teacher.schedule[day]?.[slot] || { subject: "", course: "" };
                return (
                  <div
                    key={day + slot}
                    className="h-11 flex items-center justify-center border-b border-scola-primary"
                    style={{ width: CELL_WIDTH }}
                  >
                    {!editing ? (
                      <span className="text-sm text-gray-700 whitespace-pre-wrap break-words">{cell.subject && cell.course ? `${cell.subject} - ${cell.course}` : ""}</span>
                    ) : (
                      <div className="flex flex-col w-full px-1">
                        <input
                          type="text"
                          className="border px-1 py-0.5 text-xs rounded mb-0.5"
                          placeholder="Materia"
                          value={cell.subject}
                          onChange={e =>
                            onCellChange(day, slot, { subject: e.target.value, course: cell.course })
                          }
                        />
                        <input
                          type="text"
                          className="border px-1 py-0.5 text-xs rounded"
                          placeholder="Curso"
                          value={cell.course}
                          onChange={e =>
                            onCellChange(day, slot, { subject: cell.subject, course: e.target.value })
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          {/* Última fila: botón para engadir slot */}
          <div className="border-r border-scola-primary bg-gray-50 flex items-center justify-center py-1.5">
            {editing && (
              <div className="flex gap-1 items-center">
                <input
                  type="text"
                  maxLength={5}
                  placeholder="hh:mm"
                  className="border px-1 py-0.5 rounded text-xs w-14"
                  ref={slotInputRef}
                />
                <button
                  className="rounded bg-scola-primary text-white p-1 hover:bg-scola-primary/80 transition"
                  type="button"
                  onClick={handleAddSlot}
                  title="Engadir franxa horaria"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
          {days.map(day => (
            <div
              key={day + "-addslot"}
              className="border-b-0 border-scola-primary"
              style={{ width: CELL_WIDTH }}
            ></div>
          ))}
        </div>
        {/* Liña temporal activa animada */}
        {!editing && (
          <div
            className="absolute left-[100px] right-0 pointer-events-none z-10"
            style={{
              top: linePosition + "px",
              height: "2px",
              background: "linear-gradient(to right, #2D8FD5 60%, #005795 100%)",
              borderRadius: "2px"
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherScheduleGrid;
