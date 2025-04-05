
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import SectionTitle from '@/components/ui/section-title';
import { User } from 'lucide-react';

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <SectionTitle icon={User}>Perfil</SectionTitle>
        </div>
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
