
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
  const { toast } = useToast();
  
  // Simulamos cargar conversaciones iniciales
  useEffect(() => {
    setConversations([
      {
        id: '1',
        name: 'Santiago López',
        isGroup: false,
        participants: [
          { id: '1', name: 'Santiago López', role: 'docente' },
          { id: '2', name: 'Usuario Actual', role: 'docente' }
        ],
        messages: [],
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
        messages: [],
        lastMessage: {
          content: 'Lembrarvos a reunión do departamento o venres',
          timestamp: new Date('2025-04-05T14:45:00')
        }
      }
    ]);
  }, []);

  const handleNewMessage = (data: { recipient: string, content: string }) => {
    const recipientName = data.recipient.split(' - ')[0] || data.recipient;
    
    // Verificar si ya existe una conversación con este destinatario
    const existingConvIndex = conversations.findIndex(conv => 
      conv.id === data.recipient && !conv.isGroup
    );
    
    if (existingConvIndex >= 0) {
      // Actualizar conversación existente
      const updatedConversations = [...conversations];
      updatedConversations[existingConvIndex] = {
        ...updatedConversations[existingConvIndex],
        lastMessage: {
          content: data.content,
          timestamp: new Date()
        }
      };
      setConversations(updatedConversations);
      setSelectedConversation(data.recipient);
    } else {
      // Crear nueva conversación
      const newConversation: Conversation = {
        id: data.recipient,
        name: recipientName,
        isGroup: false,
        participants: [
          { id: data.recipient, name: recipientName, role: 'docente' },
          { id: 'current-user', name: 'Usuario Actual', role: 'docente' }
        ],
        messages: [],
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
      messages: [],
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
            conversations={conversations}
          />
        </div>
        
        <div className="md:col-span-2 border rounded-lg bg-white overflow-hidden">
          <ChatArea conversationId={selectedConversation} />
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
