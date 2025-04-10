
import React from 'react';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import ConversationControls from './ConversationControls';

interface MessagesLayoutProps {
  selectedConversation: string | null;
  conversations: any[];
  onSelectConversation: (id: string) => void;
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onNewMessage: () => void;
  onNewGroup: () => void;
}

const MessagesLayout: React.FC<MessagesLayoutProps> = ({
  selectedConversation,
  conversations,
  onSelectConversation,
  messageText,
  setMessageText,
  onSendMessage,
  onNewMessage,
  onNewGroup
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-240px)]">
      <div className="md:w-1/3 flex flex-col">
        <ConversationControls 
          onNewMessage={onNewMessage} 
          onNewGroup={onNewGroup} 
        />
        
        <div className="bg-white border rounded-lg flex-1 overflow-hidden">
          <ConversationList 
            onSelectConversation={onSelectConversation} 
            selectedConversation={selectedConversation} 
            conversations={conversations} 
          />
        </div>
      </div>
      
      <div className="md:w-2/3 border rounded-lg bg-white overflow-hidden">
        <ChatArea 
          conversationId={selectedConversation} 
          conversations={conversations} 
          messageText={messageText} 
          setMessageText={setMessageText} 
          onSendMessage={onSendMessage} 
        />
      </div>
    </div>
  );
};

export default MessagesLayout;
