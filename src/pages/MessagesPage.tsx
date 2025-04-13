
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';
import MessagesHeader from '@/components/messages/MessagesHeader';
import MessagesActions from '@/components/messages/MessagesActions';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useMessageHandlers } from '@/hooks/messages/useMessageHandlers';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from '@/components/ui/motion';

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
    handleCreateGroup,
    handleAttachFile
  } = useMessageHandlers(
    conversations, 
    setConversations, 
    selectedConversation, 
    setSelectedConversation
  );
  
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  useEffect(() => {
    if (isMobile && selectedConversation) {
      setMobileView('chat');
    } else if (isMobile && !selectedConversation) {
      setMobileView('list');
    }
  }, [selectedConversation, isMobile]);

  const handleBackToList = () => {
    setMobileView('list');
    setSelectedConversation(null);
  };

  return (
    <DashboardLayout>
      <MessagesHeader />
      
      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-240px)]">
        {(!isMobile || mobileView === 'list') && (
          <motion.div 
            className={`${isMobile ? 'w-full' : 'md:w-1/3'} flex flex-col bg-white rounded-lg shadow-sm border`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <MessagesActions 
                onNewGroup={() => setIsNewGroupOpen(true)} 
                onNewMessage={() => setIsNewMessageOpen(true)} 
              />
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ConversationList 
                onSelectConversation={(id) => {
                  setSelectedConversation(id);
                  if (isMobile) {
                    setMobileView('chat');
                  }
                }}
                selectedConversation={selectedConversation} 
                conversations={conversations}
                onDeleteConversation={handleDeleteConversation}
              />
            </div>
          </motion.div>
        )}
        
        {(!isMobile || mobileView === 'chat') && (
          <motion.div 
            className={`${isMobile ? 'w-full' : 'md:w-2/3'} bg-white rounded-lg overflow-hidden shadow-sm border`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatArea 
              conversationId={selectedConversation} 
              conversations={conversations} 
              messageText={messageText} 
              setMessageText={setMessageText} 
              onSendMessage={handleSendMessage}
              onBackToList={handleBackToList}
              isMobile={isMobile}
              onAttachFile={handleAttachFile}
            />
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {isNewMessageOpen && (
          <NewMessageDialog 
            open={isNewMessageOpen} 
            onOpenChange={setIsNewMessageOpen} 
            onSubmit={handleNewMessage} 
            onSelectRecipient={id => {
              setSelectedConversation(id);
              setIsNewMessageOpen(false);
              if (isMobile) {
                setMobileView('chat');
              }
            }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isNewGroupOpen && (
          <NewGroupDialog 
            open={isNewGroupOpen} 
            onOpenChange={setIsNewGroupOpen} 
            onSubmit={handleCreateGroup} 
            onCreateGroup={id => {
              setSelectedConversation(id);
              setIsNewGroupOpen(false);
              if (isMobile) {
                setMobileView('chat');
              }
            }}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default MessagesPage;
