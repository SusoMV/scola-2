
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import { Substitution } from '@/types/substitutions';

interface CurrentSubstitutionsTableProps {
  substitutions: Substitution[];
  handleToggleSeen: (id: string) => void;
}

const CurrentSubstitutionsTable: React.FC<CurrentSubstitutionsTableProps> = ({
  substitutions,
  handleToggleSeen
}) => {
  return (
    <Card className="border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#0070C0]" /> 
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
                {substitutions.map(substitution => (
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
  );
};

export default CurrentSubstitutionsTable;
