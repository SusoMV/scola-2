import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ConversationList from '@/components/messages/ConversationList';
import ChatArea from '@/components/messages/ChatArea';
import NewMessageDialog from '@/components/messages/NewMessageDialog';
import NewGroupDialog from '@/components/messages/NewGroupDialog';

interface Participant {
  id: string;
  name: string;
  role: string;
}

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

const sampleFacultyMembers: Participant[] = [
  { id: '1', name: 'Ana García', role: 'directivo' },
  { id: '2', name: 'Manuel López', role: 'docente' },
  { id: '3', name: 'Carmen Rodríguez', role: 'docente' },
  { id: '4', name: 'David Pérez', role: 'docente' }
];

const sampleConversations: Conversation[] = [
  {
    id: '1',
    name: 'Ana García',
    isGroup: false,
    participants: [sampleFacultyMembers[0]],
    messages: [
      {
        id: '1',
        sender: 'Ana García',
        senderId: '1',
        content: 'Bos días, como vai todo?',
        timestamp: new Date(Date.now() - 86400000),
        read: true
      },
      {
        id: '2',
        sender: 'Usuario Actual',
        senderId: 'current',
        content: 'Moi ben, grazas! E ti?',
        timestamp: new Date(Date.now() - 85000000),
        read: true
      }
    ],
    lastMessage: {
      content: 'Moi ben, grazas! E ti?',
      timestamp: new Date(Date.now() - 85000000)
    }
  },
  {
    id: '2',
    name: 'Grupo de Profesores',
    isGroup: true,
    participants: [sampleFacultyMembers[0], sampleFacultyMembers[1], sampleFacultyMembers[2]],
    messages: [
      {
        id: '1',
        sender: 'Manuel López',
        senderId: '2',
        content: 'Lembrarvos que mañá temos reunión de departamento',
        timestamp: new Date(Date.now() - 6400000),
        read: true
      },
      {
        id: '2',
        sender: 'Ana García',
        senderId: '1',
        content: 'A que hora era?',
        timestamp: new Date(Date.now() - 5000000),
        read: true
      },
      {
        id: '3',
        sender: 'Carmen Rodríguez',
        senderId: '3',
        content: 'Ás 16:00h na sala de profesores',
        timestamp: new Date(Date.now() - 4000000),
        read: true
      }
    ],
    lastMessage: {
      content: 'Ás 16:00h na sala de profesores',
      timestamp: new Date(Date.now() - 4000000)
    }
  }
];

const MessagesPage = () => {
  const { user } = useAuth();
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);
  const [openNewGroupDialog, setOpenNewGroupDialog] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [facultyMembers, setFacultyMembers] = useState<Participant[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState('Usuario Actual');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (user) {
        try {
          const { data: currentUserData, error: currentUserError } = await supabase
            .from('profiles')
            .select('full_name, school_id')
            .eq('id', user.id);
            
          if (currentUserError) {
            throw currentUserError;
          }
          
          if (currentUserData && currentUserData.length > 0) {
            setCurrentUserName(currentUserData[0].full_name);
            
            const { data: facultyData, error: facultyError } = await supabase
              .from('profiles')
              .select('id, full_name, role')
              .eq('school_id', currentUserData[0].school_id)
              .neq('id', user.id);
              
            if (facultyError) {
              throw facultyError;
            }
            
            if (facultyData && facultyData.length > 0) {
              const formattedFaculty: Participant[] = facultyData.map(member => ({
                id: member.id,
                name: member.full_name,
                role: member.role
              }));
              
              setFacultyMembers(formattedFaculty);
              
              setConversations(createSampleConversationsWithRealFaculty(formattedFaculty, currentUserData[0].full_name));
            } else {
              toast.info('Non se atoparon membros do claustro, usando datos de proba');
              setFacultyMembers(sampleFacultyMembers);
              setConversations(sampleConversations);
            }
          } else {
            toast.info('Perfil non atopado, usando datos de proba');
            setFacultyMembers(sampleFacultyMembers);
            setConversations(sampleConversations);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Erro ao cargar os datos, usando datos de proba');
          
          setFacultyMembers(sampleFacultyMembers);
          setConversations(sampleConversations);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFacultyMembers(sampleFacultyMembers);
        setConversations(sampleConversations);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const createSampleConversationsWithRealFaculty = (faculty: Participant[], userName: string): Conversation[] => {
    if (faculty.length === 0) return sampleConversations;
    
    const conversations: Conversation[] = [];
    
    if (faculty.length > 0) {
      conversations.push({
        id: '1',
        name: faculty[0].name,
        isGroup: false,
        participants: [faculty[0]],
        messages: [
          {
            id: '1',
            sender: faculty[0].name,
            senderId: faculty[0].id,
            content: 'Bos días, como vai todo?',
            timestamp: new Date(Date.now() - 86400000),
            read: true
          },
          {
            id: '2',
            sender: userName,
            senderId: 'current',
            content: 'Moi ben, grazas! E ti?',
            timestamp: new Date(Date.now() - 85000000),
            read: true
          }
        ],
        lastMessage: {
          content: 'Moi ben, grazas! E ti?',
          timestamp: new Date(Date.now() - 85000000)
        }
      });
    }
    
    if (faculty.length >= 3) {
      const groupParticipants = [faculty[0], faculty[1], faculty[2]];
      conversations.push({
        id: '2',
        name: 'Grupo de Profesores',
        isGroup: true,
        participants: groupParticipants,
        messages: [
          {
            id: '1',
            sender: faculty[1].name,
            senderId: faculty[1].id,
            content: 'Lembrarvos que mañá temos reunión de departamento',
            timestamp: new Date(Date.now() - 6400000),
            read: true
          },
          {
            id: '2',
            sender: faculty[0].name,
            senderId: faculty[0].id,
            content: 'A que hora era?',
            timestamp: new Date(Date.now() - 5000000),
            read: true
          },
          {
            id: '3',
            sender: faculty[2].name,
            senderId: faculty[2].id,
            content: 'Ás 16:00h na sala de profesores',
            timestamp: new Date(Date.now() - 4000000),
            read: true
          }
        ],
        lastMessage: {
          content: 'Ás 16:00h na sala de profesores',
          timestamp: new Date(Date.now() - 4000000)
        }
      });
    }
    
    return conversations;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNewMessage = (data: { recipient: string, content: string }) => {
    const recipient = facultyMembers.find(member => member.id === data.recipient);
    
    if (recipient) {
      const existingConversation = conversations.find(
        convo => !convo.isGroup && convo.participants.some(p => p.id === recipient.id)
      );

      if (existingConversation) {
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: currentUserName,
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
        const newMessage: Message = {
          id: '1',
          sender: currentUserName,
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
  };

  const handleNewGroup = (data: { name: string, participants: string[] }) => {
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
  };

  const handleSendMessage = (messageInput: string) => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUserName,
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
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-[#0070C0]" />
            <h1 className="text-2xl font-bold text-gray-800">Mensaxes</h1>
          </div>
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
        <ConversationList 
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          isLoading={isLoading}
          formatDate={formatDate}
        />

        <ChatArea 
          selectedConversation={selectedConversation}
          formatDate={formatDate}
          onSendMessage={handleSendMessage}
        />
      </div>

      <NewMessageDialog 
        open={openNewMessageDialog}
        onOpenChange={setOpenNewMessageDialog}
        facultyMembers={facultyMembers}
        onSubmit={handleNewMessage}
      />

      <NewGroupDialog 
        open={openNewGroupDialog}
        onOpenChange={setOpenNewGroupDialog}
        facultyMembers={facultyMembers}
        onSubmit={handleNewGroup}
      />
    </DashboardLayout>
  );
};

export default MessagesPage;
