
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquarePlus, Users } from 'lucide-react';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Mensaxes</h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsNewGroupOpen(true)}
              className="border-scola-primary text-scola-primary hover:bg-scola-primary/10"
            >
              <Users className="mr-2 h-4 w-4" />
              Novo grupo
            </Button>
            
            <Button
              onClick={() => setIsNewMessageOpen(true)}
              className="bg-scola-primary hover:bg-scola-primary/90"
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Nova mensaxe
            </Button>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-240px)]">
        <div className="md:col-span-1 border rounded-lg bg-white overflow-hidden">
          <ConversationList
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
          />
        </div>
        
        <div className="md:col-span-2 border rounded-lg bg-white overflow-hidden">
          <ChatArea conversationId={selectedConversation} />
        </div>
      </div>
      
      <NewMessageDialog
        open={isNewMessageOpen}
        onOpenChange={setIsNewMessageOpen}
        onSelectRecipient={(id) => {
          setSelectedConversation(id);
          setIsNewMessageOpen(false);
        }}
      />
      
      <NewGroupDialog
        open={isNewGroupOpen}
        onOpenChange={setIsNewGroupOpen}
        onCreateGroup={(id) => {
          setSelectedConversation(id);
          setIsNewGroupOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default MessagesPage;
