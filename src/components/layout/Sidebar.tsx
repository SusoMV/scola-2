import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Building2, 
  Users, 
  MessageSquare,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Settings,
  ArrowUpDown
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<{
    full_name: string;
    avatar_url: string;
    role: string;
    specialty: string;
  }>({
    full_name: '',
    avatar_url: '',
    role: '',
    specialty: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, profile_image_url, role, specialty, school_name')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
          } else if (data) {
            setUserProfile({
              full_name: data.full_name || user?.user_metadata?.full_name || 'Usuario',
              avatar_url: data.profile_image_url || user?.user_metadata?.avatar_url || '',
              role: data.role || user?.user_metadata?.role || 'docente',
              specialty: data.specialty || user?.user_metadata?.specialization || ''
            });
            
            if (user && (
              user.user_metadata?.full_name !== data.full_name || 
              user.user_metadata?.role !== data.role ||
              user.user_metadata?.specialty !== data.specialty ||
              user.user_metadata?.school_name !== data.school_name ||
              user.user_metadata?.avatar_url !== data.profile_image_url
            )) {
              try {
                await supabase.auth.updateUser({
                  data: {
                    full_name: data.full_name,
                    role: data.role,
                    specialty: data.specialty,
                    school_name: data.school_name,
                    avatar_url: data.profile_image_url
                  }
                });
              } catch (updateError) {
                console.error('Error updating user metadata:', updateError);
              }
            }
          }
        } catch (error) {
          console.error('Error in fetchUserProfile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
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

      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="p-4 flex justify-center">
          <ScolaLogo size="md" />
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-scola-primary text-white">
              <AvatarImage src={userProfile.avatar_url} alt={userProfile.full_name} />
              <AvatarFallback>
                {userProfile.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{userProfile.full_name}</span>
              <span className="text-xs text-gray-500">
                {userProfile.role === 'directivo' ? 'Directivo' : 'Docente'} - {userProfile.specialty}
              </span>
            </div>
          </div>
          <Link to="/profile">
            <Button 
              variant="outline" 
              className="mt-3 w-full text-scola-primary border-scola-primary hover:bg-scola-pastel"
            >
              <Settings className="h-4 w-4 mr-2" />
              Editar perfil
            </Button>
          </Link>
        </div>

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

        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-gray-700 hover:bg-scola-pastel hover:text-scola-primary"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Pechar sesión</span>
          </Button>
        </div>
      </div>

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
