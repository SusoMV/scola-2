
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from './types';

interface AccountFieldsProps {
  form: UseFormReturn<RegisterFormValues>;
}

const AccountFields: React.FC<AccountFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Correo electrónico</FormLabel>
            <FormControl>
              <Input placeholder="nome@exemplo.gal" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Contrasinal</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Contrasinal" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Confirmar contrasinal</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Confirmar contrasinal" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AccountFields;
