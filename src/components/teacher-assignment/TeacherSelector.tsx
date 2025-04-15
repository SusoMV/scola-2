
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { facultyMembers } from './types/assignment-types';

interface TeacherSelectorProps {
  label: string;
  value: string;
  editMode: boolean;
  onChange: (value: string) => void;
}

const TeacherSelector: React.FC<TeacherSelectorProps> = ({ 
  label, 
  value, 
  editMode, 
  onChange 
}) => {
  return editMode ? (
    <div className="space-y-1">
      <Label className="text-xs md:text-sm font-medium text-gray-700">{label}</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full h-8 text-xs md:text-sm">
          <SelectValue placeholder={`Seleccionar ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {facultyMembers.map((teacher) => (
            <SelectItem key={teacher} value={teacher} className="text-xs md:text-sm">
              {teacher}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : (
    <div className="space-y-1">
      <Label className="text-xs md:text-sm font-medium text-gray-700">{label}</Label>
      <Input 
        value={value} 
        readOnly 
        className="h-8 text-xs md:text-sm bg-gray-50" 
      />
    </div>
  );
};

export default TeacherSelector;
