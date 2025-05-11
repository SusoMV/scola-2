
import { useState } from "react";
import { Group, ScheduleData } from "../GroupSchedule";
import { createDefaultScheduleData } from "../utils/scheduleUtils";

interface UseGroupScheduleProps {
  defaultGroups: Group[];
  defaultHours: string[];
  defaultDays: string[];
}

export const useGroupSchedule = ({
  defaultGroups,
  defaultHours,
  defaultDays
}: UseGroupScheduleProps) => {
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [selectedId, setSelectedId] = useState(defaultGroups[0].id);
  
  // Initialize group schedules for all default groups
  const initialSchedules: Record<string, ScheduleData> = {};
  defaultGroups.forEach(group => {
    initialSchedules[group.id] = createDefaultScheduleData(defaultHours, defaultDays);
  });
  
  const [groupSchedules, setGroupSchedules] = useState<Record<string, ScheduleData>>(initialSchedules);
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(defaultHours);
  const [editingHours, setEditingHours] = useState<string[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleData>({});

  const handleSelect = (id: string) => setSelectedId(id);

  const handleAddGroup = () => {
    const name = window.prompt("Nome do novo grupo?");
    if (!name) return;
    const id = crypto.randomUUID();
    setGroups(g => [...g, { id, name }]);
    setGroupSchedules(gs => ({
      ...gs,
      [id]: createDefaultScheduleData(hours, defaultDays)
    }));
    setSelectedId(id);
  };

  const handleDeleteGroup = (id: string) => {
    if (groups.length <= 1) {
      window.alert("Debe haber polo menos un grupo.");
      return;
    }
    const currentGroup = groups.find(g => g.id === id);
    if (!window.confirm(`¿Eliminar o grupo ${currentGroup?.name}?`)) return;
    setGroups(g => g.filter(gr => gr.id !== id));
    setSelectedId(g => {
      const idx = groups.findIndex(gr => gr.id === id);
      if (idx > 0) return groups[idx - 1].id;
      if (idx === 0 && groups.length > 1) return groups[1].id;
      return "";
    });
    setGroupSchedules(gs => {
      const copy = { ...gs };
      delete copy[id];
      return copy;
    });
  };

  const handleEdit = () => {
    setEditing(true);
    setEditingHours([...hours]);
    setEditingSchedule({...groupSchedules[selectedId]});
  };

  const handleSave = () => {
    setEditing(false);
    setHours(editingHours);
    setGroupSchedules(prev => ({
      ...prev,
      [selectedId]: editingSchedule
    }));
  };

  const handleHourChange = (index: number, value: string) => {
    setEditingHours(prev => {
      const newHours = [...prev];
      newHours[index] = value;
      return newHours;
    });

    setEditingSchedule(prev => {
      const oldHour = editingHours[index];
      const newSchedule = { ...prev };
      delete Object.assign(newSchedule, { [value]: newSchedule[oldHour] })[oldHour];
      return newSchedule;
    });
  };

  const handleCellChange = (hour: string, day: string, field: 'subject' | 'group', value: string) => {
    setEditingSchedule(prev => ({
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

  const handleAddHour = () => {
    const time = window.prompt("Nova hora?", "");
    if (!time || hours.includes(time)) return;
    
    // Add the new hour to the hours array
    setGroupSchedules(gs => {
      const updatedSchedules = { ...gs };
      Object.keys(updatedSchedules).forEach(groupId => {
        updatedSchedules[groupId] = {
          ...updatedSchedules[groupId],
          [time]: Object.fromEntries(defaultDays.map(day => [day, {
            subject: "",
            group: ""
          }]))
        };
      });
      return updatedSchedules;
    });
  };

  return {
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
  };
};
