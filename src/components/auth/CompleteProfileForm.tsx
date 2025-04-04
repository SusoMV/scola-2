
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ScolaLogo from '@/components/ScolaLogo';

const specializations = [
  { id: '597031', name: 'Infantil' },
  { id: '597032', name: 'Inglés' },
  { id: '597033', name: 'Francés' },
  { id: '597034', name: 'Educación Física' },
  { id: '597035', name: 'Música' },
  { id: '597036', name: 'Pedagoxía Terapéutica' },
  { id: '597037', name: 'Audición e Linguaxe' },
  { id: '597038', name: 'Primaria' },
  { id: '597939', name: 'Orientación' },
];

// Mock data for schools (in a real app this would come from an API or database)
const schools = [
  { id: '15000016', name: 'CEIP San Marcos' },
  { id: '15000028', name: 'IES Rosalía de Castro' },
  { id: '15000031', name: 'CEIP Ramón Cabanillas' },
  { id: '15000043', name: 'IES Xelmírez I' },
  { id: '15000057', name: 'CEIP A Ponte' },
];

const CompleteProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [school, setSchool] = useState('');
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = schools.filter(
    (school) => 
      school.id.includes(searchQuery) || 
      school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile completion:', { fullName, school, role, specialization });
    
    // Mock profile completion success for demo purposes
    if (fullName && school && role && specialization) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <ScolaLogo size="lg" />
        <h2 className="mt-4 text-2xl font-bold text-scola-primary">Completar perfil</h2>
        <div className="w-40 h-1 mt-2 dotted-border"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Nome e apelidos
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="school">
            Centro educativo
          </Label>
          <Select value={school} onValueChange={setSchool} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un centro" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Buscar por código ou nome"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
              </div>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.id} - {school.name}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500">
                  Non se atoparon resultados
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">
            Cargo
          </Label>
          <Select value={role} onValueChange={setRole} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="docente">Docente</SelectItem>
              <SelectItem value="directivo">Directivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialization">
            Especialidade
          </Label>
          <Select value={specialization} onValueChange={setSpecialization} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona unha especialidade" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec.id} value={spec.id}>
                  {spec.id} {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-scola-primary hover:bg-scola-primary-light"
        >
          Completar rexistro
        </Button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
