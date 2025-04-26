
import React from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Teacher } from "./TeacherSchedule";

interface TeacherControlsProps {
  teachers: Teacher[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const TeacherControls: React.FC<TeacherControlsProps> = ({
  teachers,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
  disabled = false
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value);

  return (
    <div className="flex items-center gap-2">
      <select 
        value={selectedId} 
        onChange={handleSelect} 
        className="border border-gray-300 rounded-md py-2 text-base focus:outline-none focus:ring-2 focus:ring-scola-primary bg-white min-w-[180px] px-[8px] mx-0"
        disabled={disabled}
      >
        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <Button 
        size="sm" 
        variant="outline" 
        className="border-scola-primary text-scola-primary" 
        onClick={onAdd} 
        title="Engadir docente" 
        disabled={disabled}
      >
        <Plus className="w-5 h-5" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="border-transparent" 
        onClick={() => onDelete(selectedId)} 
        title="Eliminar docente" 
        disabled={teachers.length <= 1 || disabled}
      >
        <Trash2 className="w-5 h-5 text-red-600" />
      </Button>
    </div>
  );
};

export default TeacherControls;
