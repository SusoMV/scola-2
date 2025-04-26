
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Team } from './types';

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: Team;
  onSubmit: (data: Partial<Team>) => void;
}

export const EditTeamDialog = ({ open, onOpenChange, team, onSubmit }: EditTeamDialogProps) => {
  const form = useForm<Omit<Team, 'id'> & { membersText: string }>({
    defaultValues: {
      name: team.name,
      coordinator: team.coordinator,
      membersText: team.members.join('\n'),
    },
  });

  const handleSubmit = (data: Omit<Team, 'id'> & { membersText: string }) => {
    onSubmit({
      name: data.name,
      coordinator: data.coordinator,
      members: data.membersText ? data.membersText.split('\n').filter(Boolean) : [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar equipo</DialogTitle>
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membersText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membros (un por liña)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
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
              <Button type="submit">Gardar cambios</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
