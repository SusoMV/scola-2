
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Conversation } from '@/types/conversations';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ChatAreaProps {
  conversationId: string | null;
  conversations: Conversation[];
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
  onBackToList?: () => void;
  isMobile?: boolean;
  onAttachFile?: (file: File) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  conversationId,
  conversations,
  messageText,
  setMessageText,
  onSendMessage,
  onBackToList,
  isMobile,
  onAttachFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentConversation = conversationId ? conversations.find(conv => conv.id === conversationId) : null;
  
  // Update type annotation to match HTMLInputElement
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onAttachFile) {
      onAttachFile(e.target.files[0]);
      e.target.value = ''; // Reset input
    }
  };
  
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  if (!currentConversation) {
    return (
      <Card className="h-full flex flex-col border-0 shadow-none">
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-gray-500">Selecciona unha conversa para comezar</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="h-full flex flex-col border-0 shadow-none">
      <div className="px-4 py-3 bg-white sticky top-0 z-10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && onBackToList && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2 p-0 h-8 w-8"
                onClick={onBackToList}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-lg font-medium">
              {currentConversation.name}
            </h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </Button>
        </div>
      </div>
      
      <Separator className="m-0" />
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <Messages conversation={currentConversation} />
        
        <div className="border-t p-4 flex-shrink-0">
          <div className="flex gap-2 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleAttachmentClick}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Escribe a túa mensaxe..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-scola-primary focus:border-transparent"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button 
              onClick={onSendMessage}
              disabled={!messageText.trim()}
              className="bg-scola-primary hover:bg-scola-primary/90 rounded-full p-2 h-10 w-10"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatArea;
