
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { Absence } from './types';

interface AbsencesTableProps {
  absences: Absence[];
  onToggleJustified: (absenceId: number) => void;
}

const AbsencesTable: React.FC<AbsencesTableProps> = ({ absences, onToggleJustified }) => {
  if (absences.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Non hai faltas de asistencia rexistradas
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alumno/a</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Horario</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Accións</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {absences.map(absence => (
          <TableRow key={absence.id}>
            <TableCell>{absence.studentName}</TableCell>
            <TableCell>{format(absence.date, 'dd/MM/yyyy')}</TableCell>
            <TableCell>{absence.startTime} - {absence.endTime}</TableCell>
            <TableCell>
              {absence.justified ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" /> Xustificada
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <X className="w-3 h-3 mr-1" /> Non xustificada
                </span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={absence.justified} 
                  onCheckedChange={() => onToggleJustified(absence.id)} 
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AbsencesTable;
