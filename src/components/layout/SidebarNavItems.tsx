
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Building2, 
  Users, 
  MessageSquare,
  GraduationCap,
  ArrowUpDown,
  FileText
} from 'lucide-react';

export const navItems = [
  { 
    name: 'Panel', 
    path: '/dashboard', 
    icon: <LayoutDashboard className="h-5 w-5" /> 
  },
  { 
    name: 'Substitucións', 
    path: '/substitutions', 
    icon: <ArrowUpDown className="h-5 w-5" /> 
  },
  { 
    name: 'Axenda', 
    path: '/agenda', 
    icon: <CalendarDays className="h-5 w-5" /> 
  },
  { 
    name: 'Espazos', 
    path: '/spaces', 
    icon: <Building2 className="h-5 w-5" /> 
  },
  { 
    name: 'Claustro', 
    path: '/faculty', 
    icon: <Users className="h-5 w-5" /> 
  },
  { 
    name: 'Mensaxes', 
    path: '/messages', 
    icon: <MessageSquare className="h-5 w-5" /> 
  },
  { 
    name: 'Titorías', 
    path: '/tutoring', 
    icon: <GraduationCap className="h-5 w-5" /> 
  },
  { 
    name: 'Documentos', 
    path: '/school-documents', 
    icon: <FileText className="h-5 w-5" /> 
  },
];

interface SidebarNavItemsProps {
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {navItems.map(item => (
        <Link 
          key={item.path} 
          to={item.path}
          className={cn(
            "flex items-center px-4 py-2 rounded-md transition-colors",
            isActive(item.path)
              ? "bg-scola-primary text-white"
              : "text-gray-700 hover:bg-scola-pastel hover:text-scola-primary"
          )}
        >
          {item.icon}
          <span className="ml-3">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNavItems;
