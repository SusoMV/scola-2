
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, Users } from 'lucide-react';

interface MessageActionsProps {
  onNewMessage: () => void;
  onNewGroup: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({ onNewMessage, onNewGroup }) => {
  return (
    <div className="flex justify-end p-4">
      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={onNewGroup}
          className="border-scola-primary text-scola-primary hover:bg-scola-primary/10"
        >
          <Users className="mr-2 h-4 w-4" />
          Novo grupo
        </Button>
        
        <Button
          onClick={onNewMessage}
          className="bg-scola-primary hover:bg-scola-primary/90"
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Nova mensaxe
        </Button>
      </div>
    </div>
  );
};

export default MessageActions;
