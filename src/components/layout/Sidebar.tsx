
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  UserRound, 
  CalendarDays, 
  Building2, 
  Users, 
  MessageSquare,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navItems = [
  { 
    name: 'Panel', 
    path: '/dashboard', 
    icon: <LayoutDashboard className="h-5 w-5" /> 
  },
  { 
    name: 'Substitucións', 
    path: '/substitutions', 
    icon: <UserRound className="h-5 w-5" /> 
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
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mock user data (in a real app this would come from a user context or state management)
  const user = {
    name: 'Ana García',
    avatar: '',
    role: 'Docente',
    specialty: 'Educación Infantil'
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white border-scola-primary text-scola-primary hover:bg-scola-pastel"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar container */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo and branding */}
        <div className="p-4 border-b border-gray-200">
          <ScolaLogo size="md" />
        </div>

        {/* User profile section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-scola-primary text-white">
                {user.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.role} - {user.specialty}</span>
            </div>
          </div>
          <Link to="/profile">
            <Button 
              variant="outline" 
              className="mt-3 w-full text-scola-primary border-scola-primary hover:bg-scola-pastel"
            >
              Editar perfil
            </Button>
          </Link>
        </div>

        {/* Navigation links */}
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

        {/* Logout button */}
        <div className="p-4 border-t border-gray-200">
          <Link to="/login">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center text-gray-700 hover:bg-scola-pastel hover:text-scola-primary"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Pechar sesión</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
