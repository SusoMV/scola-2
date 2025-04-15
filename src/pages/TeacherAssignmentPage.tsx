
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TeacherAssignmentTab from '@/components/teacher-assignment/TeacherAssignmentTab';
import StudentGroupsTab from '@/components/teacher-assignment/StudentGroupsTab';
import { Users, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TeacherAssignmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("assignment");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  
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

  const handleEditClick = () => {
    if (activeTab === "assignment") {
      document.dispatchEvent(new CustomEvent('toggle-edit-mode'));
      setEditMode(!editMode);
    }
  };

  const handleAddGroup = () => {
    document.dispatchEvent(new CustomEvent('open-add-group-dialog'));
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-scola-primary mr-3" />
          <h1 className="text-2xl font-medium text-scola-primary">Adscrición e grupos</h1>
        </div>

        <Separator className="border-gray-200 my-4" />

        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="assignment" value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            setEditMode(false);
          }} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger 
                  value="assignment" 
                  className="data-[state=active]:bg-scola-primary data-[state=active]:text-white px-6 py-2.5"
                >
                  Adscrición docente
                </TabsTrigger>
                <TabsTrigger 
                  value="groups" 
                  className="data-[state=active]:bg-scola-primary data-[state=active]:text-white px-6 py-2.5"
                >
                  Grupos
                </TabsTrigger>
              </TabsList>
              
              {activeTab === "assignment" ? (
                <Button 
                  onClick={handleEditClick}
                  className={`${editMode ? 'bg-green-600' : 'bg-scola-primary'} text-white`}
                >
                  {editMode ? 'Gardar adscrición' : 'Editar adscrición'}
                </Button>
              ) : (
                <Button 
                  onClick={handleAddGroup}
                  className="bg-scola-primary text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Engadir grupo
                </Button>
              )}
            </div>
            
            <TabsContent value="assignment" className="mt-6 pt-0">
              <TeacherAssignmentTab />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-6 pt-0">
              <StudentGroupsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssignmentPage;
