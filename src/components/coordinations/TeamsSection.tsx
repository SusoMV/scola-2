
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useTeams } from './useTeams';
import { TeamCard } from './TeamCard';
import { CreateTeamDialog } from './CreateTeamDialog';

export const TeamsSection = () => {
  const { 
    teams,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleCreateTeam,
    handleDeleteTeam,
    handleEditTeam
  } = useTeams();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Crear novo equipo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onDelete={handleDeleteTeam}
            onEdit={handleEditTeam}
          />
        ))}
      </div>

      <CreateTeamDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateTeam}
      />
    </div>
  );
};
