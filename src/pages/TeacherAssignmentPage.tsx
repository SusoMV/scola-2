
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

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
          <CardTitle className="text-lg md:text-xl font-medium flex items-center text-purple-700">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            Adscrición e grupos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'} bg-purple-100`}>
                  <TabsTrigger value="assignment" className="text-xs md:text-sm rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Adscrición docente</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="text-xs md:text-sm rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Grupos</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                {activeTab === "groups" && (
                  <Button 
                    onClick={() => document.dispatchEvent(new CustomEvent('open-add-group-dialog'))}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Engadir grupo
                  </Button>
                )}
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
