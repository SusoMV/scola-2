
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Search } from 'lucide-react';
import { Substitution } from '@/types/substitutions';
import { format } from 'date-fns';

interface HistoricalSubstitutionsTableProps {
  filteredHistoricalSubstitutions: Substitution[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HistoricalSubstitutionsTable: React.FC<HistoricalSubstitutionsTableProps> = ({
  filteredHistoricalSubstitutions,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <Card className="border border-scola-gray-dark">
      <CardHeader className="pb-2 flex flex-row justify-between items-center py-0 my-[12px]">
        <CardTitle className="text-lg font-medium flex items-center gap-2 px-0 py-0">
          <Calendar className="h-5 w-5 text-[#0070C0]" />
          Histórico de substitucións
        </CardTitle>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Buscar por nome ou data..." 
            className="pl-8 w-[250px]" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredHistoricalSubstitutions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-scola-gray-dark">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Data</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Docente ausente</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Curso</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Hora</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Substituto</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistoricalSubstitutions.map(substitution => (
                  <tr key={substitution.id} className="border-b border-scola-gray-dark hover:bg-scola-gray">
                    <td className="py-3 px-2">{format(new Date(substitution.date), 'dd/MM/yyyy')}</td>
                    <td className="py-3 px-2">{substitution.absentTeacher}</td>
                    <td className="py-3 px-2">{substitution.course}</td>
                    <td className="py-3 px-2">{substitution.time}</td>
                    <td className="py-3 px-2 font-medium">{substitution.substituteTeacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Non hai resultados que coincidan coa búsqueda</p>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalSubstitutionsTable;
