
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from './types';
import { SCHOOL_CODES } from './constants';

interface SchoolFieldProps {
  form: UseFormReturn<RegisterFormValues>;
}

const SchoolField: React.FC<SchoolFieldProps> = ({ form }) => {
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');

  // Filter schools based on search query
  const filteredSchools = schoolSearchQuery.length > 0
    ? SCHOOL_CODES.filter(school => 
        school.label.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
        school.value.toLowerCase().includes(schoolSearchQuery.toLowerCase()))
    : SCHOOL_CODES;

  return (
    <FormField
      control={form.control}
      name="school_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-medium">Centro educativo</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecciona o teu centro educativo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Buscar por código ou nome"
                  value={schoolSearchQuery}
                  onChange={(e) => setSchoolSearchQuery(e.target.value)}
                  className="mb-2 h-12"
                />
              </div>
              <div className="max-h-[250px] overflow-y-auto">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <SelectItem key={school.value} value={school.value}>
                      {school.label}
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
