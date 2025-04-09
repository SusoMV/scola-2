
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

interface AddFacultyFormProps {
  onSubmit: (data: FacultyFormData) => void;
  onCancel: () => void;
}

export interface FacultyFormData {
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

const specialtyOptions = [
  { value: '597031', label: '597031 Infantil' },
  { value: '597032', label: '597032 Inglés' },
  { value: '597033', label: '597033 Francés' },
  { value: '597034', label: '597034 Educación Física' },
  { value: '597036', label: '597036 Pedagoxía Terapéutica' },
  { value: '597035', label: '597035 Música' },
  { value: '597037', label: '597037 Audición e Linguaxe' },
  { value: '597038', label: '597038 Primaria' },
  { value: '597939', label: '597939 Orientación' },
  { value: '000000', label: '000000 Relixión' },
];

const AddFacultyForm = ({ onSubmit, onCancel }: AddFacultyFormProps) => {
  const form = useForm<FacultyFormData>({
    defaultValues: {
      name: '',
      role: 'docente',
      specialty: '',
      email: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome e apelidos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="directivo">Directivo</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialtyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
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
          <Button type="submit">Gardar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddFacultyForm;
