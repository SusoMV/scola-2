
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Conversation } from './ConversationList';

interface MessagesProps {
  conversation: Conversation | null;
}

const Messages: React.FC<MessagesProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 py-0 my-0 px-[31px]">
        <p className="text-gray-500">Selecciona unha conversa para comezar</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 py-[11px] px-[18px]">
      <div className="space-y-4 p-4">
        {conversation.messages.map(message => {
          const isCurrentUser = message.sender.id === 'current-user';
          return (
            <div key={message.id} className={`flex items-start ${isCurrentUser ? 'justify-end' : ''}`}>
              <div className={`rounded-lg p-3 max-w-[75%] ${isCurrentUser ? 'bg-scola-pastel' : 'bg-gray-100'}`}>
                {!isCurrentUser && conversation.isGroup && (
                  <p className="text-xs font-medium text-scola-primary mb-1">
                    {message.sender.name}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(message.timestamp), 'HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default Messages;
