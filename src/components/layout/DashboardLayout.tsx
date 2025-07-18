
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
        "flex-1 ml-0 lg:ml-64 p-3 md:p-8 transition-all", 
        isMobile && "pb-14", // Reduced bottom padding to prevent content being hidden
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
