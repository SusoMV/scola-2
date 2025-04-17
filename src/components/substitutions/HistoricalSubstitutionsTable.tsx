
import React, { useState } from 'react';
import { Calendar, Search, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Substitution } from '@/types/substitutions';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [sortField, setSortField] = useState<keyof Substitution | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Substitution) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubstitutions = [...filteredHistoricalSubstitutions].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  return (
    <Card className="shadow-sm border-gray-200 rounded-md">
      <CardContent className={isMobile ? "p-2" : "p-6"}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className={isMobile ? "h-4 w-4 text-[#0070C0]" : "h-5 w-5 text-[#0070C0]"} /> 
            <h2 className={isMobile ? "text-base font-medium" : "text-lg font-medium"}>Histórico de substitucións</h2>
          </div>
          <div className={isMobile ? "relative max-w-[120px]" : "relative max-w-xs"}>
            <Search className={isMobile ? "absolute left-2 top-2 h-3 w-3 text-gray-500" : "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"} />
            <Input
              type="search"
              placeholder="Buscar..."
              className={isMobile ? "pl-7 w-full text-xs h-7" : "pl-8 w-full"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {sortedSubstitutions && sortedSubstitutions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className={`font-medium text-gray-500 cursor-pointer ${isMobile ? "text-xs p-2" : ""}`}
                    onClick={() => handleSort('absentTeacher')}
                  >
                    <div className="flex items-center gap-1">
                      Docente ausente
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className={`font-medium text-gray-500 cursor-pointer ${isMobile ? "text-xs p-2" : ""}`}
                    onClick={() => handleSort('course')}
                  >
                    <div className="flex items-center gap-1">
                      Curso
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className={`font-medium text-gray-500 ${isMobile ? "text-xs p-2" : ""}`}
                  >
                    Hora
                  </TableHead>
                  <TableHead 
                    className={`font-medium text-gray-500 cursor-pointer ${isMobile ? "text-xs p-2" : ""}`}
                    onClick={() => handleSort('specialty')}
                  >
                    <div className="flex items-center gap-1">
                      Especialidade
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className={`font-medium text-gray-500 cursor-pointer ${isMobile ? "text-xs p-2" : ""}`}
                    onClick={() => handleSort('substituteTeacher')}
                  >
                    <div className="flex items-center gap-1">
                      Substituto
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className={`font-medium text-gray-500 cursor-pointer ${isMobile ? "text-xs p-2" : ""}`}
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Data
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubstitutions.map(substitution => (
                  <TableRow key={substitution.id}>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.absentTeacher}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.course}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.time}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.specialty || '-'}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs font-bold" : "py-4 font-bold"}>{substitution.substituteTeacher}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-2 text-gray-500 text-sm">Non hai substitucións no histórico</p>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoricalSubstitutionsTable;
