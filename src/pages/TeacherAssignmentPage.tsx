
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Card, CardContent } from '@/components/ui/card';
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

  const handleOpenAddTeacherDialog = () => {
    document.dispatchEvent(new CustomEvent('open-add-teacher-dialog'));
  };

  const handleOpenAddGroupDialog = () => {
    document.dispatchEvent(new CustomEvent('open-add-group-dialog'));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Adscrición e grupos</h1>
          {activeTab === "assignment" ? (
            <Button 
              onClick={handleOpenAddTeacherDialog} 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Engadir adscrición
            </Button>
          ) : (
            <Button 
              onClick={handleOpenAddGroupDialog} 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Engadir grupo
            </Button>
          )}
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="assignment" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full border-b border-gray-200 bg-transparent p-0 h-auto">
                <div className="flex gap-6 px-6 pt-4">
                  <TabsTrigger 
                    value="assignment" 
                    className="rounded-none text-sm font-medium border-b-2 border-transparent px-0 py-3 data-[state=active]:border-[#9b87f5] data-[state=active]:text-[#9b87f5] hover:text-[#9b87f5] transition-colors bg-transparent"
                  >
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Adscrición docente</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="groups" 
                    className="rounded-none text-sm font-medium border-b-2 border-transparent px-0 py-3 data-[state=active]:border-[#9b87f5] data-[state=active]:text-[#9b87f5] hover:text-[#9b87f5] transition-colors bg-transparent"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Grupos</span>
                    </div>
                  </TabsTrigger>
                </div>
              </TabsList>
              
              <TabsContent value="assignment" className="p-6 pt-8">
                <TeacherAssignmentTab />
              </TabsContent>
              
              <TabsContent value="groups" className="p-6 pt-8">
                <StudentGroupsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
