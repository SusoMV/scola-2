
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Team, TeamMember } from '@/hooks/useTeams';
import { useFacultyMembers } from '@/hooks/useFacultyMembers';

interface EditTeamsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: Team[];
  onUpdateTeam: (team: Team) => void;
}

const EditTeamsDialog: React.FC<EditTeamsDialogProps> = ({
  open,
  onOpenChange,
  teams,
  onUpdateTeam
}) => {
  const { facultyMembers } = useFacultyMembers();
  const [activeTeamId, setActiveTeamId] = useState<string>('');
  const [editedTeams, setEditedTeams] = useState<Record<string, Team>>({});
  
  // Initialize edit state with teams data
  useEffect(() => {
    if (open) {
      const teamsRecord = teams.reduce((acc, team) => {
        acc[team.id] = { ...team };
        return acc;
      }, {} as Record<string, Team>);
      
      setEditedTeams(teamsRecord);
      if (teams.length > 0 && !activeTeamId) {
        setActiveTeamId(teams[0].id);
      }
    }
  }, [open, teams]);
  
  const toggleMember = (teamId: string, member: TeamMember) => {
    const team = editedTeams[teamId];
    if (!team) return;
    
    const memberExists = team.members.some(m => m.id === member.id);
    let updatedMembers;
    
    if (memberExists) {
      updatedMembers = team.members.filter(m => m.id !== member.id);
    } else {
      updatedMembers = [...team.members, member];
    }
    
    setEditedTeams({
      ...editedTeams,
      [teamId]: {
        ...team,
        members: updatedMembers
      }
    });
  };
  
  const toggleCoordinator = (teamId: string, memberId: string) => {
    const team = editedTeams[teamId];
    if (!team) return;
    
    const updatedMembers = team.members.map(member => ({
      ...member,
      isCoordinator: member.id === memberId
    }));
    
    setEditedTeams({
      ...editedTeams,
      [teamId]: {
        ...team,
        members: updatedMembers
      }
    });
  };
  
  const handleSave = () => {
    Object.values(editedTeams).forEach(team => {
      onUpdateTeam(team);
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar equipos</DialogTitle>
        </DialogHeader>
        
        {teams.length > 0 && (
          <Tabs value={activeTeamId} onValueChange={setActiveTeamId}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {teams.map((team) => (
                <TabsTrigger key={team.id} value={team.id} className="text-xs">
                  {team.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {teams.map((team) => (
              <TabsContent key={team.id} value={team.id} className="mt-4">
                <h3 className="text-lg font-medium mb-3">{editedTeams[team.id]?.name}</h3>
                
                <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                  {facultyMembers.map((faculty) => {
                    const currentTeam = editedTeams[team.id];
                    if (!currentTeam) return null;
                    
                    const isMember = currentTeam.members.some(m => m.id === faculty.id);
                    const isCoordinator = currentTeam.members.find(m => m.id === faculty.id)?.isCoordinator;
                    
                    return (
                      <div key={faculty.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                        <div className="flex items-center">
                          <Checkbox 
                            id={`edit-member-${team.id}-${faculty.id}`}
                            checked={isMember}
                            onCheckedChange={() => 
                              toggleMember(team.id, {
                                id: faculty.id,
                                name: faculty.name,
                                isCoordinator: isCoordinator || false
                              })
                            }
                          />
                          <Label 
                            htmlFor={`edit-member-${team.id}-${faculty.id}`}
                            className="ml-2 cursor-pointer"
                          >
                            {faculty.name}
                          </Label>
                        </div>
                        
                        {isMember && (
                          <div className="flex items-center">
                            <Checkbox 
                              id={`edit-coordinator-${team.id}-${faculty.id}`}
                              checked={isCoordinator || false}
                              onCheckedChange={() => toggleCoordinator(team.id, faculty.id)}
                            />
                            <Label 
                              htmlFor={`edit-coordinator-${team.id}-${faculty.id}`}
                              className="ml-2 cursor-pointer text-xs"
                            >
                              Coordinador
                            </Label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            Gardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamsDialog;
