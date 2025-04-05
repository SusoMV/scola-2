
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AttendanceControl from '@/components/tutoring/AttendanceControl';
import TutoringSessions from '@/components/tutoring/TutoringSessions';
import { BookOpen } from 'lucide-react';
import SectionTitle from '@/components/ui/section-title';

const TutoringPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <SectionTitle icon={BookOpen}>Titorías</SectionTitle>
      </div>
      
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="attendance">Control de asistencia</TabsTrigger>
          <TabsTrigger value="sessions">Titorías solicitadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance">
          <AttendanceControl />
        </TabsContent>
        
        <TabsContent value="sessions">
          <TutoringSessions />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TutoringPage;
