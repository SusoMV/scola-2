
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MessageForm from '@/components/faculty/MessageForm';

interface Participant {
  id: string;
  name: string;
  role: string;
}

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facultyMembers: Participant[];
  onSubmit: (data: { recipient: string, content: string }) => void;
}

const NewMessageDialog: React.FC<NewMessageDialogProps> = ({
  open,
  onOpenChange,
  facultyMembers,
  onSubmit
}) => {
  const form = useForm({
    defaultValues: {
      recipient: '',
      content: ''
    }
  });

  const selectedRecipientId = form.watch('recipient');
  const selectedRecipient = selectedRecipientId 
    ? facultyMembers.find(member => member.id === selectedRecipientId)
    : null;

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  const handleSubmitForm = (data: { content: string }) => {
    if (selectedRecipientId) {
      onSubmit({
        recipient: selectedRecipientId,
        content: data.content
      });
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Nova mensaxe</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinatario</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar destinatario" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {facultyMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {selectedRecipient && (
            <MessageForm 
              recipient={selectedRecipient && { id: selectedRecipient.id, name: selectedRecipient.name }}
              onSubmit={handleSubmitForm}
              onCancel={handleCancel}
            />
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageDialog;
