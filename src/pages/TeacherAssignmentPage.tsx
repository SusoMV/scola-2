
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
    return null; // Don't render anything while checking permissions
  }

  return (
    <DashboardLayout>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl font-medium flex items-center">
            <Users className="h-5 w-5 mr-2 text-[#0070C0]" />
            Adscrición e grupos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-gray-100 mb-4 h-12 rounded-md">
              <TabsTrigger 
                value="assignment" 
                className={`w-1/2 h-full rounded-md ${activeTab === 'assignment' ? 'bg-[#0070C0] text-white' : 'text-gray-700'}`}
              >
                Adscrición docente
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className={`w-1/2 h-full rounded-md ${activeTab === 'groups' ? 'bg-[#0070C0] text-white' : 'text-gray-700'}`}
              >
                Grupos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignment">
              <TeacherAssignmentTab />
            </TabsContent>
            
            <TabsContent value="groups">
              <StudentGroupsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
