
import { useState } from 'react';
import { Conversation } from '@/hooks/useConversations';
import { useToast } from '@/hooks/use-toast';
import { createImageMessage, createFileMessage } from '@/hooks/messages/useMessageTypes';

export function useAttachments(
  selectedConversation: string | null,
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) {
  const { toast } = useToast();
  
  const handleAttachFile = (file: File) => {
    if (!selectedConversation) return;
    
    const fileType = file.type.split('/')[0];
    const isImage = fileType === 'image';
    
    const newMessage = isImage 
      ? createImageMessage(file, URL.createObjectURL(file))
      : createFileMessage(file);
    
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
  
  return { handleAttachFile };
}
