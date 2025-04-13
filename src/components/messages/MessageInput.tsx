
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Changed from HTMLTextAreaElement to HTMLInputElement
  onAttachmentClick?: () => void;
  disabled?: boolean;
}

// Define emoji categories and common emojis
const emojiOptions = [
  { emoji: '😊', category: 'smileys' },
  { emoji: '😂', category: 'smileys' },
  { emoji: '❤️', category: 'symbols' },
  { emoji: '👍', category: 'people' },
  { emoji: '👋', category: 'people' },
  { emoji: '🎉', category: 'celebration' },
  { emoji: '👏', category: 'people' },
  { emoji: '🙏', category: 'people' },
  { emoji: '😍', category: 'smileys' },
  { emoji: '🤔', category: 'smileys' },
  { emoji: '👀', category: 'people' },
  { emoji: '🔥', category: 'symbols' },
  { emoji: '✅', category: 'symbols' },
  { emoji: '⭐', category: 'symbols' },
  { emoji: '😎', category: 'smileys' },
  { emoji: '🤗', category: 'smileys' },
];

const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  setMessageText,
  onSendMessage,
  onKeyDown,
  onAttachmentClick,
  disabled = false
}) => {
  const handleEmojiClick = (emoji: string) => {
    setMessageText(messageText + emoji);
  };

  return (
    <div className="p-3 border-t sticky bottom-0 bg-white">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Escribe a túa mensaxe..." 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-scola-primary focus:border-transparent"
            value={messageText} 
            onChange={e => setMessageText(e.target.value)} 
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        </div>
        
        <Button 
          className="bg-scola-primary hover:bg-scola-primary/90 h-10 w-10 p-0 rounded-lg"
          onClick={onSendMessage}
          disabled={disabled || !messageText.trim()}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar mensaxe</span>
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
