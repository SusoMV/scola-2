
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeacherTabs from '@/components/schedules/TeacherTabs';

const SchedulesPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto mt-6 px-2">
        <TeacherTabs />
      </div>
    </DashboardLayout>
  );
};

export default SchedulesPage;
