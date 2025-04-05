
import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/agenda';
import { format } from 'date-fns';

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitEvent: (data: Omit<Event, 'id'>) => void;
  defaultDate?: Date;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSubmitEvent,
  defaultDate 
}) => {
  // Form for adding a new event
  const form = useForm({
    defaultValues: {
      date: defaultDate ? format(defaultDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      eventType: 'reunión',
      title: '',
      recipients: '',
      space: '',
      timeStart: '16:00',
      timeEnd: '17:00',
      mandatory: false
    }
  });

  const onSubmit = (data: any) => {
    const newEvent: Omit<Event, 'id'> = {
      date: new Date(data.date),
      title: data.title,
      eventType: data.eventType,
      recipients: data.recipients,
      space: data.space,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      mandatory: data.mandatory
    };
    
    onSubmitEvent(newEvent);
    form.reset();
  };

  React.useEffect(() => {
    if (defaultDate) {
      form.setValue('date', format(defaultDate, 'yyyy-MM-dd'));
    }
  }, [defaultDate, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear evento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do evento</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <Input type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de evento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="reunión">Reunión</SelectItem>
                        <SelectItem value="claustro">Claustro</SelectItem>
                        <SelectItem value="consello escolar">Consello Escolar</SelectItem>
                        <SelectItem value="formación">Formación</SelectItem>
                        <SelectItem value="charla">Charla</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do evento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Reunión ciclo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="recipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinatarios</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <Input {...field} placeholder="Ex: Todo o claustro" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="space"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espazo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar espazo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sala de profesores">Sala de profesores</SelectItem>
                        <SelectItem value="Biblioteca">Biblioteca</SelectItem>
                        <SelectItem value="Aula 12">Aula 12</SelectItem>
                        <SelectItem value="Aula 14">Aula 14</SelectItem>
                        <SelectItem value="Salón de actos">Salón de actos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timeStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de inicio</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <Input type="time" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de fin</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <Input type="time" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="mandatory"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Evento obrigatorio</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button type="submit">Gardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
