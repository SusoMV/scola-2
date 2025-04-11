
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Conversation } from './ConversationList';
import Messages from './Messages';
import MessageInput from './MessageInput';

interface ChatAreaProps {
  conversationId: string | null;
  conversations: Conversation[];
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  conversationId,
  conversations,
  messageText,
  setMessageText,
  onSendMessage
}) => {
  const currentConversation = conversationId ? conversations.find(conv => conv.id === conversationId) : null;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 sticky top-0 z-10 bg-white border-b">
        <CardTitle className="text-lg font-medium">
          {currentConversation ? currentConversation.name : 'Selecciona unha conversa'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <Messages conversation={currentConversation} />
        
        <MessageInput 
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={onSendMessage}
          disabled={!currentConversation}
        />
      </CardContent>
    </Card>
  );
};

export default ChatArea;
