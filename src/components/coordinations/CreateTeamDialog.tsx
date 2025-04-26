
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Team } from './types';

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Team, 'id'>) => void;
}

export const CreateTeamDialog = ({ open, onOpenChange, onSubmit }: CreateTeamDialogProps) => {
  const form = useForm<Omit<Team, 'id'>>();

  const handleSubmit = (data: Omit<Team, 'id'>) => {
    onSubmit({
      name: data.name,
      coordinator: data.coordinator,
      members: data.members.split('\n').filter(Boolean),
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear novo equipo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do equipo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do equipo" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordinator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinador</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do coordinador" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membros (un por liña)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Escribe cada membro nunha nova liña"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear equipo</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
