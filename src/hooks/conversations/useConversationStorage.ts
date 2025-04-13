
import { useState, useEffect } from 'react';
import { Conversation } from '@/types/conversations';

export function useConversationStorage() {
  const loadConversationsFromStorage = (): Conversation[] => {
    const facultyMessages = localStorage.getItem('faculty-messages');
    let facultyConversations: {[key: string]: Conversation} = {};
    
    if (facultyMessages) {
      try {
        const parsedMessages = JSON.parse(facultyMessages);
        
        parsedMessages.forEach((msg: any) => {
          const conversationId = `faculty-${msg.recipientId}`;
          
          if (!facultyConversations[conversationId]) {
            facultyConversations[conversationId] = {
              id: conversationId,
              name: msg.recipientName,
              isGroup: false,
              participants: [
                {
                  id: msg.recipientId,
                  name: msg.recipientName,
                  role: 'docente'
                },
                {
                  id: 'current-user',
                  name: 'Usuario Actual',
                  role: 'docente'
                }
              ],
              messages: [],
              lastMessage: {
                content: msg.content,
                timestamp: new Date(msg.timestamp || Date.now())
              }
            };
          }
          
          facultyConversations[conversationId].messages.push({
            id: `msg-${Date.now()}-${Math.random()}`,
            sender: {
              id: 'current-user',
              name: 'Usuario Actual',
              role: 'docente'
            },
            content: msg.content,
            timestamp: new Date(msg.timestamp || Date.now())
          });
        });
      } catch (error) {
        console.error('Error parsing faculty messages:', error);
      }
    }

    return Object.values(facultyConversations);
  };
  
  const saveConversationsToStorage = (conversations: Conversation[]) => {
    if (conversations.length > 0) {
      const facultyMessages = conversations
        .filter(conv => !conv.isGroup && conv.id.startsWith('faculty-'))
        .map(conv => {
          const lastMessage = conv.messages[conv.messages.length - 1];
          return {
            recipientId: conv.participants.find(p => p.id !== 'current-user')?.id,
            recipientName: conv.name,
            content: lastMessage.content,
            timestamp: lastMessage.timestamp
          };
        });
      
      if (facultyMessages.length > 0) {
        localStorage.setItem('faculty-messages', JSON.stringify(facultyMessages));
      }
    }
  };
  
  return {
    loadConversationsFromStorage,
    saveConversationsToStorage
  };
}
