
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Participant {
  id: string;
  name: string;
  role: string;
}

interface NewGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facultyMembers: Participant[];
  onSubmit: (data: { name: string, participants: string[] }) => void;
}

const NewGroupDialog: React.FC<NewGroupDialogProps> = ({
  open,
  onOpenChange,
  facultyMembers,
  onSubmit
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      participants: [] as string[]
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear novo grupo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do grupo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Titorías 6º" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participantes</FormLabel>
                  <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                    {facultyMembers.map((member) => (
                      <div key={member.id} className="flex items-center py-2">
                        <input
                          type="checkbox"
                          id={`member-${member.id}`}
                          value={member.id}
                          onChange={(e) => {
                            const selectedValues = [...(field.value || [])];
                            if (e.target.checked) {
                              selectedValues.push(member.id);
                            } else {
                              const index = selectedValues.indexOf(member.id);
                              if (index !== -1) selectedValues.splice(index, 1);
                            }
                            field.onChange(selectedValues);
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`member-${member.id}`} className="text-sm">
                          {member.name} ({member.role})
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear grupo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
