
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Brain, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Clock, 
  Key, 
  Users, 
  Shield, 
  Smile, 
  Library, 
  Utensils, 
  Bus, 
  UserPlus 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AIChatbotButton from '@/components/ai/AIChatbotButton';
import { toast } from '@/components/ui/use-toast';

const AiDevelopmentPage = () => {
  const handleChatbotClick = (name: string) => {
    toast({
      title: "Iniciando chatbot",
      description: `O chatbot de ${name} aínda está en desenvolvemento.`,
    });
  };

  const chatbots = [
    { name: 'Normativa xeral', icon: FileText, onClick: () => handleChatbotClick('Normativa xeral') },
    { name: 'Currículos', icon: BookOpen, onClick: () => handleChatbotClick('Currículos') },
    { name: 'ROC', icon: FileText, onClick: () => handleChatbotClick('ROC') },
    { name: 'Avaliación', icon: CheckSquare, onClick: () => handleChatbotClick('Avaliación') },
    { name: 'Horarios', icon: Clock, onClick: () => handleChatbotClick('Horarios') },
    { name: 'Permisos e licenzas', icon: Key, onClick: () => handleChatbotClick('Permisos e licenzas') },
    { name: 'Atención á diversidade', icon: Users, onClick: () => handleChatbotClick('Atención á diversidade') },
    { name: 'Protocolos', icon: Shield, onClick: () => handleChatbotClick('Protocolos') },
    { name: 'Convivencia', icon: Smile, onClick: () => handleChatbotClick('Convivencia') },
    { name: 'Bibliotecas', icon: Library, onClick: () => handleChatbotClick('Bibliotecas') },
    { name: 'Comedores', icon: Utensils, onClick: () => handleChatbotClick('Comedores') },
    { name: 'Transportes', icon: Bus, onClick: () => handleChatbotClick('Transportes') },
    { name: 'Admisión de alumnado', icon: UserPlus, onClick: () => handleChatbotClick('Admisión de alumnado') },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">IA</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chatbots.map((chatbot, index) => (
              <AIChatbotButton 
                key={index}
                name={chatbot.name}
                icon={chatbot.icon}
                onClick={chatbot.onClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AiDevelopmentPage;
