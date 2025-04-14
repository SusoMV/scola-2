
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation, Message } from '@/types/conversations';
import { createTextMessage } from '@/hooks/messages/useMessageTypes';
import { useAttachments } from '@/hooks/messages/useAttachments';
import { useConversationHandlers } from '@/hooks/messages/useConversationHandlers';

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
  
  const { handleAttachFile } = useAttachments(selectedConversation, setConversations);
  const { handleNewMessage, handleCreateGroup } = useConversationHandlers(
    conversations, 
    setConversations, 
    setSelectedConversation
  );
  
  const handleSendMessage = () => {
    if (!selectedConversation || !messageText.trim()) return;
    const newMessage = createTextMessage(messageText);
    
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

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedConversation) return;
    
    setConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === selectedConversation) {
          const filteredMessages = conversation.messages.filter(msg => msg.id !== messageId);
          
          // Update the last message if needed
          let updatedLastMessage = conversation.lastMessage;
          if (filteredMessages.length > 0) {
            const lastMsg = filteredMessages[filteredMessages.length - 1];
            updatedLastMessage = {
              content: lastMsg.content,
              timestamp: lastMsg.timestamp
            };
          }
          
          return {
            ...conversation,
            messages: filteredMessages,
            lastMessage: updatedLastMessage
          };
        }
        return conversation;
      });
    });
    
    toast({
      title: "Mensaxe eliminada",
      description: "A mensaxe foi eliminada correctamente"
    });
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
    handleAttachFile,
    handleDeleteMessage
  };
}
