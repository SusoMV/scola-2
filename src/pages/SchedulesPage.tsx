
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Clock } from 'lucide-react';
import TeacherSchedule from '@/components/schedules/TeacherSchedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupSchedule from '@/components/schedules/GroupSchedule';

const SchedulesPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Horarios</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <Tabs defaultValue="teachers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="teachers">Horarios docentes</TabsTrigger>
          <TabsTrigger value="groups">Horarios de grupos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teachers" className="space-y-6">
          <TeacherSchedule />
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6">
          <GroupSchedule />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SchedulesPage;
