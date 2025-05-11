
import React from "react";
import ScheduleTable from "./ScheduleTable";
import { Button } from "../ui/button";
import { Edit, Save } from "lucide-react";
import { useGroupSchedule } from "./hooks/useGroupSchedule";
import GroupControls from "./GroupControls";

// Define the types for our component
export interface Group {
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
export interface GroupScheduleProps {
  defaultGroups?: Group[];
  defaultHours?: string[];
  defaultDays?: string[];
}

const defaultGroups = [{
  id: "1",
  name: "1º Primaria"
}, {
  id: "2",
  name: "2º Primaria"
}, {
  id: "3",
  name: "3º Primaria"
}, {
  id: "4",
  name: "4º Primaria"
}, {
  id: "5",
  name: "5º Primaria"
}, {
  id: "6",
  name: "6º Primaria"
}];
const defaultHours = ["9:00", "9:50", "10:40", "11:30", "12:20", "13:10", "14:00"];
const defaultDays = ["luns", "martes", "mércores", "xoves", "venres"];

const GroupSchedule: React.FC<GroupScheduleProps> = ({
  defaultGroups: initialGroups = defaultGroups,
  defaultHours: initialHours = defaultHours,
  defaultDays: initialDays = defaultDays
}) => {
  const {
    groups,
    selectedId,
    groupSchedules,
    editing,
    hours,
    editingHours,
    editingSchedule,
    handleSelect,
    handleAddGroup,
    handleDeleteGroup,
    handleAddHour,
    handleEdit,
    handleSave,
    handleHourChange,
    handleCellChange
  } = useGroupSchedule({
    defaultGroups: initialGroups,
    defaultHours: initialHours,
    defaultDays: initialDays
  });

  // Get the current schedule based on selectedId when not editing
  const currentSchedule = groupSchedules[selectedId];

  // Use the editing schedule when editing, otherwise use the current schedule
  const scheduleToShow = editing ? editingSchedule : currentSchedule;
  const hoursToShow = editing ? editingHours : hours;
  
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-black mb-4 flex-1 text-base">Horarios de grupos</h2>
      </div>

      <div className="flex items-center mb-6 gap-2 justify-between my-0 py-0">
        <GroupControls 
          groups={groups} 
          selectedId={selectedId} 
          onSelect={handleSelect} 
          onAdd={handleAddGroup} 
          onDelete={handleDeleteGroup} 
          disabled={editing} 
        />
        <Button 
          size="sm" 
          onClick={editing ? handleSave : handleEdit} 
          className="bg-scola-primary text-white text-sm font-medium hover:bg-scola-primary-dark px-3 py-1 flex items-center gap-1"
        >
          {editing ? <>
              <Save className="w-4 h-4" />
              Gardar
            </> : <>
              <Edit className="w-4 h-4" />
              Editar horario
            </>}
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

export default GroupSchedule;
