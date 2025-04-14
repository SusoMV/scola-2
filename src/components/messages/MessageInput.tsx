
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, Mic, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MessageInputProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAttachmentClick?: () => void;
  onVoiceMessageClick?: () => void;
  onDeleteClick?: () => void;
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
  onVoiceMessageClick,
  onDeleteClick,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const handleEmojiClick = (emoji: string) => {
    setMessageText(messageText + emoji);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    if (onVoiceMessageClick) {
      onVoiceMessageClick();
    }
  };

  return (
    <div className="p-3 border-t sticky bottom-0 bg-white">
      <div className="flex items-end gap-2">
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0070C0] hover:bg-gray-100"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="start" alignOffset={0}>
              <div className="grid grid-cols-6 gap-2">
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

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-500 hover:text-[#0070C0] hover:bg-gray-100"
            onClick={handleAttachClick}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 rounded-full ${isRecording ? 'text-red-500' : 'text-gray-500'} hover:text-[#0070C0] hover:bg-gray-100`}
            onClick={handleVoiceClick}
          >
            <Mic className="h-5 w-5" />
          </Button>

          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0 && onAttachmentClick) {
                onAttachmentClick();
              }
            }}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
        </div>

        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Escribe a túa mensaxe..." 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-transparent"
            value={messageText} 
            onChange={e => setMessageText(e.target.value)} 
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        </div>
        
        <Button 
          className="bg-[#0070C0] hover:bg-[#0070C0]/90 h-10 w-10 p-0 rounded-lg"
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
