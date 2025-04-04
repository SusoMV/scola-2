
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className="min-h-screen bg-scola-gray flex">
      <Sidebar />
      
      <main className={cn(
        "flex-1 ml-0 lg:ml-64 p-4 md:p-8 transition-all", 
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
