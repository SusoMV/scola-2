
import React from 'react';
import { Book, Building2, FileStack, Globe, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const createQuickLinks = (schoolWebUrl: string) => [
  {
    name: 'Web do centro',
    icon: <Globe className="h-5 w-5 text-blue-500" />,
    link: schoolWebUrl || '#',
    external: true,
    customAction: true
  },
  {
    name: 'Documentación',
    icon: <FileStack className="h-5 w-5 text-orange-500" />,
    link: '/documents',
    external: false
  },
  {
    name: 'Coordinacións e equipos',
    icon: <Users className="h-5 w-5 text-green-600" />,
    link: '/teaching-teams',
    external: false
  },
  {
    name: 'Horarios',
    icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
    link: '/schedules',
    external: false
  },
  {
    name: 'Espazos',
    icon: <Building2 className="h-5 w-5 text-pink-500" />,
    link: '/spaces',
    external: false
  },
  {
    name: 'Biblioteca',
    icon: <Book className="h-5 w-5 text-yellow-500" />,
    link: '#',
    external: false
  }
];
