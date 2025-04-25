import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
type Slot = {
  subject: string;
  group: string;
};
interface ScheduleGridProps {
  schedule: Record<string, Record<string, Slot>>;
  hours: string[];
  days: string[];
  editing: boolean;
  onSlotChange: (hour: string, day: string, value: Slot) => void;
  onAddHour: () => void;
}
export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  schedule,
  hours,
  days,
  editing,
  onSlotChange,
  onAddHour
}) => {
  return <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr>
            <th className="bg-scola-secondary text-white font-semibold p-2 border-b border-gray-200 w-28 text-xs rounded-tl-md">
              Hora
            </th>
            {days.map(day => <th key={day} className="bg-scola-secondary text-white font-semibold text-xs border-b border-gray-200 p-2">
                {day}
              </th>)}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIdx) => <tr key={hour}>
              <td className="text-base font-semibold p-2 border-b border-gray-100 bg-scola-pastel">
                {hour}
              </td>
              {days.map(day => <td className="text-sm border-b border-gray-100 text-center align-middle" key={day} style={{
            minWidth: 100,
            minHeight: 48
          }}>
                  {editing ? <div className="flex flex-col gap-1">
                      <input type="text" placeholder="Asignatura" value={schedule[hour]?.[day]?.subject ?? ""} className="w-full border px-1 rounded text-xs" onChange={e => onSlotChange(hour, day, {
                ...schedule[hour]?.[day],
                subject: e.target.value,
                group: schedule[hour]?.[day]?.group ?? ""
              })} />
                      <input type="text" placeholder="Curso" value={schedule[hour]?.[day]?.group ?? ""} className="w-full border px-1 rounded text-xs" onChange={e => onSlotChange(hour, day, {
                ...schedule[hour]?.[day],
                subject: schedule[hour]?.[day]?.subject ?? "",
                group: e.target.value
              })} />
                    </div> : <span>
                      {schedule[hour]?.[day]?.subject || schedule[hour]?.[day]?.group ? <>
                            <span className="font-semibold">{schedule[hour][day].subject}</span>
                            {schedule[hour][day].group && <span className="text-xs text-gray-500 block">{schedule[hour][day].group}</span>}
                          </> : <span className="text-gray-400 text-xs">—</span>}
                    </span>}
                </td>)}
            </tr>)}
          <tr>
            <td className="p-1 text-center">
              <Button size="sm" variant="ghost" onClick={onAddHour} title="Engadir franxa">
                <Plus className="w-4 h-4" />
              </Button>
            </td>
            {days.map(day => <td key={day}></td>)}
          </tr>
        </tbody>
      </table>
    </div>;
};