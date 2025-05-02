
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AttendanceControl from '@/components/tutoring/AttendanceControl';
import TutoringSessions from '@/components/tutoring/TutoringSessions';
import NotesSection from '@/components/tutoring/NotesSection';
import ComedorSection from '@/components/tutoring/ComedorSection';
import { GraduationCap } from 'lucide-react';

const TutoringPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Titorías</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="mb-4 bg-muted">
          <TabsTrigger 
            value="attendance"
          >
            Control de asistencia
          </TabsTrigger>
          <TabsTrigger 
            value="sessions"
          >
            Titorías solicitadas
          </TabsTrigger>
          <TabsTrigger 
            value="notes"
          >
            Anotacións
          </TabsTrigger>
          <TabsTrigger 
            value="comedor"
          >
            Comedor
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance">
          <AttendanceControl />
        </TabsContent>
        
        <TabsContent value="sessions">
          <TutoringSessions />
        </TabsContent>
        
        <TabsContent value="notes">
          <NotesSection />
        </TabsContent>

        <TabsContent value="comedor">
          <ComedorSection />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TutoringPage;
