
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SCHOOLS } from '@/components/auth/complete-profile/constants';

interface ProfileDataSectionProps {
  isEditing: boolean;
  profileData: {
    full_name: string;
    email: string;
    school_name: string;
    specialty: string;
    role: string;
  };
  editFormData: {
    full_name: string;
    email: string;
    school_name: string;
    specialty: string;
  };
  specialties: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  searchSchool: string;
  setSearchSchool: (value: string) => void;
  filteredSchools: string[];
}

const ProfileDataSection = ({
  isEditing,
  profileData,
  editFormData,
  specialties,
  handleInputChange,
  handleSelectChange,
  searchSchool,
  setSearchSchool,
  filteredSchools
}: ProfileDataSectionProps) => {
  if (isEditing) {
    return <div className="flex-1 space-y-4">
        <div>
          <Label htmlFor="full_name">Nome e apelidos</Label>
          <Input id="full_name" name="full_name" value={editFormData.full_name} onChange={handleInputChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={editFormData.email} onChange={handleInputChange} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="school_name">Centro educativo</Label>
          <Select name="school_name" value={editFormData.school_name} onValueChange={value => handleSelectChange("school_name", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona o centro educativo" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input placeholder="Buscar centro por nome ou código" value={searchSchool} onChange={e => setSearchSchool(e.target.value)} className="mb-2" />
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredSchools.length > 0 ? filteredSchools.map(school => <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>) : <div className="p-2 text-center text-gray-500">
                    Non se atoparon resultados
                  </div>}
              </div>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="specialty">Especialidade</Label>
          <Select name="specialty" value={editFormData.specialty} onValueChange={value => handleSelectChange("specialty", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona a túa especialidade" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map(specialty => <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>;
  }

  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto py-0 px-px max-w-5xl">
      <Card className="p-4 bg-white rounded-lg shadow-sm border-[#0070C0] border-dashed border-[1px]">
        <p className="text-sm text-gray-500">Nome e apelidos</p>
        <p className="font-medium text-lg">{profileData.full_name}</p>
      </Card>

      <Card className="p-4 bg-white rounded-lg shadow-sm border-[#0070C0] border-dashed border-[1px]">
        <p className="text-sm text-gray-500">Cargo</p>
        <p className="font-medium text-lg">{profileData.role === 'directivo' ? 'Directivo' : 'Docente'}</p>
      </Card>

      <Card className="p-4 bg-white rounded-lg shadow-sm border-[#0070C0] border-dashed border-[1px]">
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium text-lg">{profileData.email}</p>
      </Card>

      <Card className="p-4 bg-white rounded-lg shadow-sm border-[#0070C0] border-dashed border-[1px]">
        <p className="text-sm text-gray-500">Especialidade</p>
        <p className="font-medium text-lg">{profileData.specialty}</p>
      </Card>

      <Card className="p-4 bg-white rounded-lg shadow-sm border-[#0070C0] border-dashed border-[1px] md:col-span-2">
        <p className="text-sm text-gray-500">Centro educativo</p>
        <p className="font-medium text-lg">{profileData.school_name}</p>
      </Card>
    </div>;
};

export default ProfileDataSection;
