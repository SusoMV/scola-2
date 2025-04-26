
import React from "react";
import TeacherControls from "./TeacherControls";
import ScheduleTable from "./ScheduleTable";
import { Button } from "../ui/button";
import { Edit, Save } from "lucide-react";
import { useTeacherSchedule } from "./useTeacherSchedule";

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

const TeacherSchedule: React.FC<TeacherScheduleProps> = ({
  defaultTeachers: initialTeachers = defaultTeachers,
  defaultHours: initialHours = defaultHours,
  defaultDays: initialDays = defaultDays,
}) => {
  const {
    teachers,
    selectedId,
    teacherSchedules,
    editing,
    hours,
    editingHours,
    editingSchedule,
    handleSelect,
    handleAddTeacher,
    handleDeleteTeacher,
    handleAddHour,
    handleEdit,
    handleSave,
    handleHourChange,
    handleCellChange
  } = useTeacherSchedule({
    defaultTeachers: initialTeachers,
    defaultHours: initialHours,
    defaultDays: initialDays
  });

  // Get the current schedule based on selectedId when not editing
  const currentSchedule = teacherSchedules[selectedId];
  
  // Use the editing schedule when editing, otherwise use the current schedule
  const scheduleToShow = editing ? editingSchedule : currentSchedule;
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
