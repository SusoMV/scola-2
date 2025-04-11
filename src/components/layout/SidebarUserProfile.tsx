
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface UserProfileProps {
  userProfile: {
    full_name: string;
    avatar_url: string;
    role: string;
    specialty: string;
  };
}

const SidebarUserProfile: React.FC<UserProfileProps> = ({ userProfile }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 bg-scola-primary text-white">
          <AvatarImage src={userProfile.avatar_url} alt={userProfile.full_name} />
          <AvatarFallback>
            {userProfile.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{userProfile.full_name}</span>
          <span className="text-xs text-gray-500">
            {userProfile.role === 'directivo' ? 'Directivo' : 'Docente'} - {userProfile.specialty}
          </span>
        </div>
      </div>
      <Link to="/profile">
        <Button 
          variant="outline" 
          className="mt-3 w-full text-scola-primary border-scola-primary hover:bg-scola-pastel"
        >
          <Settings className="h-4 w-4 mr-2" />
          Editar perfil
        </Button>
      </Link>
    </div>
  );
};

export default SidebarUserProfile;
