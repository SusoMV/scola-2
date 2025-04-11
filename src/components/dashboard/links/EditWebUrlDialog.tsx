
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditWebUrlDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tempUrl: string;
  onTempUrlChange: (url: string) => void;
  onSave: () => void;
}

const EditWebUrlDialog: React.FC<EditWebUrlDialogProps> = ({
  isOpen,
  onOpenChange,
  tempUrl,
  onTempUrlChange,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar URL da web do centro</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="url" className="text-right">
              URL:
            </label>
            <Input
              id="url"
              value={tempUrl}
              onChange={(e) => onTempUrlChange(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            Gardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWebUrlDialog;
