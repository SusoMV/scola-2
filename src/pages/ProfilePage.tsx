
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
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
      
      <div className="grid grid-cols-1 gap-6 mx-auto">
        <div className="border rounded-lg p-6 bg-white max-w-6xl mx-auto w-full">
          <ProfileInfo />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
