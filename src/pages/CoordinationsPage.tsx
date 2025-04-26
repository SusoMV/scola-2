
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { TeamsSection } from '@/components/coordinations/TeamsSection';

const CoordinationsPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Coordinacións e equipos</h1>
        <TeamsSection />
      </div>
    </DashboardLayout>
  );
};

export default CoordinationsPage;
