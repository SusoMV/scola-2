
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: string;
}

interface Conversation {
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
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation) => void;
  isLoading: boolean;
  formatDate: (date: Date) => string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  isLoading,
  formatDate
}) => {
  return (
    <Card className="border border-scola-gray-dark md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Conversas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Cargando conversas...
            </div>
          ) : conversations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start">
                      <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
                        conversation.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-scola-pastel text-scola-primary'
                      }`}>
                        {conversation.isGroup ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
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
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Non hai conversas
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
