
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CompleteProfileFormValues } from './types';

interface SpecializationFieldProps {
  form: UseFormReturn<CompleteProfileFormValues>;
}

const SpecializationField: React.FC<SpecializationFieldProps> = ({ form }) => {
  const SPECIALIZATIONS = [
    { id: '597031', name: 'Infantil' },
    { id: '597032', name: 'Inglés' },
    { id: '597033', name: 'Francés' },
    { id: '597034', name: 'Educación Física' },
    { id: '597036', name: 'Pedagoxía Terapéutica' },
    { id: '597035', name: 'Música' },
    { id: '597037', name: 'Audición e Linguaxe' },
    { id: '597038', name: 'Primaria' },
    { id: '597939', name: 'Orientación' },
    { id: '000000', name: 'Relixión' }
  ];
  
  return (
    <FormField
      control={form.control}
      name="specialization"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Especialidade</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona unha especialidade" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SPECIALIZATIONS.map((spec) => (
                <SelectItem key={spec.id} value={spec.id}>
                  {spec.id} {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SpecializationField;
