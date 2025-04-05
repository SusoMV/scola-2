
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Building2, Calendar, ChevronsLeftRight, Headphones, MessageSquare, Users } from 'lucide-react';

const SummaryCards = () => {
  const items = [
    {
      title: 'Substitucións',
      count: 3,
      path: '/substitutions',
      icon: <ChevronsLeftRight className="h-6 w-6 text-scola-primary" />,
    },
    {
      title: 'Claustro',
      count: 25,
      path: '/faculty',
      icon: <Users className="h-6 w-6 text-scola-primary" />,
    },
    {
      title: 'Espazos',
      count: 12,
      path: '/spaces',
      icon: <Building2 className="h-6 w-6 text-scola-primary" />,
    },
    {
      title: 'Mensaxes',
      count: 4,
      path: '/messages',
      icon: <MessageSquare className="h-6 w-6 text-scola-primary" />,
    },
    {
      title: 'Eventos',
      count: 7,
      path: '/agenda',
      icon: <Calendar className="h-6 w-6 text-scola-primary" />,
    },
    {
      title: 'Titorías',
      count: 2,
      path: '/tutoring',
      icon: <Headphones className="h-6 w-6 text-scola-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {items.map((item, index) => (
        <Link to={item.path} key={index}>
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {item.icon}
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-3xl font-bold text-scola-primary">
                    {item.count}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SummaryCards;
