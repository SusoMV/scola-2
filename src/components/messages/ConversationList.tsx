
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

// Mock conversations data to use as fallback if none are provided
const mockConversations: Conversation[] = [{
  id: '1',
  name: 'Santiago López',
  isGroup: false,
  participants: [{
    id: '1',
    name: 'Santiago López',
    role: 'docente'
  }, {
    id: '2',
    name: 'Usuario Actual',
    role: 'docente'
  }],
  messages: [],
  lastMessage: {
    content: 'Bos días, teño unha dúbida sobre a clase de mañá',
    timestamp: new Date('2025-04-06T10:30:00')
  }
}, {
  id: '2',
  name: 'Departamento de Matemáticas',
  isGroup: true,
  participants: [{
    id: '1',
    name: 'Ana García',
    role: 'docente'
  }, {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'docente'
  }, {
    id: '3',
    name: 'Usuario Actual',
    role: 'docente'
  }],
  messages: [],
  lastMessage: {
    content: 'Lembrarvos a reunión do departamento o venres',
    timestamp: new Date('2025-04-05T14:45:00')
  }
}, {
  id: '3',
  name: 'Laura Fernández',
  isGroup: false,
  participants: [{
    id: '3',
    name: 'Laura Fernández',
    role: 'docente'
  }, {
    id: '2',
    name: 'Usuario Actual',
    role: 'docente'
  }],
  messages: [],
  lastMessage: {
    content: 'Xa está listo o informe de avaliación',
    timestamp: new Date('2025-04-04T17:15:00')
  }
}];

const ConversationList: React.FC<ConversationListProps> = ({
  onSelectConversation,
  selectedConversation,
  conversations = mockConversations,
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
                        <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${conversation.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-scola-pastel text-scola-primary'}`}>
                          {conversation.isGroup ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
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
