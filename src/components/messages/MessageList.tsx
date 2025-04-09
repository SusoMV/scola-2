
import React from 'react';
import MessageBubble from './MessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Conversation } from './ConversationList';

interface MessageListProps {
  conversation: Conversation | null;
}

const MessageList: React.FC<MessageListProps> = ({ conversation }) => {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500">Selecciona unha conversa para comezar</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {conversation.messages.map((message) => {
          const isCurrentUser = message.sender.id === 'current-user';
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
              showSenderName={conversation.isGroup}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
