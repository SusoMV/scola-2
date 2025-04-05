
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
