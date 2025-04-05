
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CompleteProfileFormValues } from './types';
import { SCHOOLS } from './constants';

interface SchoolFieldProps {
  form: UseFormReturn<CompleteProfileFormValues>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SchoolField: React.FC<SchoolFieldProps> = ({ form, searchQuery, setSearchQuery }) => {
  // Filter schools based on search query
  const filteredSchools = searchQuery.length > 0
    ? SCHOOLS.filter(school => 
        school.toLowerCase().includes(searchQuery.toLowerCase()))
    : SCHOOLS;

  return (
    <FormField
      control={form.control}
      name="school"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Centro educativo</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un centro" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Buscar por código ou nome"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-500">
                    Non se atoparon resultados
                  </div>
                )}
              </div>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SchoolField;
