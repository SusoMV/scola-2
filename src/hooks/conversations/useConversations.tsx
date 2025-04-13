
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Conversation } from '@/types/conversations';
import { useConversationStorage } from './useConversationStorage';
import { defaultConversations } from './mockConversations';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { toast } = useToast();
  const { loadConversationsFromStorage, saveConversationsToStorage } = useConversationStorage();

  useEffect(() => {
    const storedConversations = loadConversationsFromStorage();
    const allConversations = [...storedConversations];
    
    defaultConversations.forEach(defaultConv => {
      if (!allConversations.some(conv => conv.id === defaultConv.id)) {
        allConversations.push(defaultConv);
      }
    });

    setConversations(allConversations);
  }, []);

  useEffect(() => {
    saveConversationsToStorage(conversations);
  }, [conversations]);

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== conversationId)
    );
    
    if (selectedConversation === conversationId) {
      setSelectedConversation(null);
    }
    
    toast({
      title: "Conversa eliminada",
      description: "A conversa foi eliminada correctamente"
    });
  };

  return {
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
    handleDeleteConversation
  };
}
