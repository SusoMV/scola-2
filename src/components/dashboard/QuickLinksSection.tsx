import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'lucide-react';

interface QuickLink {
  title: string;
  description: string;
  href: string;
}

const QuickLinksSection = () => {
  const quickLinks: QuickLink[] = [
    {
      title: 'Solicitar titoría',
      description: 'Accede ao formulario para solicitar titorías.',
      href: '/tutoring'
    },
    {
      title: 'Ver horarios',
      description: 'Consulta os horarios de clases e actividades.',
      href: '/schedules'
    },
    {
      title: 'Reservar espazo',
      description: 'Reserva aulas ou outros espazos do centro.',
      href: '/spaces'
    },
    {
      title: 'Acceder ao Drive',
      description: 'Accede aos documentos compartidos do centro.',
      href: '/documents'
    }
  ];

  return (
    <Card className="mt-6 border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <CardTitle icon={Link}>Accesos rápidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="block p-4 bg-white rounded-md border border-scola-gray-dark hover:shadow-md transition-shadow duration-200"
            >
              <h4 className="text-lg font-medium text-gray-800">{link.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{link.description}</p>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinksSection;
