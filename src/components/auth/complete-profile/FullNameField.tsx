
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { CompleteProfileFormValues } from './types';

interface FullNameFieldProps {
  form: UseFormReturn<CompleteProfileFormValues>;
}

const FullNameField: React.FC<FullNameFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="full_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome e apelidos</FormLabel>
          <FormControl>
            <Input placeholder="Nome e apelidos" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FullNameField;
