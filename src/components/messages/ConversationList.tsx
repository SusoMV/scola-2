
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from '@/components/ui/motion';
import { Conversation } from '@/types/conversations';

interface Participant {
  id: string;
  name: string;
  role: string;
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
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Onte';
    } else {
      return format(date, 'dd/MM/yy');
    }
  };
  
  return (
    <Card className="border-0 shadow-none h-full flex flex-col">
      <CardHeader className="pb-2 my-0 py-3 px-4 flex-shrink-0">
        <CardTitle className="font-medium text-xl">
          Conversas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {conversations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {conversations.map(conversation => (
                <motion.li 
                  key={conversation.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <button 
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start ${selectedConversation === conversation.id ? 'bg-gray-50' : ''}`} 
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className={`rounded-full flex-shrink-0 w-10 h-10 flex items-center justify-center mr-3 ${conversation.isGroup ? 'bg-scola-pastel text-scola-primary' : 'bg-scola-pastel text-scola-primary'}`}>
                      {conversation.isGroup ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className={`${selectedConversation === conversation.id ? 'font-bold' : 'font-medium'} truncate`}>
                          {conversation.name}
                        </p>
                        {conversation.lastMessage && (
                          <p className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {formatDate(new Date(conversation.lastMessage.timestamp))}
                          </p>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </button>
                </motion.li>
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
