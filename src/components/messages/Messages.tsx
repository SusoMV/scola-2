
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Conversation } from '@/types/conversations';
import { Check, CheckCheck, FileIcon, Download, Trash2 } from 'lucide-react';
import { motion } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';

interface MessagesProps {
  conversation: Conversation | null;
  onDeleteMessage?: (messageId: string) => void;
}

const Messages: React.FC<MessagesProps> = ({ conversation, onDeleteMessage }) => {
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

  const renderMessageContent = (message: any) => {
    switch (message.type) {
      case 'image':
        return (
          <div className="rounded-lg overflow-hidden max-w-[240px]">
            <img 
              src={message.fileData} 
              alt={message.fileName || 'Imaxe'} 
              className="max-w-full h-auto" 
            />
            <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50">
              {message.fileName}
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="flex items-center bg-gray-50 rounded-lg p-3 space-x-3">
            <div className="bg-[#0070C0]/10 p-2 rounded-lg">
              <FileIcon className="h-8 w-8 text-[#0070C0]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs text-gray-500">
                {(message.fileSize / 1024).toFixed(2)} KB
              </p>
            </div>
            <Download className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#0070C0]" />
          </div>
        );
      case 'system':
        return (
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-center text-gray-600">
            {message.content}
          </div>
        );
      default:
        return <p className="text-sm break-words">{message.content}</p>;
    }
  };

  const renderMessageStatus = (message: any) => {
    if (message.sender.id !== 'current-user' || message.type === 'system') return null;
    
    switch (message.status) {
      case 'sent':
        return <Check className="h-4 w-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-[#0070C0]" />;
      default:
        return null;
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500">Selecciona unha conversa para comezar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollAreaRef} onScroll={handleScroll}>
      <div className="py-4 px-4 space-y-4">
        {conversation.messages.map((message, index) => {
          const isCurrentUser = message.sender.id === 'current-user';
          const isSystem = message.type === 'system';
          
          if (isSystem) {
            return (
              <motion.div 
                key={message.id}
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderMessageContent(message)}
              </motion.div>
            );
          }
          
          return (
            <motion.div 
              key={message.id} 
              className={`flex items-end group ${isCurrentUser ? 'justify-end' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`max-w-[75%] relative ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-lg ${isCurrentUser ? 'bg-[#0070C0] text-white' : 'bg-gray-100 text-gray-800'} p-3`}>
                  {!isCurrentUser && conversation.isGroup && (
                    <p className="text-xs font-medium text-[#0070C0] mb-1">
                      {message.sender.name}
                    </p>
                  )}
                  {renderMessageContent(message)}
                </div>
                <div className={`flex items-center mt-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="mr-1">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </span>
                  {renderMessageStatus(message)}
                </div>
                
                {isCurrentUser && onDeleteMessage && (
                  <Button 
                    variant="ghost" 
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    onClick={() => onDeleteMessage(message.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
