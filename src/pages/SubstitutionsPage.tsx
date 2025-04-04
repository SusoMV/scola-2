
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Substitution {
  id: string;
  absentTeacher: string;
  substituteTeacher: string;
  course: string;
  time: string;
  reason: string;
  seen: boolean;
}

const SubstitutionsPage = () => {
  // Mock data for substitutions
  const substitutions: Substitution[] = [
    {
      id: '1',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true
    },
    {
      id: '2',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: false
    },
    {
      id: '3',
      absentTeacher: 'David Martínez',
      substituteTeacher: 'Pablo Sánchez',
      course: '5º Primaria',
      time: '12:30 - 14:30',
      reason: 'Persoal',
      seen: false
    }
  ];

  // Mock data for historical substitutions
  const historicalSubstitutions: Substitution[] = [
    {
      id: '4',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true
    },
    {
      id: '5',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: true
    }
  ];

  // Function to handle marking a substitution as seen
  const handleToggleSeen = (id: string) => {
    console.log(`Toggled seen status for substitution ${id}`);
    // In a real app, this would update the state or make an API call
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Substitucións</h1>
        <div className="w-32 h-1 mt-2 dotted-border"></div>
      </div>

      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Actuais</TabsTrigger>
          <TabsTrigger value="historical">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Substitucións actuais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {substitutions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-scola-gray-dark">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Docente ausente</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Curso</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Substituto</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Visto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {substitutions.map((substitution) => (
                        <tr key={substitution.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2">{substitution.absentTeacher}</td>
                          <td className="py-3 px-2">{substitution.course}</td>
                          <td className="py-3 px-2">{substitution.time}</td>
                          <td className="py-3 px-2 font-medium">{substitution.substituteTeacher}</td>
                          <td className="py-3 px-2">
                            <Checkbox 
                              checked={substitution.seen} 
                              onCheckedChange={() => handleToggleSeen(substitution.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">Non hai substitucións actuais</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historical">
          <Card className="border border-scola-gray-dark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Histórico de substitucións
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historicalSubstitutions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-scola-gray-dark">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Docente ausente</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Curso</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Substituto</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Motivo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalSubstitutions.map((substitution) => (
                        <tr key={substitution.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                          <td className="py-3 px-2">{substitution.absentTeacher}</td>
                          <td className="py-3 px-2">{substitution.course}</td>
                          <td className="py-3 px-2">{substitution.time}</td>
                          <td className="py-3 px-2 font-medium">{substitution.substituteTeacher}</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">{substitution.reason}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">Non hai histórico de substitucións</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SubstitutionsPage;
