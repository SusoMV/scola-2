
import { useState, useEffect } from 'react';
import { Team } from './types';

const DEFAULT_TEAMS: Team[] = [
  {
    id: 'tic',
    name: 'TIC',
    coordinator: 'Ana García',
    members: ['Manuel López', 'Carmen Rodríguez'],
    isDefault: true,
  },
  {
    id: 'convivencia',
    name: 'Convivencia e benestar',
    coordinator: 'David Pérez',
    members: ['Elena Sánchez', 'Luis Torres'],
    isDefault: true,
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    coordinator: 'María Vázquez',
    members: ['Pedro Fernández', 'Sara López'],
    isDefault: true,
  },
  {
    id: 'lingua-galega',
    name: 'Dinamización da lingua galega',
    coordinator: 'Xoán Castro',
    members: ['Antía Pérez', 'Carme Silva'],
    isDefault: true,
  },
];

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    } else {
      setTeams(DEFAULT_TEAMS);
      localStorage.setItem('teams', JSON.stringify(DEFAULT_TEAMS));
    }
  }, []);

  const handleCreateTeam = (newTeam: Omit<Team, 'id'>) => {
    const team: Team = {
      ...newTeam,
      id: crypto.randomUUID(),
    };
    const updatedTeams = [...teams, team];
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setIsCreateDialogOpen(false);
  };

  const handleDeleteTeam = (id: string) => {
    const updatedTeams = teams.filter(team => team.id !== id);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const handleEditTeam = (id: string, data: Partial<Team>) => {
    const updatedTeams = teams.map(team => 
      team.id === id ? { ...team, ...data } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  return {
    teams,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleCreateTeam,
    handleDeleteTeam,
    handleEditTeam,
  };
};
