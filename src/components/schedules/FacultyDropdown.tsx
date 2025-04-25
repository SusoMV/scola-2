
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";

interface FacultyDropdownProps {
  teachers: { id: string; name: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

const FacultyDropdown: React.FC<FacultyDropdownProps> = ({
  teachers, selectedId, onSelect, onAdd, onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className="w-56 text-base">
          <SelectValue placeholder="Seleccionar docente..." />
        </SelectTrigger>
        <SelectContent>
          {teachers.map((teacher) => (
            <div className="flex items-center" key={teacher.id}>
              <SelectItem value={teacher.id} className="flex-1">{teacher.name}</SelectItem>
              <Button
                variant="ghost"
                size="icon"
                className="px-2 py-1 ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Seguro que queres eliminar a ${teacher.name}?`)) {
                    onDelete(teacher.id);
                  }
                }}
              >
                <Trash className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={onAdd} aria-label="Engadir docente">
        <Plus className="w-5 h-5 text-scola-primary" />
      </Button>
    </div>
  );
};

export default FacultyDropdown;
