import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import { UserCircle } from 'lucide-react';
const ProfilePage = () => {
  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          
          
        </div>
        
      </div>
      
      <div className="container max-w-4xl mx-auto px-4">
        <ProfileForm />
      </div>
    </DashboardLayout>;
};
export default ProfilePage;