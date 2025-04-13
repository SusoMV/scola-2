
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare } from 'lucide-react';

interface MessagesActionsProps {
  onNewMessage: () => void;
  onNewGroup: () => void;
}

const MessagesActions: React.FC<MessagesActionsProps> = ({ onNewMessage, onNewGroup }) => {
  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        onClick={onNewGroup} 
        className="flex-1 border border-scola-primary text-scola-primary hover:bg-scola-primary/10"
      >
        <Users className="mr-2 h-4 w-4" />
        Novo grupo
      </Button>
      
      <Button 
        onClick={onNewMessage} 
        className="flex-1 bg-scola-primary hover:bg-scola-primary/90"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Nova mensaxe
      </Button>
    </div>
  );
};

export default MessagesActions;
