import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Conversation } from './ConversationList';
interface ChatAreaProps {
  conversationId: string | null;
  conversations: Conversation[];
  messageText: string;
  setMessageText: (text: string) => void;
  onSendMessage: () => void;
}
const ChatArea: React.FC<ChatAreaProps> = ({
  conversationId,
  conversations,
  messageText,
  setMessageText,
  onSendMessage
}) => {
  const currentConversation = conversationId ? conversations.find(conv => conv.id === conversationId) : null;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  return <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {currentConversation ? currentConversation.name : 'Selecciona unha conversa'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {currentConversation ? <>
            <div className="flex-1 p-4 overflow-y-auto py-[11px] px-[18px]">
              <div className="space-y-4">
                {currentConversation.messages.map(message => {
              const isCurrentUser = message.sender.id === 'current-user';
              return <div key={message.id} className={`flex items-start ${isCurrentUser ? 'justify-end' : ''}`}>
                      <div className={`rounded-lg p-3 max-w-[75%] ${isCurrentUser ? 'bg-scola-pastel' : 'bg-gray-100'}`}>
                        {!isCurrentUser && currentConversation.isGroup && <p className="text-xs font-medium text-scola-primary mb-1">
                            {message.sender.name}
                          </p>}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(message.timestamp), 'HH:mm')}
                        </p>
                      </div>
                    </div>;
            })}
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea placeholder="Escribe a túa mensaxe..." className="resize-none" value={messageText} onChange={e => setMessageText(e.target.value)} onKeyDown={handleKeyDown} />
                <Button className="bg-scola-primary hover:bg-scola-primary/90" onClick={onSendMessage}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Enviar mensaxe</span>
                </Button>
              </div>
            </div>
          </> : <div className="flex-1 flex items-center justify-center p-4 py-0 my-0 px-[31px]">
            <p className="text-gray-500">Selecciona unha conversa para comezar</p>
          </div>}
      </CardContent>
    </Card>;
};
export default ChatArea;