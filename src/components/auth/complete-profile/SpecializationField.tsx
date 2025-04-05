
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CompleteProfileFormValues } from './types';
import { SPECIALIZATIONS } from './constants';

interface SpecializationFieldProps {
  form: UseFormReturn<CompleteProfileFormValues>;
}

const SpecializationField: React.FC<SpecializationFieldProps> = ({ form }) => {
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
