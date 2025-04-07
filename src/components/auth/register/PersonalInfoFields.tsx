
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from './types';

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="full_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-medium">Nome completo</FormLabel>
          <FormControl>
            <Input placeholder="Nome e apelidos" {...field} className="h-12" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PersonalInfoFields;
