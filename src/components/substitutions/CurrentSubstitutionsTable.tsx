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

interface CurrentSubstitutionsTableProps {
  data: {
    id: string;
    date: string;
    teacher: string;
    course: string;
    group: string;
    classroom: string;
    status: 'pending' | 'confirmed' | 'rejected';
  }[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const CurrentSubstitutionsTable: React.FC<CurrentSubstitutionsTableProps> = ({ data }) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="py-4 px-4 font-medium">{item.date}</TableCell>
            <TableCell className="py-4 px-4">{item.teacher}</TableCell>
            <TableCell className="py-4 px-4">{item.course}</TableCell>
            <TableCell className="py-4 px-4">{item.group}</TableCell>
            <TableCell className="py-4 px-4">{item.classroom}</TableCell>
            <TableCell className="py-4 px-4">
              <Badge className={statusColors[item.status]}>
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CurrentSubstitutionsTable;
