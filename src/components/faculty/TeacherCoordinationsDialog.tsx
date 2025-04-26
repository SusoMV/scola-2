
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { FacultyMember } from '@/hooks/useFacultyMembers';

interface TeacherCoordinationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: FacultyMember | null;
}

const TeacherCoordinationsDialog: React.FC<TeacherCoordinationsDialogProps> = ({
  open,
  onOpenChange,
  teacher
}) => {
  const [coordinations, setCoordinations] = useState<string[]>([]);
  const [newCoordination, setNewCoordination] = useState('');

  const handleAddCoordination = () => {
    if (newCoordination.trim()) {
      setCoordinations([...coordinations, newCoordination.trim()]);
      setNewCoordination('');
    }
  };

  const handleRemoveCoordination = (index: number) => {
    setCoordinations(coordinations.filter((_, i) => i !== index));
  };

  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Coordinacións de {teacher.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nova coordinación"
              value={newCoordination}
              onChange={(e) => setNewCoordination(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCoordination();
              }}
            />
            <Button onClick={handleAddCoordination} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {coordinations.map((coordination, index) => (
              <div key={index} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-md">
                <span>{coordination}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleRemoveCoordination(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherCoordinationsDialog;
