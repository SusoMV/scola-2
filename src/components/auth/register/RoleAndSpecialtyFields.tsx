
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from './types';
import { ROLES, SPECIALTIES } from './constants';

interface RoleAndSpecialtyFieldsProps {
  form: UseFormReturn<RegisterFormValues>;
  showSpecialty: boolean;
}

const RoleAndSpecialtyFields: React.FC<RoleAndSpecialtyFieldsProps> = ({ form, showSpecialty }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Rol</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecciona o teu rol no centro" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showSpecialty && (
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Especialidade</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona a túa especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SPECIALTIES.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default RoleAndSpecialtyFields;
