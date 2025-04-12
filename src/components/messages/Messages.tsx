
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Conversation } from './ConversationList';

interface MessagesProps {
  conversation: Conversation | null;
}

const Messages: React.FC<MessagesProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom only for initial load or when user was at bottom before new message
  useEffect(() => {
    if (!conversation) return;
    
    const currentMessageCount = conversation.messages.length;
    
    // Determine if we're adding a new message
    const isNewMessage = currentMessageCount > prevMessageCount;
    
    // Only auto-scroll if shouldScrollToBottom is true (user was at bottom)
    if (shouldScrollToBottom && messagesEndRef.current && (isNewMessage || prevMessageCount === 0)) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    setPrevMessageCount(currentMessageCount);
  }, [conversation?.messages, shouldScrollToBottom, prevMessageCount]);

  // Handler to detect when user has scrolled up/down
  const handleScroll = () => {
    if (!scrollAreaRef.current || !messagesEndRef.current) return;
    
    const scrollArea = scrollAreaRef.current;
    const scrollPosition = scrollArea.scrollTop + scrollArea.clientHeight;
    const scrollHeight = scrollArea.scrollHeight;
    
    // If we're close to the bottom (within 50px), set shouldScrollToBottom to true
    const isAtBottom = scrollHeight - scrollPosition < 50;
    setShouldScrollToBottom(isAtBottom);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 py-0 my-0 px-[31px]">
        <p className="text-gray-500">Selecciona unha conversa para comezar</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 py-[11px] px-[18px]" onScroll={handleScroll} ref={scrollAreaRef}>
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
