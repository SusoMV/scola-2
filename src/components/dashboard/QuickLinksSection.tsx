
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ExternalLink, CalendarDays, Globe, FileText, Clock } from 'lucide-react';

const QuickLinksSection = () => {
  const quickLinks = [
    {
      name: 'Próximas reservas',
      icon: <CalendarDays className="h-6 w-6 text-scola-primary" />,
      link: '/spaces',
    },
    {
      name: 'Portal Educativo',
      icon: <Globe className="h-6 w-6 text-scola-primary" />,
      link: 'https://www.edu.xunta.gal/portal/',
      external: true,
    },
    {
      name: 'Web do centro',
      icon: <Globe className="h-6 w-6 text-scola-primary" />,
      link: 'https://www.edu.xunta.gal/centros/ceipsanmarcos/',
      external: true,
    },
    {
      name: 'Gardas',
      icon: <Clock className="h-6 w-6 text-scola-primary" />,
      link: '/substitutions',
    },
    {
      name: 'Datos do centro',
      icon: <FileText className="h-6 w-6 text-scola-primary" />,
      link: '/school-info',
    },
    {
      name: 'Horarios',
      icon: <Clock className="h-6 w-6 text-scola-primary" />,
      link: '/schedules',
    },
    {
      name: 'Documentos',
      icon: <FileText className="h-6 w-6 text-scola-primary" />,
      link: '/documents',
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Enlaces rápidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <div key={index}>
              {link.external ? (
                <a 
                  href={link.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
                >
                  <div className="text-scola-primary mb-2">
                    {link.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 line-clamp-2">{link.name}</span>
                  {link.external && <ExternalLink className="h-3 w-3 text-gray-400 mt-1" />}
                </a>
              ) : (
                <Link 
                  to={link.link}
                  className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
                >
                  <div className="text-scola-primary mb-2">
                    {link.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 line-clamp-2">{link.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinksSection;
