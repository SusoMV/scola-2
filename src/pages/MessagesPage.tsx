
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';
import MessagesHeader from '@/components/messages/MessagesHeader';
import MessagesActions from '@/components/messages/MessagesActions';
import { useConversations } from '@/hooks/useConversations';
import { useMessageHandlers } from '@/hooks/useMessageHandlers';
import { useIsMobile } from '@/hooks/use-mobile';

const MessagesPage = () => {
  const {
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
    handleDeleteConversation
  } = useConversations();
  
  const {
    messageText,
    setMessageText,
    isNewMessageOpen,
    setIsNewMessageOpen,
    isNewGroupOpen,
    setIsNewGroupOpen,
    handleSendMessage,
    handleNewMessage,
    handleCreateGroup
  } = useMessageHandlers(
    conversations, 
    setConversations, 
    selectedConversation, 
    setSelectedConversation
  );
  
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <MessagesHeader />
      
      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-240px)]">
        <div className={`${isMobile ? 'w-full' : 'md:w-1/3'} flex flex-col`}>
          <MessagesActions 
            onNewGroup={() => setIsNewGroupOpen(true)} 
            onNewMessage={() => setIsNewMessageOpen(true)} 
          />
          
          <div className="bg-white border rounded-lg flex-1 overflow-hidden">
            <ConversationList 
              onSelectConversation={setSelectedConversation} 
              selectedConversation={selectedConversation} 
              conversations={conversations}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>
        </div>
        
        <div className={`${isMobile ? 'w-full' : 'md:w-2/3'} border rounded-lg bg-white overflow-hidden`}>
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
