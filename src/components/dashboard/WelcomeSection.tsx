
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebarProfile } from '@/hooks/use-sidebar-profile';

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  const { isLoading, profileData } = useSidebarProfile();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url || "/avatars/01.png"} alt="Avatar" />
          <AvatarFallback>{profileData?.full_name?.split(' ')[0]?.charAt(0) || 'U'}{profileData?.full_name?.split(' ')[1]?.charAt(0) || 's'}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLoading ? 'Cargando...' : `Ola, ${profileData?.full_name?.split(' ')[0] || 'Docente'}`}
          </h1>
          <p className="text-gray-600 mt-1 capitalize">
            {profileData?.role === 'directivo' ? 'Directivo' : 'Docente'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
