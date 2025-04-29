
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent } from '@/components/ui/card';
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
    // Check user role from auth context or localStorage
    const role = user?.user_metadata?.role || localStorage.getItem('user_role');
    setUserRole(role);

    // Redirect if not admin/director
    if (role && role !== 'directivo' && role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (userRole !== 'directivo' && userRole !== 'admin') {
    return null;
  }

  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Adscrición e grupos</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>

      <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'}`}>
          <TabsTrigger value="assignment" className="data-[state=active]:bg-[#0070C0] data-[state=active]:text-white">
            <span>Adscrición docente</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="data-[state=active]:bg-[#0070C0] data-[state=active]:text-white">
            <span>Grupos</span>
          </TabsTrigger>
        </TabsList>
        
        <Card className="border-0 shadow-sm mt-4">
          <CardContent className="p-6">
            <TabsContent value="assignment" className="mt-0">
              <TeacherAssignmentTab />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-0">
              <StudentGroupsTab />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </DashboardLayout>;
};

export default TeacherAssignmentPage;
