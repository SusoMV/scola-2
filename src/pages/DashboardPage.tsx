
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import SummaryCards from '@/components/dashboard/SummaryCards';
import ScheduleSection from '@/components/dashboard/ScheduleSection';
import QuickLinksSection from '@/components/dashboard/QuickLinksSection';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  // Use the user's name from auth context if available, otherwise use 'Suso' as in the design
  const userName = user?.user_metadata?.full_name || 'Suso';

  return (
    <DashboardLayout>
      <WelcomeSection userName={userName} />
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleSection />
        <QuickLinksSection />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
