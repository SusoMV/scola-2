
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import { UserCircle } from 'lucide-react';

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <UserCircle className="h-6 w-6 text-[#0070C0]" />
          <h1 className="text-2xl font-bold">Perfil</h1>
        </div>
        <div className="w-32 h-1 mt-2 dotted-border"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
