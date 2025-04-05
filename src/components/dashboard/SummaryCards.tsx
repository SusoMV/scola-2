
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, MessageSquare, Bell, ChevronsLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SummaryCards = () => {
  // This would be data from an API in a real app
  const summaryData = {
    absences: 2,
    events: 3,
    unreadMessages: 5,
    notifications: 4
  };

  const cards = [
    {
      icon: <ChevronsLeftRight className="h-6 w-6 text-scola-primary" />,
      title: "Ausencias",
      value: summaryData.absences,
      link: "/substitutions"
    },
    {
      icon: <Calendar className="h-6 w-6 text-scola-primary" />,
      title: "Eventos do día",
      value: summaryData.events,
      link: "/agenda"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-scola-primary" />,
      title: "Mensaxes",
      value: summaryData.unreadMessages,
      link: "/messages"
    },
    {
      icon: <Bell className="h-6 w-6 text-scola-primary" />,
      title: "Notificacións",
      value: summaryData.notifications,
      link: "/notifications"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map((card, index) => (
        <Link to={card.link} key={index} className="block">
          <Card className="border border-scola-gray-dark hover:shadow-md transition-shadow duration-200 hover:border-scola-primary">
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full w-12 h-12 bg-scola-pastel flex items-center justify-center mr-4">
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SummaryCards;
