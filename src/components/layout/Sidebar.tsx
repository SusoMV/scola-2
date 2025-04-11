
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import SidebarNavItems from './SidebarNavItems';
import SidebarUserProfile from './SidebarUserProfile';
import { useSidebarProfile } from '@/hooks/use-sidebar-profile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const userProfile = useSidebarProfile();

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

        <SidebarUserProfile userProfile={userProfile} />
        <SidebarNavItems />

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
