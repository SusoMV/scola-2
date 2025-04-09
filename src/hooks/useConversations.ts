
import { useState, useEffect } from 'react';
import { Conversation } from '@/components/messages/ConversationList';
import { useToast } from '@/hooks/use-toast';

export function useConversations() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
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

  return {
    selectedConversation,
    setSelectedConversation,
    conversations,
    messageText,
    setMessageText,
    handleSendMessage,
    handleNewMessage,
    handleCreateGroup
  };
}
