
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ClipboardList } from 'lucide-react';
import MeetingMinutesUploader from '@/components/documents/MeetingMinutesUploader';

const MeetingMinutesPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-[#0070C0]" />
            <h1 className="text-2xl font-bold">Actas</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        <MeetingMinutesUploader />
      </div>
    </DashboardLayout>
  );
};

export default MeetingMinutesPage;
