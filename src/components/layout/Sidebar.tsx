
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import SidebarNavItems, { navItems } from './SidebarNavItems';
import SidebarUserProfile from './SidebarUserProfile';
import { useSidebarProfile } from '@/hooks/use-sidebar-profile';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    signOut
  } = useAuth();
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return <>
      {/* Desktop Sidebar */}
      <div className={cn("fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 flex flex-col", isMobileMenuOpen ? "translate-x-0" : "-translate-x-full", className)}>
        <div className="p-4 flex justify-center">
          <ScolaLogo size="md" />
        </div>

        <SidebarUserProfile />
        <SidebarNavItems />

        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full flex items-center justify-start text-gray-700 hover:bg-scola-pastel hover:text-scola-primary" onClick={handleSignOut}>
            <LogOut className="h-5 w-5 mr-2" />
            <span>Pechar sesión</span>
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex justify-around items-center py-1">
          {navItems.map(item => <Button key={item.path} variant="ghost" size="sm" className={cn("flex flex-col items-center justify-center p-1", isActive(item.path) ? "text-scola-primary" : "text-gray-500 hover:text-scola-primary")} onClick={() => navigate(item.path)}>
              {item.icon}
              <span className="text-[10px] mt-1">{item.name}</span>
            </Button>)}
        </div>}

      {isMobileMenuOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={toggleMobileMenu} />}
    </>;
};

export default Sidebar;
