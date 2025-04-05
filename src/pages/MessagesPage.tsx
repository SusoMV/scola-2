
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { Plus, Send, User, Users } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants: Participant[];
  messages: Message[];
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
}

interface Participant {
  id: string;
  name: string;
  role: string;
}

const MessagesPage = () => {
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);
  const [openNewGroupDialog, setOpenNewGroupDialog] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Mock data for faculty members
  const facultyMembers: Participant[] = [
    { id: '1', name: 'María López García', role: 'directivo' },
    { id: '2', name: 'Carlos Rodríguez Fernández', role: 'directivo' },
    { id: '3', name: 'Ana García Pérez', role: 'docente' },
    { id: '4', name: 'Pablo Sánchez Martínez', role: 'docente' },
    { id: '5', name: 'Lucía Fernández Castro', role: 'docente' },
    { id: '6', name: 'David Martínez López', role: 'docente' }
  ];

  // Mock data for conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'María López García',
      isGroup: false,
      participants: [facultyMembers[0]],
      messages: [
        {
          id: '1',
          sender: 'María López García',
          senderId: '1',
          content: 'Bos días, como vai todo?',
          timestamp: new Date('2025-04-04T09:00:00'),
          read: true
        },
        {
          id: '2',
          sender: 'Usuario Actual',
          senderId: 'current',
          content: 'Moi ben, grazas! E ti?',
          timestamp: new Date('2025-04-04T09:05:00'),
          read: true
        },
        {
          id: '3',
          sender: 'María López García',
          senderId: '1',
          content: 'Todo ben, preparando a reunión de mañá',
          timestamp: new Date('2025-04-04T09:10:00'),
          read: true
        }
      ],
      lastMessage: {
        content: 'Todo ben, preparando a reunión de mañá',
        timestamp: new Date('2025-04-04T09:10:00')
      }
    },
    {
      id: '2',
      name: 'Grupo Titorías 5º',
      isGroup: true,
      participants: [facultyMembers[0], facultyMembers[2], facultyMembers[4]],
      messages: [
        {
          id: '1',
          sender: 'María López García',
          senderId: '1',
          content: 'Recordade a reunión do xoves',
          timestamp: new Date('2025-04-03T14:30:00'),
          read: true
        },
        {
          id: '2',
          sender: 'Ana García Pérez',
          senderId: '3',
          content: 'Perfecto, alí estarei',
          timestamp: new Date('2025-04-03T14:35:00'),
          read: true
        }
      ],
      lastMessage: {
        content: 'Perfecto, alí estarei',
        timestamp: new Date('2025-04-03T14:35:00')
      }
    }
  ]);

  // Forms
  const newMessageForm = useForm({
    defaultValues: {
      recipient: '',
      content: ''
    }
  });

  const newGroupForm = useForm({
    defaultValues: {
      name: '',
      participants: [] as string[]
    }
  });

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle sending a new direct message
  const handleNewMessage = (data: any) => {
    const recipient = facultyMembers.find(member => member.id === data.recipient);
    
    if (recipient) {
      // Check if conversation already exists
      const existingConversation = conversations.find(
        convo => !convo.isGroup && convo.participants.some(p => p.id === recipient.id)
      );

      if (existingConversation) {
        // Add message to existing conversation
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'Usuario Actual',
          senderId: 'current',
          content: data.content,
          timestamp: new Date(),
          read: false
        };

        const updatedConversations = conversations.map(convo => 
          convo.id === existingConversation.id ? {
            ...convo,
            messages: [...convo.messages, newMessage],
            lastMessage: {
              content: data.content,
              timestamp: new Date()
            }
          } : convo
        );

        setConversations(updatedConversations);
        setSelectedConversation({
          ...existingConversation,
          messages: [...existingConversation.messages, newMessage],
          lastMessage: {
            content: data.content,
            timestamp: new Date()
          }
        });
      } else {
        // Create new conversation
        const newMessage: Message = {
          id: '1',
          sender: 'Usuario Actual',
          senderId: 'current',
          content: data.content,
          timestamp: new Date(),
          read: false
        };

        const newConversation: Conversation = {
          id: Date.now().toString(),
          name: recipient.name,
          isGroup: false,
          participants: [recipient],
          messages: [newMessage],
          lastMessage: {
            content: data.content,
            timestamp: new Date()
          }
        };

        setConversations([newConversation, ...conversations]);
        setSelectedConversation(newConversation);
      }
    }

    setOpenNewMessageDialog(false);
    newMessageForm.reset();
  };

  // Handle creating a new group
  const handleNewGroup = (data: any) => {
    const selectedParticipants = data.participants.map((id: string) => 
      facultyMembers.find(member => member.id === id)
    ).filter(Boolean) as Participant[];

    const newGroup: Conversation = {
      id: Date.now().toString(),
      name: data.name,
      isGroup: true,
      participants: selectedParticipants,
      messages: [],
    };

    setConversations([newGroup, ...conversations]);
    setSelectedConversation(newGroup);
    setOpenNewGroupDialog(false);
    newGroupForm.reset();
  };

  // Handle sending a message in the current conversation
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Usuario Actual',
      senderId: 'current',
      content: messageInput,
      timestamp: new Date(),
      read: false
    };

    const updatedConversations = conversations.map(convo => 
      convo.id === selectedConversation.id ? {
        ...convo,
        messages: [...convo.messages, newMessage],
        lastMessage: {
          content: messageInput,
          timestamp: new Date()
        }
      } : convo
    );

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: {
        content: messageInput,
        timestamp: new Date()
      }
    });

    setMessageInput('');
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mensaxes</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-scola-primary text-scola-primary"
            onClick={() => setOpenNewGroupDialog(true)}
          >
            <Users className="mr-2 h-4 w-4" /> Crear grupo
          </Button>
          <Button 
            className="bg-scola-primary hover:bg-scola-primary/90"
            onClick={() => setOpenNewMessageDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nova mensaxe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations list */}
        <Card className="border border-scola-gray-dark md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Conversas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {conversations.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <li key={conversation.id}>
                      <button
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                          selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-start">
                          <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
                            conversation.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-scola-pastel text-scola-primary'
                          }`}>
                            {conversation.isGroup ? (
                              <Users className="h-5 w-5" />
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="font-medium truncate">
                                {conversation.name}
                              </p>
                              {conversation.lastMessage && (
                                <p className="text-xs text-gray-500">
                                  {formatDate(conversation.lastMessage.timestamp)}
                                </p>
                              )}
                            </div>
                            {conversation.lastMessage && (
                              <p className="text-sm text-gray-500 truncate">
                                {conversation.lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Non hai conversas
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="border border-scola-gray-dark md:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center">
                  <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
                    selectedConversation.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-scola-pastel text-scola-primary'
                  }`}>
                    {selectedConversation.isGroup ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {selectedConversation.name}
                    </CardTitle>
                    {selectedConversation.isGroup && (
                      <p className="text-xs text-gray-500">
                        {selectedConversation.participants.length} participantes
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100vh-350px)]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.length > 0 ? (
                    selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.senderId === 'current'
                              ? 'bg-scola-primary text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedConversation.isGroup && message.senderId !== 'current' && (
                            <p className="text-xs font-medium mb-1">
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Comeza a conversa
                    </div>
                  )}
                </div>
                {/* Message input */}
                <div className="p-3 border-t flex">
                  <Input
                    placeholder="Escribe a túa mensaxe..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="mr-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-scola-primary hover:bg-scola-primary/90"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="h-[calc(100vh-300px)] flex items-center justify-center text-gray-500">
              Selecciona unha conversa para comezar
            </div>
          )}
        </Card>
      </div>

      {/* Dialog to create a new message */}
      <Dialog open={openNewMessageDialog} onOpenChange={setOpenNewMessageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova mensaxe</DialogTitle>
          </DialogHeader>
          <Form {...newMessageForm}>
            <form onSubmit={newMessageForm.handleSubmit(handleNewMessage)} className="space-y-4">
              <FormField
                control={newMessageForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinatario</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar destinatario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        {facultyMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} ({member.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newMessageForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaxe</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Escribe a túa mensaxe..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenNewMessageDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Enviar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog to create a new group */}
      <Dialog open={openNewGroupDialog} onOpenChange={setOpenNewGroupDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear novo grupo</DialogTitle>
          </DialogHeader>
          <Form {...newGroupForm}>
            <form onSubmit={newGroupForm.handleSubmit(handleNewGroup)} className="space-y-4">
              <FormField
                control={newGroupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do grupo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Titorías 6º" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newGroupForm.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participantes</FormLabel>
                    <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                      {facultyMembers.map((member) => (
                        <div key={member.id} className="flex items-center py-2">
                          <input
                            type="checkbox"
                            id={`member-${member.id}`}
                            value={member.id}
                            onChange={(e) => {
                              const selectedValues = [...(field.value || [])];
                              if (e.target.checked) {
                                selectedValues.push(member.id);
                              } else {
                                const index = selectedValues.indexOf(member.id);
                                if (index !== -1) selectedValues.splice(index, 1);
                              }
                              field.onChange(selectedValues);
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={`member-${member.id}`} className="text-sm">
                            {member.name} ({member.role})
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenNewGroupDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Crear grupo</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MessagesPage;
