
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessagesHeader from '@/components/messages/MessagesHeader';
import MessageActions from '@/components/messages/MessageActions';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';
import { useConversations } from '@/hooks/useConversations';

const MessagesPage = () => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  
  const {
    selectedConversation,
    setSelectedConversation,
    conversations,
    messageText,
    setMessageText,
    handleSendMessage,
    handleNewMessage,
    handleCreateGroup
  } = useConversations();
  
  return (
    <DashboardLayout>
      <MessagesHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-240px)]">
        <div className="md:col-span-1 border rounded-lg bg-white overflow-hidden">
          <MessageActions 
            onNewMessage={() => setIsNewMessageOpen(true)}
            onNewGroup={() => setIsNewGroupOpen(true)}
          />
          <ConversationList
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            conversations={conversations}
          />
        </div>
        
        <div className="md:col-span-2 border rounded-lg bg-white overflow-hidden">
          <ChatArea 
            conversationId={selectedConversation}
            conversations={conversations}
            messageText={messageText}
            setMessageText={setMessageText}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
      
      <NewMessageDialog
        open={isNewMessageOpen}
        onOpenChange={setIsNewMessageOpen}
        onSubmit={handleNewMessage}
        onSelectRecipient={(id) => {
          setSelectedConversation(id);
          setIsNewMessageOpen(false);
        }}
      />
      
      <NewGroupDialog
        open={isNewGroupOpen}
        onOpenChange={setIsNewGroupOpen}
        onSubmit={handleCreateGroup}
        onCreateGroup={(id) => {
          setSelectedConversation(id);
          setIsNewGroupOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default MessagesPage;
