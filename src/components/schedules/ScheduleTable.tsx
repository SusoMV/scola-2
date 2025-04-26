import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ScheduleData } from "./TeacherSchedule";

interface ScheduleTableProps {
  days: string[];
  hours: string[];
  schedule: ScheduleData | undefined;
  editing: boolean;
  onHourChange: (idx: number, newHour: string) => void;
  onCellChange: (hour: string, day: string, field: "subject" | "group", value: string) => void;
  onAddHour: () => void;
}

const CELL_WIDTH = 55;
const CELL_HEIGHT = 40;

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  days,
  hours,
  schedule = {},
  editing,
  onHourChange,
  onCellChange,
  onAddHour
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-center align-middle pb-3 text-sm font-medium text-gray-700 bg-transparent" style={{
              width: CELL_WIDTH,
              minWidth: CELL_WIDTH,
              height: CELL_HEIGHT,
              minHeight: CELL_HEIGHT,
              borderRight: `1px dashed #0070C0`,
              borderBottom: `1px dashed #0070C0`,
              boxSizing: 'border-box'
            }}></th>
            {days.map((day, idx) => (
              <th 
                key={day} 
                className="text-center align-middle pb-3 text-sm font-medium text-gray-700 bg-transparent" 
                style={{
                  width: CELL_WIDTH,
                  minWidth: CELL_WIDTH,
                  height: CELL_HEIGHT,
                  minHeight: CELL_HEIGHT,
                  borderRight: idx === days.length - 1 ? undefined : "1px dashed #0070C0",
                  borderBottom: "1px dashed #0070C0",
                  boxSizing: 'border-box'
                }}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, i) => (
            <tr key={hour}>
              <TimeCell 
                hour={hour} 
                editing={editing} 
                onChange={(newHour) => onHourChange(i, newHour)} 
              />
              {days.map((day, j) => (
                <ScheduleCell
                  key={day}
                  day={day}
                  hour={hour}
                  data={schedule[hour]?.[day]}
                  editing={editing}
                  isLastColumn={j === days.length - 1}
                  onChange={(field, value) => onCellChange(hour, day, field, value)}
                />
              ))}
            </tr>
          ))}
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
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={onAddHour} 
                title="Engadir franxa" 
                className="rounded-full px-3" 
                disabled={editing}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </td>
            {days.map((day, j) => (
              <td 
                key={day} 
                style={{
                  width: CELL_WIDTH,
                  minWidth: CELL_WIDTH,
                  maxWidth: CELL_WIDTH,
                  height: CELL_HEIGHT,
                  minHeight: CELL_HEIGHT,
                  maxHeight: CELL_HEIGHT,
                  borderRight: j === days.length - 1 ? undefined : "1px dashed #0070C0",
                  boxSizing: 'border-box',
                  overflow: "hidden"
                }} 
                className="text-center align-middle" 
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface TimeCellProps {
  hour: string;
  editing: boolean;
  onChange: (newHour: string) => void;
}

const TimeCell: React.FC<TimeCellProps> = ({ hour, editing, onChange }) => {
  return (
    <td 
      style={{
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
      }} 
      className="bg-[#E1F0FA] font-medium text-center align-middle text-xs"
    >
      {editing ? (
        <input
          type="text"
          value={hour}
          maxLength={16}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "50px",
            minWidth: "50px",
            maxWidth: "50px",
            height: "24px",
            minHeight: "24px",
            maxHeight: "24px",
            boxSizing: "border-box",
            overflow: "hidden",
            fontSize: "12px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "6px"
          }}
          className="text-xs"
        />
      ) : hour}
    </td>
  );
};

interface ScheduleCellProps {
  day: string;
  hour: string;
  data: { subject: string; group: string } | undefined;
  editing: boolean;
  isLastColumn: boolean;
  onChange: (field: "subject" | "group", value: string) => void;
}

const ScheduleCell: React.FC<ScheduleCellProps> = ({ 
  day, 
  hour, 
  data = { subject: "", group: "" }, 
  editing, 
  isLastColumn,
  onChange 
}) => {
  return (
    <td 
      className="text-center align-middle"
      style={{
        borderRight: isLastColumn ? undefined : "1px dashed #0070C0",
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
      }}
    >
      {editing ? (
        <div 
          className="flex flex-col gap-1 items-center justify-center w-full h-full"
          style={{height: CELL_HEIGHT, minHeight: CELL_HEIGHT, maxHeight: CELL_HEIGHT}}
        >
          <input
            type="text"
            placeholder="Asignatura"
            value={data?.subject || ""}
            maxLength={16}
            style={{
              width: "50px",
              minWidth: "50px",
              maxWidth: "50px",
              height: "20px",
              minHeight: "20px",
              maxHeight: "20px",
              boxSizing: "border-box",
              overflow: "hidden",
              fontSize: "10px"
            }}
            onChange={e => onChange("subject", e.target.value)}
            className="border border-gray-300 text-xs rounded text-center px-0"
          />
          <input
            type="text"
            placeholder="Curso"
            value={data?.group || ""}
            maxLength={10}
            style={{
              width: "50px",
              minWidth: "50px",
              maxWidth: "50px",
              height: "20px",
              minHeight: "20px",
              maxHeight: "20px",
              boxSizing: "border-box",
              overflow: "hidden",
              fontSize: "10px"
            }}
            onChange={e => onChange("group", e.target.value)}
            className="border border-gray-300 text-xs rounded text-center px-0"
          />
        </div>
      ) : data?.subject || data?.group ? (
        <span>
          <span className="font-semibold text-xs">{data.subject}</span>
          {data.group && (
            <span className="block text-[10px] text-gray-500">{data.group}</span>
          )}
        </span>
      ) : (
        <span className="text-gray-400 text-[10px]">—</span>
      )}
    </td>
  );
};

export default ScheduleTable;
