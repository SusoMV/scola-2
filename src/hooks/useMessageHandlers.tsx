
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation, Message } from './useConversations';

export function useMessageHandlers(
  conversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  selectedConversation: string | null,
  setSelectedConversation: (id: string | null) => void
) {
  const [messageText, setMessageText] = useState('');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!selectedConversation || !messageText.trim()) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'current-user',
        name: 'Usuario Actual',
        role: 'docente'
      },
      content: messageText,
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
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
      description: "A túa mensaxe foi enviada correctamente"
    });
  };

  const handleAttachFile = (file: File) => {
    if (!selectedConversation) return;
    
    const fileType = file.type.split('/')[0];
    const isImage = fileType === 'image';
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'current-user',
        name: 'Usuario Actual',
        role: 'docente'
      },
      content: file.name,
      fileData: isImage ? URL.createObjectURL(file) : undefined,
      fileSize: file.size,
      fileName: file.name,
      fileType: file.type,
      timestamp: new Date(),
      status: 'sent',
      type: isImage ? 'image' : 'file'
    };
    
    setConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === selectedConversation) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: {
              content: isImage ? '🖼️ Imaxe' : '📎 Arquivo',
              timestamp: new Date()
            }
          };
        }
        return conversation;
      });
    });
    
    toast({
      title: "Arquivo enviado",
      description: `O arquivo ${file.name} foi enviado correctamente`
    });
  };

  const handleNewMessage = (data: {
    recipient: string;
    content: string;
  }) => {
    const recipientName = data.recipient.split(' - ')[0] || data.recipient;

    const existingConvIndex = conversations.findIndex(conv => conv.id === data.recipient && !conv.isGroup);
    
    if (existingConvIndex >= 0) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: {
          id: 'current-user',
          name: 'Usuario Actual',
          role: 'docente'
        },
        content: data.content,
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
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
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: {
          id: 'current-user',
          name: 'Usuario Actual',
          role: 'docente'
        },
        content: data.content,
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      };
      
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
    const systemMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'system',
        name: 'Sistema',
        role: 'system'
      },
      content: 'Grupo creado',
      timestamp: new Date(),
      status: 'sent',
      type: 'system'
    };
    
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
  };
}
