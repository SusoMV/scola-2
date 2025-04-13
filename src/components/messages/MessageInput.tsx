
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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
          <Textarea 
            placeholder="Escribe a túa mensaxe..." 
            className="resize-none min-h-[60px] pr-10"
            value={messageText} 
            onChange={e => setMessageText(e.target.value)} 
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
          
          <div className="absolute bottom-2 right-2 flex space-x-1">
            {onAttachmentClick && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                onClick={onAttachmentClick}
                disabled={disabled}
              >
                <Paperclip className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Adxuntar arquivo</span>
              </Button>
            )}
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                  disabled={disabled}
                >
                  <Smile className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Engadir emoji</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="grid grid-cols-8 gap-1">
                  {emojiOptions.map((option) => (
                    <button
                      key={option.emoji}
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer text-lg"
                      onClick={() => handleEmojiClick(option.emoji)}
                    >
                      {option.emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <Button 
          className="bg-scola-primary hover:bg-scola-primary/90 h-10 w-10 p-0 rounded-full"
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
