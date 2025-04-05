
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface DeleteConfirmationProps {
  memberName: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({ memberName, onConfirm, onCancel }: DeleteConfirmationProps) => {
  return (
    <>
      <p className="py-4">
        Estás seguro de que queres eliminar a{' '}
        <span className="font-medium">{memberName}</span>?
      </p>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" variant="destructive" onClick={onConfirm}>
          Eliminar
        </Button>
      </DialogFooter>
    </>
  );
};

export default DeleteConfirmation;
