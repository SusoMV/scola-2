
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const TeacherAssignmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("assignment");
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const role = user?.user_metadata?.role || localStorage.getItem('user_role');
    setUserRole(role);
    
    if (role && role !== 'directivo' && role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (userRole !== 'directivo' && userRole !== 'admin') {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-[#0070C0]" />
            <h1 className="text-2xl font-bold">Adscrición e grupos</h1>
          </div>
          <div className="dotted-border w-full h-1 mt-2"></div>
        </div>

        <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="assignment" className="data-[state=active]:bg-[#0070C0] data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Adscrición docente
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-[#0070C0] data-[state=active]:text-white">
              Grupos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignment" className="mt-6">
            <TeacherAssignmentTab />
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <StudentGroupsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
