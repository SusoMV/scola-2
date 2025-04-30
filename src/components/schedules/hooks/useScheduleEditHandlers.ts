
import { Dispatch, SetStateAction } from "react";
import { ScheduleData } from "../TeacherSchedule";
import { emptySchedule } from "../utils/scheduleUtils";

interface UseScheduleEditHandlersProps {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  selectedId: string;
  teacherSchedules: Record<string, ScheduleData>;
  setTeacherSchedules: Dispatch<SetStateAction<Record<string, ScheduleData>>>;
  hours: string[];
  setHours: Dispatch<SetStateAction<string[]>>;
  defaultDays: string[];
  editingHours: string[];
  setEditingHours: Dispatch<SetStateAction<string[]>>;
  editingSchedule: ScheduleData;
  setEditingSchedule: Dispatch<SetStateAction<ScheduleData>>;
}

export const useScheduleEditHandlers = ({
  editing,
  setEditing,
  selectedId,
  teacherSchedules,
  setTeacherSchedules,
  hours,
  setHours,
  defaultDays,
  editingHours,
  setEditingHours,
  editingSchedule,
  setEditingSchedule
}: UseScheduleEditHandlersProps) => {

  const handleEdit = () => {
    setEditing(true);
    // Make a deep copy of the current teacher's schedule
    const currentSchedule = teacherSchedules[selectedId] || emptySchedule(hours, defaultDays);
    setEditingSchedule(JSON.parse(JSON.stringify(currentSchedule)));
    setEditingHours([...hours]);
  };

  const handleSave = () => {
    const filteredHours = editingHours.map(h => h.trim()).filter(h => !!h);

    const oldSchedule = editingSchedule;
    const newSchedule: ScheduleData = {};
    
    // Ensure each hour has entries for all days
    filteredHours.forEach(hour => {
      if (oldSchedule[hour]) {
        newSchedule[hour] = { ...oldSchedule[hour] };
        
        // Make sure all days are present
        defaultDays.forEach(day => {
          if (!newSchedule[hour][day]) {
            newSchedule[hour][day] = { subject: "", group: "" };
          }
        });
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
      const oldHour = editingHours[idx];
      const newSchedule: ScheduleData = {};
      
      // Copy all hours except the one being changed
      Object.keys(prev).forEach(hour => {
        if (hour !== oldHour) {
          newSchedule[hour] = prev[hour];
        }
      });
      
      // Add the hour with the new key
      if (oldHour && prev[oldHour]) {
        newSchedule[newHour] = prev[oldHour];
      } else {
        // If the old hour doesn't exist in the schedule, create a new entry
        newSchedule[newHour] = Object.fromEntries(defaultDays.map(day => [day, { subject: "", group: "" }]));
      }
      
      return newSchedule;
    });
  };

  const handleCellChange = (hour: string, day: string, field: "subject" | "group", value: string) => {
    setEditingSchedule(prev => {
      // Make sure the hour exists
      if (!prev[hour]) {
        prev[hour] = {};
      }
      
      // Make sure the day exists for this hour
      if (!prev[hour][day]) {
        prev[hour][day] = { subject: "", group: "" };
      }
      
      return {
        ...prev,
        [hour]: {
          ...prev[hour],
          [day]: {
            ...prev[hour][day],
            [field]: value
          }
        }
      };
    });
  };

  return {
    handleEdit,
    handleSave,
    handleHourChange,
    handleCellChange
  };
};
