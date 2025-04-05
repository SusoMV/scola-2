
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Users, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

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
  messages: Message[];
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
}

interface ChatAreaProps {
  selectedConversation: Conversation | null;
  formatDate: (date: Date) => string;
  onSendMessage: (content: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedConversation,
  formatDate,
  onSendMessage
}) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
  };

  if (!selectedConversation) {
    return (
      <Card className="border border-scola-gray-dark md:col-span-2">
        <div className="h-[calc(100vh-300px)] flex items-center justify-center text-gray-500">
          Selecciona unha conversa para comezar
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-scola-gray-dark md:col-span-2">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
            selectedConversation.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-scola-pastel text-scola-primary'
          }`}>
            {selectedConversation.isGroup ? (
              <Users className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg font-medium">
              {selectedConversation.name}
            </CardTitle>
            {selectedConversation.isGroup && (
              <p className="text-xs text-gray-500">
                {selectedConversation.participants.length} participantes
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[calc(100vh-350px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.length > 0 ? (
            selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.senderId === 'current'
                      ? 'bg-scola-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedConversation.isGroup && message.senderId !== 'current' && (
                    <p className="text-xs font-medium mb-1">
                      {message.sender}
                    </p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Comeza a conversa
            </div>
          )}
        </div>
        {/* Message input */}
        <div className="p-3 border-t flex">
          <Input
            placeholder="Escribe a túa mensaxe..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="mr-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-scola-primary hover:bg-scola-primary/90"
            disabled={!messageInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatArea;
