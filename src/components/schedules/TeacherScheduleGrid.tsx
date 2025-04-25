import React from 'react';

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
  slotRanges?: string[]; // e.g. ["9:40 - 10:30"]
  editing: boolean;
  onCellChange: (day: DayOfWeek, slot: TimeSlot, value: Cell) => void;
  onAddSlot: (slot: string) => void;
  slotInputRef: React.RefObject<HTMLInputElement>;
}

const SCHEDULE_RANGES = [
  "9:40 - 10:30",
  "10:30 - 11:20",
  "11:20 - 12:10",
  "12:10 - 12:35\n12:35 - 13:00",
  "13:00 - 13:45",
  "13:45 - 14:40"
];
// slots = ["9:40", "10:30", "11:20", "12:10", "13:00", "13:45"]
// We need to map slots to these ranges for display.

const CELL_WIDTH = 170;

const isRecreo = (cell: Cell) =>
  cell.subject.toLowerCase().includes("recreo");
const isHoraLer = (cell: Cell) =>
  cell.subject.toLowerCase().includes("hora de ler");

const TeacherScheduleGrid: React.FC<Props> = ({
  teacher, days, slots, editing, onCellChange, onAddSlot, slotInputRef
}) => {

  // Map slots to visible ranges
  // Default: slot times + their ranges (for demo, map positions)
  const slotRanges = [
    "9:40 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 12:35\n12:35 - 13:00",
    "13:00 - 13:45",
    "13:45 - 14:40"
  ];

  // Map for stacking cells (e.g., 'Recreo' and then 'Hora de ler')
  function renderCellContents(cell: Cell) {
    // Both "Recreo" and "Hora de ler"
    if (isRecreo(cell) && isHoraLer(cell)) {
      return (
        <div className="flex flex-col w-full items-center gap-0.5">
          <div className="bg-[#E6F1FB] text-scola-primary font-semibold text-center rounded-t text-xs w-full py-1 border-b border-blue-300" style={{lineHeight:"1"}}>
            Recreo
          </div>
          <div className="bg-[#F2FCE2] text-[#253B17] font-semibold text-center rounded-b text-xs w-full py-1" style={{lineHeight:"1"}}>
            Hora de ler
          </div>
        </div>
      );
    }
    if (isRecreo(cell)) {
      return (
        <div className="bg-[#E6F1FB] text-scola-primary font-semibold text-center rounded text-xs w-full py-1" style={{lineHeight:"1"}}>
          Recreo
        </div>
      );
    }
    if (isHoraLer(cell)) {
      return (
        <div className="bg-[#F2FCE2] text-[#253B17] font-semibold text-center rounded text-xs w-full py-1" style={{lineHeight:"1"}}>
          Hora de ler
        </div>
      );
    }
    // Other contents
    if (cell.subject || cell.course) {
      return (
        <span className={`block text-base font-normal text-gray-900 text-center whitespace-pre-wrap w-full ${cell.subject==="GARDA" ? "font-bold" : ""}`}>
          {cell.subject}{cell.course ? `\n${cell.course}` : ""}
        </span>
      );
    }
    return null;
  }

  return (
    <div className="w-full">
      {/* Teacher Name Bar */}
      <div className="bg-scola-primary text-white font-bold text-xl px-8 py-2 mb-2 rounded-t-lg" style={{width: "fit-content", minWidth: 450}}>
        {teacher.name}
      </div>
      <div className="overflow-x-auto rounded-b-lg">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `170px repeat(${days.length}, ${CELL_WIDTH}px)`,
          minWidth: 1100,
        }}
      >
        {/* Header Row */}
        <div className="border-[2px] border-scola-primary border-dashed bg-gray-100 font-bold text-lg flex items-center justify-center h-16"></div>
        {days.map(day => (
          <div
            key={day}
            className="border-[2px] border-scola-primary border-dashed bg-gray-100 font-bold text-lg flex items-center justify-center h-16"
          >
            {day}
          </div>
        ))}
        {/* Time Rows */}
        {slots.map((slot, slotIdx) => (
          <React.Fragment key={slot}>
            <div className="border-[2px] border-scola-primary border-dashed font-semibold text-base text-gray-800 flex flex-col items-center justify-center bg-gray-50 h-20 whitespace-pre-wrap px-1 text-center">
              {slotRanges[slotIdx] || slot}
            </div>
            {days.map(day => {
              const cell = teacher.schedule[day]?.[slot] || { subject: "", course: "" };
              return (
                <div
                  key={day + slot}
                  className="border-[2px] border-scola-primary border-dashed bg-white flex items-center justify-center h-20 px-1"
                >
                  {!editing ? (
                    renderCellContents(cell)
                  ) : (
                    <div className="flex flex-col gap-1 w-full items-center">
                      <input
                        type="text"
                        className="border border-gray-300 px-1 py-0.5 text-xs rounded mb-0.5 text-center"
                        placeholder="Asignatura"
                        value={cell.subject}
                        onChange={e =>
                          onCellChange(day, slot, { subject: e.target.value, course: cell.course })
                        }
                      />
                      <input
                        type="text"
                        className="border border-gray-300 px-1 py-0.5 text-xs rounded text-center"
                        placeholder="Curso"
                        value={cell.course}
                        onChange={e =>
                          onCellChange(day, slot, { subject: cell.subject, course: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </React.Fragment>
        ))}
        {/* Last cell for add slot button */}
        <div className="border-[2px] border-scola-primary border-dashed bg-gray-50 flex items-center justify-center h-20">
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
                onClick={() => {
                  if (!slotInputRef.current) return;
                  const val = slotInputRef.current.value.trim();
                  if (!val) return;
                  onAddSlot(val);
                  slotInputRef.current.value = "";
                }}
                title="Engadir franxa horaria"
              >
                +
              </button>
            </div>
          )}
        </div>
        {days.map(day => (
          <div
            key={day + "-addslot"}
            className="border-[2px] border-scola-primary border-dashed h-20"
          ></div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TeacherScheduleGrid;
