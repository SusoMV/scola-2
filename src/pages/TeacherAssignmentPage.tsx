
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen } from 'lucide-react';
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
          <CardTitle className="mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-scola-primary" />
              <h1 className="text-2xl font-bold">Adscrición e grupos</h1>
            </div>
            <div className="dotted-border w-full h-1 mt-2"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'}`}>
                  <TabsTrigger value="assignment" className="text-xs md:text-sm rounded-md">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Adscrición docente</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="text-xs md:text-sm rounded-md">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Grupos</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="assignment" className="mt-6">
                <TeacherAssignmentTab />
              </TabsContent>
              
              <TabsContent value="groups" className="mt-6">
                <StudentGroupsTab />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
