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
const RoleAndSpecialtyFields: React.FC<RoleAndSpecialtyFieldsProps> = ({
  form,
  showSpecialty
}) => {
  return <>
      <FormField control={form.control} name="role" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-lg font-medium">Cargo</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecciona o teu rol" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.filter(role => role.value !== 'alumnado').map(role => <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>} />

      {showSpecialty && <FormField control={form.control} name="specialty" render={({
      field
    }) => <FormItem>
              <FormLabel className="text-lg font-medium">Especialidade</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona a túa especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map(specialty => <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>} />}
    </>;
};
export default RoleAndSpecialtyFields;