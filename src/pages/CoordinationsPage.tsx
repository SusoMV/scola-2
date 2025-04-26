
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { TeamsSection } from '@/components/coordinations/TeamsSection';
import { UsersRound } from 'lucide-react';

const CoordinationsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <UsersRound className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Coordinacións e equipos</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <TeamsSection />
    </DashboardLayout>
  );
};

export default CoordinationsPage;
