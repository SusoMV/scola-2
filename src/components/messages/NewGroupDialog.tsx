
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
  facultyMembers?: Participant[];
  onSubmit?: (data: { name: string, participants: string[] }) => void;
  onCreateGroup?: (id: string) => void;
}

// Example faculty members in case none are provided
const exampleFacultyMembers: Participant[] = [
  { id: '1', name: 'Santiago López', role: 'docente' },
  { id: '2', name: 'Ana García', role: 'docente' },
  { id: '3', name: 'Carlos Rodríguez', role: 'docente' },
  { id: '4', name: 'Laura Fernández', role: 'xefatura' }
];

const NewGroupDialog: React.FC<NewGroupDialogProps> = ({
  open,
  onOpenChange,
  facultyMembers = exampleFacultyMembers,
  onSubmit,
  onCreateGroup
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      participants: [] as string[]
    }
  });

  const handleSubmitForm = (data: { name: string, participants: string[] }) => {
    if (onSubmit) {
      onSubmit(data);
    }
    
    if (onCreateGroup) {
      // In a real app we'd create the group and then return the ID
      // For now we'll simulate it with a random ID
      const newGroupId = `group-${Math.random().toString(36).substr(2, 9)}`;
      onCreateGroup(newGroupId);
    }
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear novo grupo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
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
