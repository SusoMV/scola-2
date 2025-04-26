
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Substitution } from '@/types/substitutions';
import { useToast } from '@/hooks/use-toast';

interface UpcomingAbsencesTableProps {
  upcomingAbsences: Substitution[];
}

const UpcomingAbsencesTable: React.FC<UpcomingAbsencesTableProps> = ({ 
  upcomingAbsences 
}) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Here we would typically call an API to delete the absence
    toast({
      title: "Ausencia eliminada",
      description: "A ausencia foi eliminada correctamente",
    });
  };

  if (upcomingAbsences.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm p-4">
        Non hai ausencias programadas
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Docente</TableHead>
            <TableHead>Substituto/a</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Especialidade</TableHead>
            <TableHead className="text-right">Accións</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingAbsences.map((absence) => (
            <TableRow key={absence.id}>
              <TableCell>{absence.date}</TableCell>
              <TableCell>{absence.absentTeacher}</TableCell>
              <TableCell>{absence.substituteTeacher}</TableCell>
              <TableCell>{absence.course}</TableCell>
              <TableCell>{absence.time}</TableCell>
              <TableCell>{absence.specialty}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(absence.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpcomingAbsencesTable;
