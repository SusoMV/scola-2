
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
            <Users className="h-5 w-5 mr-2 text-scola-primary" />
            Adscrición e grupos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'} mb-4`}>
              <TabsTrigger value="assignment" className="text-xs md:text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Adscrición docente</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="groups" className="text-xs md:text-sm">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Grupos</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignment" className="mt-0">
              <TeacherAssignmentTab />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-0">
              <StudentGroupsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
