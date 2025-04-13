
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Header from '@/components/substitutions/Header';
import CurrentSubstitutionsTable from '@/components/substitutions/CurrentSubstitutionsTable';
import HistoricalSubstitutionsTable from '@/components/substitutions/HistoricalSubstitutionsTable';
import CreateSubstitutionDialog from '@/components/substitutions/CreateSubstitutionDialog';
import { Substitution } from '@/types/substitutions';
import { useAuth } from '@/contexts/AuthContext';

const SubstitutionsPage = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isDirector = true;
  
  const [substitutions, setSubstitutions] = useState<Substitution[]>([
    {
      id: '1',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-04-04',
      status: 'confirmed',
      group: '4A',
      classroom: 'Aula 101'
    },
    {
      id: '2',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: false,
      date: '2025-04-04',
      status: 'pending',
      group: '2B',
      classroom: 'Aula 205'
    },
    {
      id: '3',
      absentTeacher: 'David Martínez',
      substituteTeacher: 'Pablo Sánchez',
      course: '5º Primaria',
      time: '12:30 - 14:30',
      reason: 'Persoal',
      seen: false,
      date: '2025-04-04',
      status: 'rejected',
      group: '5C',
      classroom: 'Aula 302'
    }
  ]);
  
  const [historicalSubstitutions, setHistoricalSubstitutions] = useState<Substitution[]>([
    {
      id: '4',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-30'
    },
    {
      id: '5',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: true,
      date: '2025-03-28'
    },
    {
      id: '6',
      absentTeacher: 'Manuel Torres',
      substituteTeacher: 'Elena Rivas',
      course: '1º Primaria',
      time: '10:00 - 12:00',
      reason: 'Enfermidade',
      seen: true,
      date: '2025-03-25'
    },
    {
      id: '7',
      absentTeacher: 'Sara López',
      substituteTeacher: 'Pablo Sánchez',
      course: '6º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-20'
    }
  ]);

  const handleToggleSeen = (id: string) => {
    setSubstitutions(substitutions.map(sub => 
      sub.id === id ? { ...sub, seen: !sub.seen } : sub
    ));
  };

  const handleSubmitSubstitution = (data: any) => {
    const newSubstitution: Substitution = {
      id: Date.now().toString(),
      absentTeacher: data.absentTeacher,
      substituteTeacher: data.substituteTeacher,
      course: data.course,
      time: `${data.startTime} - ${data.endTime}`,
      reason: data.reason,
      seen: false,
      date: data.date,
      status: 'pending',
      group: data.group || '',
      classroom: data.classroom || ''
    };

    if (data.date === format(new Date(), 'yyyy-MM-dd')) {
      setSubstitutions([...substitutions, newSubstitution]);
    } else {
      setHistoricalSubstitutions([...historicalSubstitutions, newSubstitution]);
    }
    
    setOpenDialog(false);
  };

  const filteredHistoricalSubstitutions = historicalSubstitutions.filter(sub => {
    const searchLower = searchQuery.toLowerCase();
    return (
      sub.absentTeacher.toLowerCase().includes(searchLower) || 
      sub.substituteTeacher.toLowerCase().includes(searchLower) || 
      sub.course.toLowerCase().includes(searchLower) || 
      sub.date.includes(searchQuery) || 
      sub.reason.toLowerCase().includes(searchLower)
    );
  });

  const absentTeachers = ['Carlos Rodríguez', 'Lucía Fernández', 'David Martínez', 'Sara López', 'Manuel Torres'];
  const substituteTeachers = ['María López', 'Ana García', 'Pablo Sánchez', 'Elena Rivas'];

  return (
    <DashboardLayout>
      <Header isDirector={isDirector} />

      <div className="flex justify-between mb-6">
        <Tabs defaultValue="current" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="current">
                Hoxe
              </TabsTrigger>
              <TabsTrigger value="historical">
                Histórico
              </TabsTrigger>
            </TabsList>
            
            {isDirector && (
              <Button 
                className="bg-[#0070C0] hover:bg-[#0070C0]/90 text-white"
                onClick={() => setOpenDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Crear Ausencia
              </Button>
            )}
          </div>
          
          <TabsContent value="current">
            <CurrentSubstitutionsTable 
              substitutions={substitutions}
              handleToggleSeen={handleToggleSeen}
              openCreateDialog={() => setOpenDialog(true)}
              isDirector={isDirector}
            />
          </TabsContent>
          
          <TabsContent value="historical">
            <HistoricalSubstitutionsTable
              filteredHistoricalSubstitutions={filteredHistoricalSubstitutions}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>
        </Tabs>
      </div>

      <CreateSubstitutionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={handleSubmitSubstitution}
        absentTeachers={absentTeachers}
        substituteTeachers={substituteTeachers}
      />
    </DashboardLayout>
  );
};

export default SubstitutionsPage;
