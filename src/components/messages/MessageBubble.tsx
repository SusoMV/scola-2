
import React from 'react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    timestamp: Date;
    sender: {
      id: string;
      name: string;
    };
  };
  isCurrentUser: boolean;
  showSenderName: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isCurrentUser, 
  showSenderName 
}) => {
  return (
    <div className={`flex items-start ${isCurrentUser ? 'justify-end' : ''}`}>
      <div className={`rounded-lg p-3 max-w-[75%] ${isCurrentUser ? 'bg-scola-pastel' : 'bg-gray-100'}`}>
        {showSenderName && !isCurrentUser && (
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
};

export default MessageBubble;
