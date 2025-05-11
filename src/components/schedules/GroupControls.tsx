
import React from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Group } from "./GroupSchedule";

interface GroupControlsProps {
  groups: Group[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const GroupControls: React.FC<GroupControlsProps> = ({
  groups,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
  disabled = false
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value);

  return (
    <div className="flex items-center gap-1">
      <select 
        value={selectedId} 
        onChange={handleSelect} 
        disabled={disabled} 
        className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-scola-primary bg-white min-w-[140px] py-[7px] px-[7px] mx-px my-[3px]"
      >
        {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onAdd} 
        title="Engadir grupo" 
        disabled={disabled} 
        className="border-scola-primary text-scola-primary p-1 px-[9px] mx-[9px]"
      >
        <Plus className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onDelete(selectedId)} 
        title="Eliminar grupo" 
        disabled={groups.length <= 1 || disabled} 
        className="border-transparent p-1 px-[9px]"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>
  );
};

export default GroupControls;
