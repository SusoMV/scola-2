
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileInfo from '@/components/profile/ProfileInfo';
import { UserCircle } from 'lucide-react';

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <UserCircle className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-4 bg-muted">
            <TabsTrigger value="info">
              Datos actuais
            </TabsTrigger>
            <TabsTrigger value="edit">
              Editar perfil
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="border rounded-lg p-6 bg-white">
            <ProfileInfo />
          </TabsContent>
          
          <TabsContent value="edit" className="border rounded-lg p-6 bg-white">
            <ProfileForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
