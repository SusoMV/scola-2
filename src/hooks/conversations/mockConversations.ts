
import { Conversation } from '@/types/conversations';

export const defaultConversations: Conversation[] = [
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
