
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Team, TeamMember } from '@/hooks/useTeams';
import { useFacultyMembers } from '@/hooks/useFacultyMembers';

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: (team: Omit<Team, 'id' | 'isCustom'>) => void;
}

const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({
  open,
  onOpenChange,
  onCreateTeam
}) => {
  const { facultyMembers } = useFacultyMembers();
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (teamName.trim() === '') {
      return;
    }
    
    onCreateTeam({
      name: teamName,
      members: selectedMembers
    });
    
    // Reset form
    setTeamName('');
    setSelectedMembers([]);
    onOpenChange(false);
  };
  
  const toggleMember = (member: TeamMember) => {
    const exists = selectedMembers.some(m => m.id === member.id);
    
    if (exists) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };
  
  const toggleCoordinator = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.map(member => ({
        ...member,
        isCoordinator: member.id === memberId
      }))
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear novo equipo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="team-name">Nome do equipo</Label>
              <Input
                id="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Introduce o nome do equipo"
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label>Integrantes</Label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto">
                {facultyMembers.map((faculty) => {
                  const isMember = selectedMembers.some(m => m.id === faculty.id);
                  const isCoordinator = selectedMembers.find(m => m.id === faculty.id)?.isCoordinator;
                  
                  return (
                    <div key={faculty.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <Checkbox 
                          id={`member-${faculty.id}`}
                          checked={isMember}
                          onCheckedChange={() => 
                            toggleMember({
                              id: faculty.id,
                              name: faculty.name,
                              isCoordinator: isCoordinator || false
                            })
                          }
                        />
                        <Label 
                          htmlFor={`member-${faculty.id}`}
                          className="ml-2 cursor-pointer"
                        >
                          {faculty.name}
                        </Label>
                      </div>
                      
                      {isMember && (
                        <div className="flex items-center">
                          <Checkbox 
                            id={`coordinator-${faculty.id}`}
                            checked={isCoordinator || false}
                            onCheckedChange={() => toggleCoordinator(faculty.id)}
                          />
                          <Label 
                            htmlFor={`coordinator-${faculty.id}`}
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
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={teamName.trim() === '' || selectedMembers.length === 0}>
              Crear equipo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
