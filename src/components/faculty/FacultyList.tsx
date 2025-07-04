import React from 'react';
import { Search, MessageSquare, Trash2, Users, Clock, Cog } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  onScheduleClick: (member: FacultyMember) => void;
  onCoordinationsClick: (member: FacultyMember) => void;
}

const FacultyList = ({
  facultyMembers,
  searchQuery,
  setSearchQuery,
  isLoading,
  isDirector,
  onMessageClick,
  onDeleteClick,
  onScheduleClick,
  onCoordinationsClick
}: FacultyListProps) => {
  const filteredMembers = facultyMembers.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.specialty.toLowerCase().includes(searchQuery.toLowerCase()));

  return <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Users className="h-6 w-6 text-scola-primary" />
          <h3>Membros do claustro</h3>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          {isDirector && <Button className="bg-scola-primary hover:bg-scola-primary/90 text-white" onClick={() => onMessageClick({
          id: 'new',
          name: '',
          role: 'docente',
          specialty: '',
          email: ''
        })}>
              <span className="mr-2 text-center mx-0 py-0 font-light text-xl">+</span> Añadir membro
            </Button>}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Buscar profesor..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="py-3">Nome e apelidos</TableHead>
              <TableHead className="py-3">Cargo</TableHead>
              <TableHead className="py-3">Especialidade</TableHead>
              <TableHead className="text-right py-3">Accións</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Cargando membros do claustro...
                </TableCell>
              </TableRow> : filteredMembers.length > 0 ? filteredMembers.map(member => <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${member.role === 'directivo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
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

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600"
                        onClick={() => onScheduleClick(member)}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="sr-only">Ver horario</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600"
                        onClick={() => onCoordinationsClick(member)}
                      >
                        <Cog className="h-4 w-4" />
                        <span className="sr-only">Xestionar coordinacións</span>
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
                </TableRow>) : <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Non se atoparon resultados
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>
    </>;
};

export default FacultyList;
