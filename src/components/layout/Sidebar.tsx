
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
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
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user data from auth context (in a real app this would come from a user context or state management)
  const userData = {
    name: user?.user_metadata?.full_name || 'Usuario',
    avatar: user?.user_metadata?.avatar_url || '',
    role: user?.user_metadata?.role || 'Docente',
    specialty: user?.user_metadata?.specialty || 'Educación'
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
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-scola-primary text-white">
                {userData.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{userData.name}</span>
              <span className="text-xs text-gray-500">{userData.role} - {userData.specialty}</span>
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
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-1">
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
        </ScrollArea>

        {/* Logout button - aligned left */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full flex items-center text-gray-700 hover:bg-scola-pastel hover:text-scola-primary justify-start px-4"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Pechar sesión</span>
          </Button>
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
