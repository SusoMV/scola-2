
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface MessageFormProps {
  recipient: {
    id: string;
    name: string;
  } | null;
  onSubmit: (data: { content: string }) => void;
  onCancel: () => void;
}

const MessageForm = ({ recipient, onSubmit, onCancel }: MessageFormProps) => {
  const form = useForm({
    defaultValues: {
      content: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Para:</p>
          <p className="font-medium">{recipient?.name}</p>
        </div>
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaxe</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Escribe a túa mensaxe..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MessageForm;
