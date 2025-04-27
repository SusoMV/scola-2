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
  return <div className="flex items-center gap-1">
      <select value={selectedId} onChange={handleSelect} disabled={disabled} className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-scola-primary bg-white min-w-[140px] mx-0 py-[7px] px-[7px]">
        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <Button size="sm" variant="outline" onClick={onAdd} title="Engadir docente" disabled={disabled} className="border-scola-primary text-scola-primary p-1 px-[9px]">
        <Plus className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={() => onDelete(selectedId)} title="Eliminar docente" disabled={teachers.length <= 1 || disabled} className="border-transparent p-1 px-[9px]">
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    </div>;
};
export default TeacherControls;