
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Plus } from 'lucide-react';
import { Substitution } from '@/types/substitutions';
import { Button } from '@/components/ui/button';

interface CurrentSubstitutionsTableProps {
  substitutions: Substitution[];
  handleToggleSeen: (id: string) => void;
  openCreateDialog: () => void;
  isDirector: boolean;
}

const CurrentSubstitutionsTable: React.FC<CurrentSubstitutionsTableProps> = ({
  substitutions,
  handleToggleSeen,
  openCreateDialog,
  isDirector
}) => {
  return (
    <Card className="shadow-sm border-gray-200 rounded-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0070C0]" /> 
            <h2 className="text-lg font-medium">Substitucións actuais</h2>
          </div>
        </div>
        
        {substitutions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Docente ausente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Curso</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Substituto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Visto</th>
                </tr>
              </thead>
              <tbody>
                {substitutions.map(substitution => (
                  <tr key={substitution.id} className="border-t border-gray-200">
                    <td className="py-4 px-4">{substitution.absentTeacher}</td>
                    <td className="py-4 px-4">{substitution.course}</td>
                    <td className="py-4 px-4">{substitution.time}</td>
                    <td className="py-4 px-4">{substitution.substituteTeacher}</td>
                    <td className="py-4 px-4">
                      <Checkbox 
                        checked={substitution.seen} 
                        onCheckedChange={() => handleToggleSeen(substitution.id)} 
                        className="data-[state=checked]:bg-[#0070C0] data-[state=checked]:border-[#0070C0]"
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
  );
};

export default CurrentSubstitutionsTable;
