
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AttendanceControl from '@/components/tutoring/AttendanceControl';
import TutoringSessions from '@/components/tutoring/TutoringSessions';

const TutoringPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Titorías</h1>
      
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
