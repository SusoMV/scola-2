
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Conversation } from '@/hooks/useConversations';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
      <div className="p-4 border-b bg-white sticky top-0 z-10">
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
      </div>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Messages conversation={currentConversation} />
        
        <div className="border-t p-4">
          <div className="flex gap-2">
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
              className="bg-scola-primary hover:bg-scola-primary/90 rounded-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
