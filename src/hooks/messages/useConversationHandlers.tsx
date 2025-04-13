
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation, Message } from '@/hooks/useConversations';
import { createTextMessage, createSystemMessage } from '@/hooks/messages/useMessageTypes';

export function useConversationHandlers(
  conversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  setSelectedConversation: (id: string | null) => void
) {
  const { toast } = useToast();
  
  const handleNewMessage = (data: {
    recipient: string;
    content: string;
  }) => {
    const recipientName = data.recipient.split(' - ')[0] || data.recipient;

    const existingConvIndex = conversations.findIndex(conv => conv.id === data.recipient && !conv.isGroup);
    
    if (existingConvIndex >= 0) {
      const newMessage = createTextMessage(data.content);
      
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
      const newMessage = createTextMessage(data.content);
      
      const newConversation: Conversation = {
        id: data.recipient,
        name: recipientName,
        isGroup: false,
        participants: [{
          id: data.recipient,
          name: recipientName,
          role: 'docente'
        }, {
          id: 'current-user',
          name: 'Usuario Actual',
          role: 'docente'
        }],
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
      description: `Enviada mensaxe a ${recipientName}`
    });
  };

  const handleCreateGroup = (data: {
    name: string;
    participants: string[];
  }) => {
    const newGroupId = `group-${Date.now()}`;
    const systemMessage = createSystemMessage('Grupo creado');
    
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
      messages: [systemMessage],
      lastMessage: {
        content: 'Grupo creado',
        timestamp: new Date()
      }
    };
    
    setConversations([newGroup, ...conversations]);
    setSelectedConversation(newGroupId);
    
    toast({
      title: "Grupo creado",
      description: `O grupo "${data.name}" foi creado con éxito`
    });
    
    return newGroupId;
  };
  
  return {
    handleNewMessage,
    handleCreateGroup
  };
}
