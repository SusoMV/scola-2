
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newGroupName: string;
  onNewGroupNameChange: (value: string) => void;
  onAddGroup: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({
  open,
  onOpenChange,
  newGroupName,
  onNewGroupNameChange,
  onAddGroup
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-purple-700">Engadir novo grupo</DialogTitle>
          <DialogDescription>
            Introduce o nome do novo grupo de alumnos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={newGroupName}
              onChange={(e) => onNewGroupNameChange(e.target.value)}
              placeholder="Ex: 1º Primaria B"
              className="col-span-3 border-purple-200 focus:ring-purple-400"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-purple-200">Cancelar</Button>
          <Button onClick={onAddGroup} className="bg-purple-600 hover:bg-purple-700">Engadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupDialog;
