
import { useState, useEffect } from 'react';
import { useFacultyMembers } from '@/hooks/useFacultyMembers';
import { toast } from 'sonner';

export interface TeamMember {
  id: string;
  name: string;
  isCoordinator: boolean;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  isCustom: boolean;
}

export function useTeams() {
  const { facultyMembers } = useFacultyMembers();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isEditingTeams, setIsEditingTeams] = useState(false);
  const [isDeletingTeam, setIsDeletingTeam] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Initialize with default teams
  useEffect(() => {
    const storedTeams = localStorage.getItem('teaching-teams');
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    } else {
      // Create default teams if nothing is stored
      const defaultTeams: Team[] = [
        {
          id: 'tic',
          name: 'TIC',
          isCustom: false,
          members: [
            { id: '1', name: 'Ana García Martínez', isCoordinator: true },
            { id: '2', name: 'Manuel López Fernández', isCoordinator: false }
          ]
        },
        {
          id: 'convivencia',
          name: 'Convivencia e benestar',
          isCustom: false,
          members: [
            { id: '5', name: 'Elena Sánchez Gómez', isCoordinator: true },
            { id: '3', name: 'Carmen Rodríguez Vázquez', isCoordinator: false }
          ]
        },
        {
          id: 'biblioteca',
          name: 'Biblioteca',
          isCustom: false,
          members: [
            { id: '4', name: 'David Pérez Santos', isCoordinator: true },
            { id: '1', name: 'Ana García Martínez', isCoordinator: false }
          ]
        },
        {
          id: 'lingua-galega',
          name: 'Dinamización da lingua galega',
          isCustom: false,
          members: [
            { id: '3', name: 'Carmen Rodríguez Vázquez', isCoordinator: true },
            { id: '2', name: 'Manuel López Fernández', isCoordinator: false },
            { id: '5', name: 'Elena Sánchez Gómez', isCoordinator: false }
          ]
        }
      ];
      
      setTeams(defaultTeams);
      localStorage.setItem('teaching-teams', JSON.stringify(defaultTeams));
    }
  }, []);

  // Save teams to localStorage whenever they change
  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem('teaching-teams', JSON.stringify(teams));
    }
  }, [teams]);

  const createTeam = (newTeam: Omit<Team, 'id' | 'isCustom'>) => {
    const teamId = `team-${Date.now()}`;
    const team: Team = {
      id: teamId,
      ...newTeam,
      isCustom: true
    };
    
    setTeams([...teams, team]);
    toast.success(`Equipo ${newTeam.name} creado correctamente`);
  };

  const updateTeam = (updatedTeam: Team) => {
    const updatedTeams = teams.map(team => 
      team.id === updatedTeam.id ? updatedTeam : team
    );
    
    setTeams(updatedTeams);
    toast.success(`Equipo ${updatedTeam.name} actualizado correctamente`);
  };

  const deleteTeam = (teamId: string) => {
    const filteredTeams = teams.filter(team => team.id !== teamId);
    setTeams(filteredTeams);
    toast.success('Equipo eliminado correctamente');
  };

  return {
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
  };
}
