
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Participant {
  id: string;
  name: string;
  role: string;
}

export interface Message {
  id: string;
  sender: Participant;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants: Participant[];
  messages: Message[];
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const facultyMessages = localStorage.getItem('faculty-messages');
    let facultyConversations: Conversation[] = [];
    
    if (facultyMessages) {
      try {
        const parsedMessages = JSON.parse(facultyMessages);
        
        facultyConversations = parsedMessages.map((msg: any) => {
          return {
            id: `faculty-${msg.recipientId}`,
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
            messages: [
              {
                id: `msg-${Date.now()}-${Math.random()}`,
                sender: {
                  id: 'current-user',
                  name: 'Usuario Actual',
                  role: 'docente'
                },
                content: msg.content,
                timestamp: new Date(msg.timestamp || Date.now())
              }
            ],
            lastMessage: {
              content: msg.content,
              timestamp: new Date(msg.timestamp || Date.now())
            }
          };
        });
      } catch (error) {
        console.error('Error parsing faculty messages:', error);
      }
    }

    const defaultConversations = [
      {
        id: '1',
        name: 'Santiago López',
        isGroup: false,
        participants: [
          {
            id: '1',
            name: 'Santiago López',
            role: 'docente'
          },
          {
            id: '2',
            name: 'Usuario Actual',
            role: 'docente'
          }
        ],
        messages: [
          {
            id: '1',
            sender: {
              id: '1',
              name: 'Santiago López',
              role: 'docente'
            },
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
          {
            id: '1',
            name: 'Ana García',
            role: 'docente'
          },
          {
            id: '2',
            name: 'Carlos Rodríguez',
            role: 'docente'
          },
          {
            id: '3',
            name: 'Usuario Actual',
            role: 'docente'
          }
        ],
        messages: [
          {
            id: '1',
            sender: {
              id: '1',
              name: 'Ana García',
              role: 'docente'
            },
            content: 'Lembrarvos a reunión do departamento o venres',
            timestamp: new Date('2025-04-05T14:45:00')
          }
        ],
        lastMessage: {
          content: 'Lembrarvos a reunión do departamento o venres',
          timestamp: new Date('2025-04-05T14:45:00')
        }
      }
    ];

    const allConversations = [...facultyConversations];
    
    defaultConversations.forEach(defaultConv => {
      if (!allConversations.some(conv => conv.id === defaultConv.id)) {
        allConversations.push(defaultConv);
      }
    });

    setConversations(allConversations);
  }, []);

  useEffect(() => {
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
