
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
  type?: 'text' | 'image' | 'file' | 'system';
  status?: 'sent' | 'delivered' | 'read';
  fileData?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
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
