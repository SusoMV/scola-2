
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  className 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <main className={cn(
        "flex-1 ml-0 lg:ml-64 p-4 md:p-8 transition-all", 
        isMobile && "pb-20", // Add padding at the bottom for mobile to avoid content being hidden by the navigation bar
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
