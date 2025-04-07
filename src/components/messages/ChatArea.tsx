import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ChatAreaProps {
  conversationId: string | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversationId }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {conversationId ? 'Mensaxes' : 'Selecciona unha conversa'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {conversationId ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Aquí se mostrarían los mensajes de la conversación seleccionada */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[75%]">
                    <p className="text-sm">Bos días, teño unha dúbida sobre a clase de mañá.</p>
                    <p className="text-xs text-gray-500 mt-1">10:30</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-scola-pastel rounded-lg p-3 max-w-[75%]">
                    <p className="text-sm">Claro, dime en que podo axudarte.</p>
                    <p className="text-xs text-gray-500 mt-1">10:32</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Escribe a túa mensaxe..." 
                  className="resize-none"
                />
                <Button className="bg-scola-primary hover:bg-scola-primary/90">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Enviar mensaxe</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-gray-500">Selecciona unha conversa para comezar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatArea;
