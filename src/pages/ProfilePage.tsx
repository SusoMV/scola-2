
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileInfo from '@/components/profile/ProfileInfo';
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-[#0070C0]" />
          <h1 className="text-xl font-semibold">Perfil de Usuario</h1>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6 bg-scola-gray/30 justify-start">
            <TabsTrigger value="info">Datos actuais</TabsTrigger>
            <TabsTrigger value="edit">Editar perfil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <ProfileInfo />
          </TabsContent>
          
          <TabsContent value="edit">
            <ProfileForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
