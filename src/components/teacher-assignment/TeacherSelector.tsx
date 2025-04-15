
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
  return (
    <div className="space-y-2">
      <Label className="font-medium text-gray-700">{label}</Label>
      {editMode ? (
        <Select
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger className="w-full border-gray-300 bg-white">
            <SelectValue placeholder={`Seleccionar ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {facultyMembers.map((teacher) => (
              <SelectItem key={teacher} value={teacher}>
                {teacher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input 
          value={value} 
          readOnly 
          className="border-gray-300 bg-gray-50" 
        />
      )}
    </div>
  );
};

export default TeacherSelector;
