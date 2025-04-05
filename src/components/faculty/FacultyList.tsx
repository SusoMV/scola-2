
import React from 'react';
import { Search, MessageSquare, Trash2, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface FacultyMember {
  id: string;
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

interface FacultyListProps {
  facultyMembers: FacultyMember[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  isDirector: boolean;
  onMessageClick: (member: FacultyMember) => void;
  onDeleteClick: (member: FacultyMember) => void;
}

const FacultyList = ({
  facultyMembers,
  searchQuery,
  setSearchQuery,
  isLoading,
  isDirector,
  onMessageClick,
  onDeleteClick
}: FacultyListProps) => {
  // Filter faculty members based on search query
  const filteredMembers = facultyMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Users className="h-5 w-5 text-[#0070C0]" />
          Membros do claustro
        </h3>
        <div className="w-full sm:w-64 relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar profesor..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome e apelidos</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead className="text-right">Accións</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Cargando membros do claustro...
                </TableCell>
              </TableRow>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      member.role === 'directivo' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {member.role === 'directivo' ? 'Directivo' : 'Docente'}
                    </span>
                  </TableCell>
                  <TableCell>{member.specialty}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-blue-600"
                        onClick={() => onMessageClick(member)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Enviar mensaxe</span>
                      </Button>
                      
                      {isDirector && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => onDeleteClick(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Non se atoparon resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FacultyList;
