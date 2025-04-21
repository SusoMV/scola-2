
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <DashboardLayout>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-scola-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Adscrición e grupos</h1>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-scola-primary to-transparent mt-2"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'} bg-scola-pastel`}>
              <TabsTrigger 
                value="assignment" 
                className="text-xs md:text-sm rounded-md data-[state=active]:bg-scola-primary data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-1" />
                <span>Adscrición docente</span>
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className="text-xs md:text-sm rounded-md data-[state=active]:bg-scola-primary data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-1" />
                <span>Grupos</span>
              </TabsTrigger>
            </TabsList>
              
            <TabsContent value="assignment" className="mt-6">
              <TeacherAssignmentTab />
            </TabsContent>
              
            <TabsContent value="groups" className="mt-6">
              <StudentGroupsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
