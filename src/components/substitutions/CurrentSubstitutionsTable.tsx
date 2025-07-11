import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Calendar, Plus } from 'lucide-react';
import { Substitution } from '@/types/substitutions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <Card className="shadow-sm border-gray-200 rounded-md">
      <CardContent className={isMobile ? "p-2" : "p-6"}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className={isMobile ? "h-4 w-4 text-[#0070C0]" : "h-5 w-5 text-[#0070C0]"} /> 
            <h2 className={isMobile ? "text-base font-medium" : "text-lg font-medium"}>Substitucións actuais</h2>
          </div>
          {isDirector}
        </div>
        
        {substitutions && substitutions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Docente ausente</TableHead>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Curso</TableHead>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Hora</TableHead>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Especialidade</TableHead>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Substituto</TableHead>
                  <TableHead className={isMobile ? "font-medium text-gray-500 text-xs p-2" : "font-medium text-gray-500"}>Visto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {substitutions.map(substitution => (
                  <TableRow key={substitution.id}>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.absentTeacher}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.course}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.time}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>{substitution.specialty || '-'}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs font-bold" : "py-4 font-bold"}>{substitution.substituteTeacher}</TableCell>
                    <TableCell className={isMobile ? "py-1 px-2 text-xs" : "py-4"}>
                      <Switch 
                        checked={substitution.seen} 
                        onCheckedChange={() => handleToggleSeen(substitution.id)}
                        className="data-[state=checked]:bg-[#0070C0]"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Non hai substitucións actuais</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentSubstitutionsTable;
