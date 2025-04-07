
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

interface SubstitutionFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  absentTeachers: string[];
  substituteTeachers: string[];
}

const SubstitutionForm: React.FC<SubstitutionFormProps> = ({
  form,
  onSubmit,
  onCancel,
  absentTeachers,
  substituteTeachers
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="absentTeacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesor ausente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar profesor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {absentTeachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1º Primaria">1º Primaria</SelectItem>
                    <SelectItem value="2º Primaria">2º Primaria</SelectItem>
                    <SelectItem value="3º Primaria">3º Primaria</SelectItem>
                    <SelectItem value="4º Primaria">4º Primaria</SelectItem>
                    <SelectItem value="5º Primaria">5º Primaria</SelectItem>
                    <SelectItem value="6º Primaria">6º Primaria</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cita médica">Cita médica</SelectItem>
                    <SelectItem value="Formación">Formación</SelectItem>
                    <SelectItem value="Persoal">Persoal</SelectItem>
                    <SelectItem value="Enfermidade">Enfermidade</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control} 
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <Input type="date" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
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
            name="endTime"
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
          name="substituteTeacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesor substituto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar substituto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {substituteTeachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} className="mr-2">
            Cancelar
          </Button>
          <Button type="submit">Gardar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SubstitutionForm;
