
import { Message } from '@/hooks/useConversations';

export function createTextMessage(
  content: string,
  senderId: string = 'current-user',
  senderName: string = 'Usuario Actual',
  senderRole: string = 'docente'
): Message {
  return {
    id: `msg-${Date.now()}`,
    sender: {
      id: senderId,
      name: senderName,
      role: senderRole
    },
    content,
    timestamp: new Date(),
    status: 'sent',
    type: 'text'
  };
}

export function createImageMessage(
  file: File,
  url: string,
  senderId: string = 'current-user',
  senderName: string = 'Usuario Actual',
  senderRole: string = 'docente'
): Message {
  return {
    id: `msg-${Date.now()}`,
    sender: {
      id: senderId,
      name: senderName,
      role: senderRole
    },
    content: file.name,
    fileData: url,
    fileSize: file.size,
    fileName: file.name,
    fileType: file.type,
    timestamp: new Date(),
    status: 'sent',
    type: 'image'
  };
}

export function createFileMessage(
  file: File,
  senderId: string = 'current-user',
  senderName: string = 'Usuario Actual',
  senderRole: string = 'docente'
): Message {
  return {
    id: `msg-${Date.now()}`,
    sender: {
      id: senderId,
      name: senderName,
      role: senderRole
    },
    content: file.name,
    fileSize: file.size,
    fileName: file.name,
    fileType: file.type,
    timestamp: new Date(),
    status: 'sent',
    type: 'file'
  };
}

export function createSystemMessage(content: string): Message {
  return {
    id: `msg-${Date.now()}`,
    sender: {
      id: 'system',
      name: 'Sistema',
      role: 'system'
    },
    content,
    timestamp: new Date(),
    status: 'sent',
    type: 'system'
  };
}
