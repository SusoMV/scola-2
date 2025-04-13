
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Conversation } from '@/hooks/useConversations';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 sticky top-0 z-10 bg-white border-b">
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
          <CardTitle className="text-lg font-medium">
            {currentConversation ? currentConversation.name : 'Selecciona unha conversa'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <Messages conversation={currentConversation} />
        
        <MessageInput 
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={onSendMessage}
          onKeyDown={handleKeyDown}
          onAttachmentClick={handleAttachmentClick}
          disabled={!currentConversation}
        />
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        />
      </CardContent>
    </Card>
  );
};

export default ChatArea;
