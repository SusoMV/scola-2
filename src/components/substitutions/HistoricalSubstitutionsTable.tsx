
import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Substitution } from '@/types/substitutions';

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
    <Card className="shadow-sm border-gray-200 rounded-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0070C0]" /> 
            <h2 className="text-lg font-medium">Histórico de substitucións</h2>
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredHistoricalSubstitutions && filteredHistoricalSubstitutions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium text-gray-500">Docente ausente</TableHead>
                  <TableHead className="font-medium text-gray-500">Curso</TableHead>
                  <TableHead className="font-medium text-gray-500">Hora</TableHead>
                  <TableHead className="font-medium text-gray-500">Especialidade</TableHead>
                  <TableHead className="font-medium text-gray-500">Substituto</TableHead>
                  <TableHead className="font-medium text-gray-500">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistoricalSubstitutions.map(substitution => (
                  <TableRow key={substitution.id}>
                    <TableCell className="py-4">{substitution.absentTeacher}</TableCell>
                    <TableCell className="py-4">{substitution.course}</TableCell>
                    <TableCell className="py-4">{substitution.time}</TableCell>
                    <TableCell className="py-4">{substitution.specialty || '-'}</TableCell>
                    <TableCell className="py-4 font-bold">{substitution.substituteTeacher}</TableCell>
                    <TableCell className="py-4">{substitution.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Non hai substitucións no histórico</p>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalSubstitutionsTable;
