
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Participant {
  id: string;
  name: string;
  role: string;
}
export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants: Participant[];
  messages: any[];
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
}
interface ConversationListProps {
  onSelectConversation: (conversationId: string) => void;
  selectedConversation: string | null;
  conversations?: Conversation[];
  onDeleteConversation?: (conversationId: string) => void;
}

// Get first name and first letter of surnames
const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0);
  return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
};

const ConversationList: React.FC<ConversationListProps> = ({
  onSelectConversation,
  selectedConversation,
  conversations = [],
  onDeleteConversation
}) => {
  const formatDate = (date: Date) => {
    return format(date, 'HH:mm');
  };
  
  return (
    <Card className="border border-scola-gray-dark md:col-span-1">
      <CardHeader className="pb-2 my-0 py-[18px]">
        <CardTitle className="font-medium py-0 my-0 text-xl">
          Conversas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh-300px)]">
          {conversations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {conversations.map(conversation => (
                <li key={conversation.id}>
                  <div className="relative">
                    <button 
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-gray-50' : ''}`} 
                      onClick={() => onSelectConversation(conversation.id)}
                    >
                      <div className="flex items-start">
                        <div className="mr-3">
                          {conversation.isGroup ? (
                            <Avatar className="bg-blue-100 text-blue-600">
                              <AvatarFallback><Users className="h-5 w-5" /></AvatarFallback>
                            </Avatar>
                          ) : (
                            <Avatar className="bg-scola-pastel text-scola-primary">
                              <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">
                              {conversation.name}
                            </p>
                            {conversation.lastMessage && (
                              <p className="text-xs text-gray-500">
                                {formatDate(conversation.lastMessage.timestamp)}
                              </p>
                            )}
                          </div>
                          {conversation.lastMessage && (
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                    
                    {onDeleteConversation && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 h-8 w-8 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conversation.id);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar conversa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Non hai conversas
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
