
import React from 'react';
import { Globe, FileText, Clock, Brain, Shield, Book, ClipboardList, Users, UsersRound, FolderArchive } from 'lucide-react';

export interface QuickLink {
  name: string;
  icon: React.ReactNode;
  link: string;
  external?: boolean;
  customAction?: boolean;
}

export const createQuickLinks = (schoolWebUrl: string): QuickLink[] => [
  {
    name: 'Portal Educativo',
    icon: <Globe className="h-6 w-6 text-scola-primary" />,
    link: 'https://www.edu.xunta.gal/portal/',
    external: true,
  },
  {
    name: 'Web do centro',
    icon: <Globe className="h-6 w-6 text-scola-primary" />,
    link: schoolWebUrl,
    external: true,
    customAction: true,
  },
  {
    name: 'Adscrición e grupos',
    icon: <Users className="h-6 w-6 text-scola-primary" />,
    link: '/teacher-assignment',
  },
  {
    name: 'Gardas',
    icon: <Shield className="h-6 w-6 text-scola-primary" />,
    link: '/documents',
  },
  {
    name: 'Planificación de aula',
    icon: <Book className="h-6 w-6 text-scola-primary" />,
    link: '/classroom-planning',
  },
  {
    name: 'Actas',
    icon: <ClipboardList className="h-6 w-6 text-scola-primary" />,
    link: '/meeting-minutes',
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
    name: 'Documentos, plans e proxectos',
    icon: <FolderArchive className="h-6 w-6 text-scola-primary" />,
    link: '/school-documents',
  },
  {
    name: 'Modelos',
    icon: <FileText className="h-6 w-6 text-scola-primary" />,
    link: '/templates',
  },
  {
    name: 'IA',
    icon: <Brain className="h-6 w-6 text-scola-primary" />,
    link: '/ai-in-development',
  },
  {
    name: 'Coordinacións e equipos',
    icon: <UsersRound className="h-6 w-6 text-scola-primary" />,
    link: '/coordinations',
  },
];
