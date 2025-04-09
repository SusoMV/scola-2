
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquarePlus, Users } from 'lucide-react';
import ConversationList, { Conversation } from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';
import { useToast } from '@/hooks/use-toast';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();
  
  // Load initial conversations
  useEffect(() => {
    // Mock data for initial conversations
    setConversations([
      {
        id: '1',
        name: 'Santiago López',
        isGroup: false,
        participants: [
          { id: '1', name: 'Santiago López', role: 'docente' },
          { id: '2', name: 'Usuario Actual', role: 'docente' }
        ],
        messages: [
          { 
            id: '1', 
            sender: { id: '1', name: 'Santiago López', role: 'docente' }, 
            content: 'Bos días, teño unha dúbida sobre a clase de mañá',
            timestamp: new Date('2025-04-06T10:30:00')
          }
        ],
        lastMessage: {
          content: 'Bos días, teño unha dúbida sobre a clase de mañá',
          timestamp: new Date('2025-04-06T10:30:00')
        }
      },
      {
        id: '2',
        name: 'Departamento de Matemáticas',
        isGroup: true,
        participants: [
          { id: '1', name: 'Ana García', role: 'docente' },
          { id: '2', name: 'Carlos Rodríguez', role: 'docente' },
          { id: '3', name: 'Usuario Actual', role: 'docente' }
        ],
        messages: [
          {
            id: '1',
            sender: { id: '1', name: 'Ana García', role: 'docente' },
            content: 'Lembrarvos a reunión do departamento o venres',
            timestamp: new Date('2025-04-05T14:45:00')
          }
        ],
        lastMessage: {
          content: 'Lembrarvos a reunión do departamento o venres',
          timestamp: new Date('2025-04-05T14:45:00')
        }
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!selectedConversation || !messageText.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: { id: 'current-user', name: 'Usuario Actual', role: 'docente' },
      content: messageText,
      timestamp: new Date()
    };
    
    setConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === selectedConversation) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: {
              content: messageText,
              timestamp: new Date()
            }
          };
        }
        return conversation;
      });
    });
    
    setMessageText('');
    
    toast({
      title: "Mensaxe enviada",
      description: "A túa mensaxe foi enviada correctamente",
    });
  };

  const handleNewMessage = (data: { recipient: string, content: string }) => {
    const recipientName = data.recipient.split(' - ')[0] || data.recipient;
    
    // Check if conversation already exists
    const existingConvIndex = conversations.findIndex(conv => 
      conv.id === data.recipient && !conv.isGroup
    );
    
    if (existingConvIndex >= 0) {
      // Update existing conversation
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender: { id: 'current-user', name: 'Usuario Actual', role: 'docente' },
        content: data.content,
        timestamp: new Date()
      };
      
      const updatedConversations = [...conversations];
      updatedConversations[existingConvIndex] = {
        ...updatedConversations[existingConvIndex],
        messages: [...updatedConversations[existingConvIndex].messages, newMessage],
        lastMessage: {
          content: data.content,
          timestamp: new Date()
        }
      };
      
      setConversations(updatedConversations);
      setSelectedConversation(data.recipient);
    } else {
      // Create new conversation
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender: { id: 'current-user', name: 'Usuario Actual', role: 'docente' },
        content: data.content,
        timestamp: new Date()
      };
      
      const newConversation: Conversation = {
        id: data.recipient,
        name: recipientName,
        isGroup: false,
        participants: [
          { id: data.recipient, name: recipientName, role: 'docente' },
          { id: 'current-user', name: 'Usuario Actual', role: 'docente' }
        ],
        messages: [newMessage],
        lastMessage: {
          content: data.content,
          timestamp: new Date()
        }
      };
      
      setConversations([newConversation, ...conversations]);
      setSelectedConversation(data.recipient);
    }
    
    toast({
      title: "Mensaxe enviada",
      description: `Enviada mensaxe a ${recipientName}`,
    });
  };

  const handleCreateGroup = (data: { name: string, participants: string[] }) => {
    const newGroupId = `group-${Date.now()}`;
    const newGroup: Conversation = {
      id: newGroupId,
      name: data.name,
      isGroup: true,
      participants: data.participants.map(id => {
        const parts = id.split(' - ');
        return { 
          id, 
          name: parts[0] || id, 
          role: parts[1] || 'docente' 
        };
      }),
      messages: [{
        id: `msg-${Date.now()}`,
        sender: { id: 'system', name: 'Sistema', role: 'system' },
        content: 'Grupo creado',
        timestamp: new Date()
      }],
      lastMessage: {
        content: 'Grupo creado',
        timestamp: new Date()
      }
    };
    
    setConversations([newGroup, ...conversations]);
    setSelectedConversation(newGroupId);
    
    toast({
      title: "Grupo creado",
      description: `O grupo "${data.name}" foi creado con éxito`,
    });
    
    return newGroupId;
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Mensaxes</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-240px)]">
        <div className="md:w-1/3 flex flex-col">
          <div className="flex gap-3 mb-4">
            <Button
              variant="outline"
              onClick={() => setIsNewGroupOpen(true)}
              className="flex-1 border-scola-primary text-scola-primary hover:bg-scola-primary/10"
            >
              <Users className="mr-2 h-4 w-4" />
              Novo grupo
            </Button>
            
            <Button
              onClick={() => setIsNewMessageOpen(true)}
              className="flex-1 bg-scola-primary hover:bg-scola-primary/90"
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Nova mensaxe
            </Button>
          </div>
          
          <div className="bg-white border rounded-lg flex-1 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-800">Conversas</h2>
            </div>
            <ConversationList
              onSelectConversation={setSelectedConversation}
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
