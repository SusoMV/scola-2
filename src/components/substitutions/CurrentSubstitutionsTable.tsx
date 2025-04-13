
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Substitution } from '@/types/substitutions';
import { Check, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CurrentSubstitutionsTableProps {
  substitutions: Substitution[];
  handleToggleSeen?: (id: string) => void;
  openCreateDialog?: () => void;
  isDirector?: boolean;
}

const statusMap: Record<string, string> = {
  'pending': 'Pendente',
  'confirmed': 'Confirmada',
  'rejected': 'Rexeitada'
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const CurrentSubstitutionsTable: React.FC<CurrentSubstitutionsTableProps> = ({ 
  substitutions,
  handleToggleSeen,
  openCreateDialog,
  isDirector
}) => {
  if (!substitutions || substitutions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 mb-4">Non hai substitucións para hoxe</p>
        {isDirector && openCreateDialog && (
          <Button 
            onClick={openCreateDialog}
            className="bg-[#0070C0] hover:bg-[#0070C0]/90 text-white"
          >
            Crear Substitución
          </Button>
        )}
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Substitucións actuais</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Profesor/a</TableHead>
          <TableHead>Materia</TableHead>
          <TableHead>Grupo</TableHead>
          <TableHead>Aula</TableHead>
          <TableHead>Estado</TableHead>
          {handleToggleSeen && <TableHead className="w-[80px]">Acción</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {substitutions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="py-4 px-4 font-medium">{item.date}</TableCell>
            <TableCell className="py-4 px-4">{item.absentTeacher}</TableCell>
            <TableCell className="py-4 px-4">{item.course}</TableCell>
            <TableCell className="py-4 px-4">
              {item.group || '-'}
            </TableCell>
            <TableCell className="py-4 px-4">
              {item.classroom || '-'}
            </TableCell>
            <TableCell className="py-4 px-4">
              <Badge className={statusColors[item.status] || statusColors.pending}>
                {statusMap[item.status] || 'Pendente'}
              </Badge>
            </TableCell>
            {handleToggleSeen && (
              <TableCell className="py-4 px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleSeen(item.id)}
                  title={item.seen ? "Marcar como non visto" : "Marcar como visto"}
                >
                  {item.seen ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CurrentSubstitutionsTable;
