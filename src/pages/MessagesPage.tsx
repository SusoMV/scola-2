
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';
import MessagesHeader from '@/features/messages/components/MessagesHeader';
import MessagesLayout from '@/features/messages/components/MessagesLayout';
import { useConversations } from '@/features/messages/hooks/useConversations';

const MessagesPage = () => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messageText,
    setMessageText,
    handleSendMessage,
    handleNewMessage,
    handleCreateGroup
  } = useConversations();

  return (
    <DashboardLayout>
      <MessagesHeader />
      
      <MessagesLayout
        selectedConversation={selectedConversation}
        conversations={conversations}
        onSelectConversation={setSelectedConversation}
        messageText={messageText}
        setMessageText={setMessageText}
        onSendMessage={handleSendMessage}
        onNewMessage={() => setIsNewMessageOpen(true)}
        onNewGroup={() => setIsNewGroupOpen(true)}
      />
      
      <NewMessageDialog 
        open={isNewMessageOpen} 
        onOpenChange={setIsNewMessageOpen} 
        onSubmit={handleNewMessage} 
        onSelectRecipient={id => {
          setSelectedConversation(id);
          setIsNewMessageOpen(false);
        }} 
      />
      
      <NewGroupDialog 
        open={isNewGroupOpen} 
        onOpenChange={setIsNewGroupOpen} 
        onSubmit={handleCreateGroup} 
        onCreateGroup={id => {
          setSelectedConversation(id);
          setIsNewGroupOpen(false);
        }} 
      />
    </DashboardLayout>
  );
};

export default MessagesPage;
