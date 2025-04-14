import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Plus } from 'lucide-react';
import { Substitution } from '@/types/substitutions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  return <Card className="shadow-sm border-gray-200 rounded-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0070C0]" /> 
            <h2 className="text-lg font-medium">Substitucións actuais</h2>
          </div>
          {isDirector}
        </div>
        
        {substitutions && substitutions.length > 0 ? <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium text-gray-500">Docente ausente</TableHead>
                  <TableHead className="font-medium text-gray-500">Curso</TableHead>
                  <TableHead className="font-medium text-gray-500">Hora</TableHead>
                  <TableHead className="font-medium text-gray-500">Substituto</TableHead>
                  <TableHead className="font-medium text-gray-500">Visto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {substitutions.map(substitution => <TableRow key={substitution.id}>
                    <TableCell className="py-4">{substitution.absentTeacher}</TableCell>
                    <TableCell className="py-4">{substitution.course}</TableCell>
                    <TableCell className="py-4">{substitution.time}</TableCell>
                    <TableCell className="py-4 font-bold rounded-none">{substitution.substituteTeacher}</TableCell>
                    <TableCell className="py-4">
                      <Checkbox checked={substitution.seen} onCheckedChange={() => handleToggleSeen(substitution.id)} className="data-[state=checked]:bg-[#0070C0] data-[state=checked]:border-[#0070C0]" />
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div> : <p className="text-center py-4 text-gray-500">Non hai substitucións actuais</p>}
      </CardContent>
    </Card>;
};
export default CurrentSubstitutionsTable;