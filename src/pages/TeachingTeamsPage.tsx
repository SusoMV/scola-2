
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Edit, PlusSquare, Trash2 } from 'lucide-react';
import CreateTeamDialog from '@/components/teams/CreateTeamDialog';
import EditTeamsDialog from '@/components/teams/EditTeamsDialog';
import DeleteTeamDialog from '@/components/teams/DeleteTeamDialog';
import { useTeams } from '@/hooks/useTeams';

const TeachingTeamsPage = () => {
  const { 
    teams, 
    isCreatingTeam, 
    setIsCreatingTeam,
    isEditingTeams,
    setIsEditingTeams,
    isDeletingTeam,
    setIsDeletingTeam,
    selectedTeamId,
    setSelectedTeamId,
    createTeam,
    updateTeam,
    deleteTeam
  } = useTeams();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Coordinacións e equipos</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <div className="flex justify-end space-x-2 mb-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => setIsEditingTeams(true)}
        >
          <Edit className="h-4 w-4" />
          <span>Editar equipos</span>
        </Button>
        
        <Button 
          className="flex items-center gap-2" 
          onClick={() => setIsCreatingTeam(true)}
        >
          <PlusSquare className="h-4 w-4" />
          <span>Crear novo equipo</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {teams.map((team) => (
          <Card key={team.id} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {team.name}
              </CardTitle>
              {team.isCustom && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    setIsDeletingTeam(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {team.members.map((member) => (
                  <li key={member.id} className={member.isCoordinator ? "font-bold" : ""}>
                    {member.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateTeamDialog 
        open={isCreatingTeam} 
        onOpenChange={setIsCreatingTeam}
        onCreateTeam={createTeam}
      />

      <EditTeamsDialog 
        open={isEditingTeams} 
        onOpenChange={setIsEditingTeams}
        teams={teams}
        onUpdateTeam={updateTeam}
      />

      <DeleteTeamDialog 
        open={isDeletingTeam} 
        onOpenChange={setIsDeletingTeam}
        onDelete={() => {
          if (selectedTeamId) {
            deleteTeam(selectedTeamId);
            setSelectedTeamId(null);
          }
        }}
      />
    </DashboardLayout>
  );
};

export default TeachingTeamsPage;
