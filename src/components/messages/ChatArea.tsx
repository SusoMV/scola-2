
import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Conversation } from '@/types/conversations';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
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
  onDeleteConversation?: (id: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  conversationId,
  conversations,
  messageText,
  setMessageText,
  onSendMessage,
  onBackToList,
  isMobile,
  onAttachFile,
  onDeleteConversation
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentConversation = conversationId ? conversations.find(conv => conv.id === conversationId) : null;
  
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

  const handleVoiceMessageClick = () => {
    // Add voice message functionality
    console.log('Voice message clicked');
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
            <h2 className="text-lg font-medium truncate">
              {currentConversation.name}
            </h2>
          </div>
          
          {onDeleteConversation && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => onDeleteConversation(currentConversation.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Messages conversation={currentConversation} />
        </div>
        
        <MessageInput
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={onSendMessage}
          onKeyDown={handleKeyDown}
          onAttachmentClick={handleAttachmentClick}
          onVoiceMessageClick={handleVoiceMessageClick}
          onDeleteClick={() => {}}
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
