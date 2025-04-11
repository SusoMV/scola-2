
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  setMessageText,
  onSendMessage,
  disabled = false
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t sticky bottom-0 bg-white">
      <div className="flex gap-2">
        <Textarea 
          placeholder="Escribe a túa mensaxe..." 
          className="resize-none" 
          value={messageText} 
          onChange={e => setMessageText(e.target.value)} 
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <Button 
          className="bg-scola-primary hover:bg-scola-primary/90" 
          onClick={onSendMessage}
          disabled={disabled}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar mensaxe</span>
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
