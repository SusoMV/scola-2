
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditTeamDialog } from './EditTeamDialog';
import { Team } from './types';

interface TeamCardProps {
  team: Team;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: Partial<Team>) => void;
}

export const TeamCard = ({ team, onDelete, onEdit }: TeamCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  return (
    <Card className="h-full border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold text-scola-primary">{team.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditDialogOpen(true)}
            className="hover:bg-scola-pastel"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          {!team.isDefault && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-scola-pastel">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar equipo</AlertDialogTitle>
                  <AlertDialogDescription>
                    Estás seguro de que queres eliminar este equipo? Esta acción non se pode desfacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(team.id)}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-gray-600 font-medium">Coordinador:</div>
          <div className="font-bold text-scola-primary">{team.coordinator}</div>
          <div className="text-sm text-gray-600 font-medium mt-4">Membros:</div>
          <ul className="list-disc list-inside space-y-1">
            {team.members.map((member, index) => (
              <li key={index} className="text-xs text-gray-600">
                {member}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <EditTeamDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        team={team}
        onSubmit={(data) => onEdit(team.id, data)}
      />
    </Card>
  );
};
