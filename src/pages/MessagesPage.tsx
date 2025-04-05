
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Import our new components
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

const MessagesPage = () => {
  const { user } = useAuth();
  const [openNewMessageDialog, setOpenNewMessageDialog] = useState(false);
  const [openNewGroupDialog, setOpenNewGroupDialog] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [facultyMembers, setFacultyMembers] = useState<Participant[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (user) {
        try {
          // First, get current user's information
          const { data: currentUserData, error: currentUserError } = await supabase
            .from('profiles')
            .select('full_name, school_id')
            .eq('id', user.id)
            .single();
            
          if (currentUserError) throw currentUserError;
          
          setCurrentUserName(currentUserData.full_name);
          
          // Then get all faculty members from the same school
          const { data: facultyData, error: facultyError } = await supabase
            .from('profiles')
            .select('id, full_name, role')
            .eq('school_id', currentUserData.school_id)
            .neq('id', user.id); // Exclude current user
            
          if (facultyError) throw facultyError;
          
          const formattedFaculty: Participant[] = facultyData.map(member => ({
            id: member.id,
            name: member.full_name,
            role: member.role
          }));
          
          setFacultyMembers(formattedFaculty);
          
          // For now, we're using mock data for conversations
          // In a real app, you would fetch this from a messages table in Supabase
          setConversations([
            {
              id: '1',
              name: facultyData[0]?.full_name || 'Usuario',
              isGroup: false,
              participants: [
                {
                  id: facultyData[0]?.id || '1',
                  name: facultyData[0]?.full_name || 'Usuario',
                  role: facultyData[0]?.role || 'docente'
                }
              ],
              messages: [
                {
                  id: '1',
                  sender: facultyData[0]?.full_name || 'Usuario',
                  senderId: facultyData[0]?.id || '1',
                  content: 'Bos días, como vai todo?',
                  timestamp: new Date(Date.now() - 86400000), // Yesterday
                  read: true
                },
                {
                  id: '2',
                  sender: currentUserData.full_name,
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
            }
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Erro ao cargar os datos');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [user]);

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle sending a new direct message
  const handleNewMessage = (data: { recipient: string, content: string }) => {
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
        // Create new conversation
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

  // Handle creating a new group
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

  // Handle sending a message in the current conversation
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
        <ConversationList 
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          isLoading={isLoading}
          formatDate={formatDate}
        />

        {/* Chat area */}
        <ChatArea 
          selectedConversation={selectedConversation}
          formatDate={formatDate}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Dialog to create a new message */}
      <NewMessageDialog 
        open={openNewMessageDialog}
        onOpenChange={setOpenNewMessageDialog}
        facultyMembers={facultyMembers}
        onSubmit={handleNewMessage}
      />

      {/* Dialog to create a new group */}
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
