
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Plus, Send, User, Users, UserPlus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockUsers = [
  { id: '1', name: 'Ana María López', avatar: '' },
  { id: '2', name: 'Carlos Rodríguez', avatar: '' },
  { id: '3', name: 'Laura Fernández', avatar: '' },
  { id: '4', name: 'Miguel González', avatar: '' },
  { id: '5', name: 'Elena Martínez', avatar: '' },
];

const mockGroups = [
  { id: '1', name: 'Equipo directivo', members: ['1', '5'] },
  { id: '2', name: 'Departamento de Ciencias', members: ['1', '3', '4'] },
  { id: '3', name: 'Coordinación TIC', members: ['2', '4', '5'] },
];

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    recipientId: 'current',
    text: 'Bos días, lembrarte a reunión de departamento ás 10:00',
    timestamp: new Date('2025-04-04T09:30:00'),
  },
  {
    id: '2',
    senderId: 'current',
    recipientId: '1',
    text: 'Grazas pola lembranza, estarei alí',
    timestamp: new Date('2025-04-04T09:32:00'),
  },
  {
    id: '3',
    senderId: '2',
    recipientId: 'current',
    text: 'Poderías compartir o material da última sesión?',
    timestamp: new Date('2025-04-04T11:15:00'),
  },
  {
    id: '4',
    senderId: 'current',
    recipientId: '3',
    text: 'Enviáronche os documentos para revisar?',
    timestamp: new Date('2025-04-04T12:30:00'),
  },
  {
    id: '5',
    senderId: '3',
    recipientId: 'current',
    text: 'Si, xa os recibín e estou a revisalos',
    timestamp: new Date('2025-04-04T12:45:00'),
  },
];

// Types
interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  isGroup: boolean;
  members?: string[];
  unread?: number;
  lastMessageTime?: Date;
}

// Combine users and groups into chats
const createChats = (): Chat[] => {
  const userChats = mockUsers.map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    isGroup: false,
    lastMessage: mockMessages.find(
      m => (m.senderId === user.id && m.recipientId === 'current') || 
           (m.senderId === 'current' && m.recipientId === user.id)
    )?.text,
    lastMessageTime: mockMessages.find(
      m => (m.senderId === user.id && m.recipientId === 'current') || 
           (m.senderId === 'current' && m.recipientId === user.id)
    )?.timestamp,
    unread: mockMessages.filter(
      m => m.senderId === user.id && m.recipientId === 'current'
    ).length,
  }));

  const groupChats = mockGroups.map(group => ({
    id: `group-${group.id}`,
    name: group.name,
    isGroup: true,
    members: group.members,
    lastMessage: 'Última actividade do grupo',
    lastMessageTime: new Date('2025-04-04T13:00:00'),
    unread: 0,
  }));

  return [...userChats, ...groupChats];
};

const MessagesPage = () => {
  const [chats] = useState<Chat[]>(createChats());
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<any[]>(mockMessages);
  const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Forms
  const newMessageForm = useForm({
    defaultValues: {
      recipient: '',
      message: '',
    },
  });

  const newGroupForm = useForm({
    defaultValues: {
      name: '',
      members: [] as string[],
    },
  });

  // Get messages for selected chat
  const getChatMessages = () => {
    if (!selectedChat) return [];
    
    if (selectedChat.isGroup) {
      // In a real app, you would fetch group messages
      return messages.filter(m => 
        (m.senderId === 'current' || m.recipientId === 'current')
      ).slice(0, 2);
    } else {
      return messages.filter(m => 
        (m.senderId === selectedChat.id && m.recipientId === 'current') || 
        (m.senderId === 'current' && m.recipientId === selectedChat.id)
      );
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const newMsg = {
      id: `${messages.length + 1}`,
      senderId: 'current',
      recipientId: selectedChat.id,
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // Handle creating a new message/conversation
  const handleCreateNewMessage = (data: any) => {
    console.log('New message to:', data.recipient, 'Message:', data.message);
    
    // In a real app, you would send the message to the API
    const newMsg = {
      id: `${messages.length + 1}`,
      senderId: 'current',
      recipientId: data.recipient,
      text: data.message,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    
    // Select the chat with this user
    const userChat = chats.find(c => c.id === data.recipient);
    if (userChat) {
      setSelectedChat(userChat);
    }
    
    setNewMessageDialogOpen(false);
    newMessageForm.reset();
  };

  // Handle creating a new group
  const handleCreateNewGroup = (data: any) => {
    console.log('New group:', data.name, 'Members:', data.members);
    setNewGroupDialogOpen(false);
    newGroupForm.reset();
    // In a real app, you would create the group in the backend
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mensaxes</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={newMessageDialogOpen} onOpenChange={setNewMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-scola-primary border-scola-primary hover:bg-scola-pastel">
                <Plus className="mr-2 h-4 w-4" /> Nova mensaxe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova mensaxe</DialogTitle>
                <DialogDescription>
                  Elixe un destinatario e escribe a túa mensaxe
                </DialogDescription>
              </DialogHeader>
              <Form {...newMessageForm}>
                <form onSubmit={newMessageForm.handleSubmit(handleCreateNewMessage)} className="space-y-4">
                  <FormField
                    control={newMessageForm.control}
                    name="recipient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destinatario</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                            {...field}
                          >
                            <option value="">Selecciona un destinatario</option>
                            {mockUsers.map(user => (
                              <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newMessageForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaxe</FormLabel>
                        <FormControl>
                          <textarea 
                            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                            placeholder="Escribe a túa mensaxe aquí..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Enviar</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={newGroupDialogOpen} onOpenChange={setNewGroupDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-scola-primary border-scola-primary hover:bg-scola-pastel">
                <UserPlus className="mr-2 h-4 w-4" /> Crear grupo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear novo grupo</DialogTitle>
                <DialogDescription>
                  Asigna un nome e engade membros ao grupo
                </DialogDescription>
              </DialogHeader>
              <Form {...newGroupForm}>
                <form onSubmit={newGroupForm.handleSubmit(handleCreateNewGroup)} className="space-y-4">
                  <FormField
                    control={newGroupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do grupo</FormLabel>
                        <FormControl>
                          <Input placeholder="Introduce o nome do grupo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newGroupForm.control}
                    name="members"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membros</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {mockUsers.map(user => (
                              <div key={user.id} className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id={`user-${user.id}`} 
                                  value={user.id}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const value = e.target.value;
                                    if (checked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter(v => v !== value));
                                    }
                                  }}
                                  className="rounded border-gray-300" 
                                />
                                <label htmlFor={`user-${user.id}`} className="text-sm">
                                  {user.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Crear grupo</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chat list */}
        <Card className="border border-scola-gray-dark md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Conversacións
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y">
                {chats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedChat?.id === chat.id ? 'bg-scola-pastel' : ''}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback className={chat.isGroup ? "bg-scola-primary" : "bg-blue-500"}>
                            {chat.isGroup ? <Users className="h-5 w-5" /> : chat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unread && chat.unread > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          {chat.lastMessageTime && (
                            <span className="text-xs text-gray-500">
                              {format(chat.lastMessageTime, 'HH:mm')}
                            </span>
                          )}
                        </div>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Chat messages */}
        <Card className="border border-scola-gray-dark md:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback className={selectedChat.isGroup ? "bg-scola-primary" : "bg-blue-500"}>
                      {selectedChat.isGroup ? <Users className="h-5 w-5" /> : selectedChat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {selectedChat.name}
                    </CardTitle>
                    {selectedChat.isGroup && (
                      <p className="text-xs text-gray-500">
                        {selectedChat.members?.length} membros
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[500px]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {getChatMessages().map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.senderId === 'current' 
                              ? 'bg-scola-primary text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {msg.senderId !== 'current' && selectedChat.isGroup && (
                            <p className="text-xs font-medium mb-1">
                              {mockUsers.find(u => u.id === msg.senderId)?.name || 'Usuario'}
                            </p>
                          )}
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs text-right mt-1 ${
                            msg.senderId === 'current' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {format(msg.timestamp, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input 
                      value={newMessage} 
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe unha mensaxe..." 
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleSendMessage}
                      className="text-scola-primary hover:bg-scola-pastel"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-gray-500">
              <User className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg">Selecciona unha conversa</p>
              <p className="text-sm">ou crea unha nova</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
