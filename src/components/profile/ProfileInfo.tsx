
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileInfo = () => {
  const { user, session } = useAuth();
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    school_name: '',
    specialty: '',
    role: '',
    profile_image_url: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile data:', error);
          } else if (data) {
            // Set profile data from database
            setProfileData({
              full_name: data.full_name || '',
              email: data.email || user.email || '',
              school_name: data.school_name || '',
              specialty: data.specialty || '',
              role: data.role || 'docente',
              profile_image_url: data.profile_image_url || ''
            });
            
            // Ensure metadata in auth is synchronized with profile
            if (user && (
              user.user_metadata?.full_name !== data.full_name || 
              user.user_metadata?.role !== data.role ||
              user.user_metadata?.specialty !== data.specialty ||
              user.user_metadata?.school_name !== data.school_name ||
              user.user_metadata?.avatar_url !== data.profile_image_url
            )) {
              try {
                await supabase.auth.updateUser({
                  data: {
                    full_name: data.full_name,
                    role: data.role,
                    specialty: data.specialty,
                    school_name: data.school_name,
                    avatar_url: data.profile_image_url
                  }
                });
              } catch (updateError) {
                console.error('Error updating user metadata:', updateError);
              }
            }
          }
        } catch (error) {
          console.error('Error in fetchProfileData:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Cargando información de perfil...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-2 border-scola-primary">
            <AvatarImage src={profileData.profile_image_url} alt="Foto de perfil" />
            <AvatarFallback className="text-2xl bg-scola-primary text-white">
              {profileData.full_name?.split(' ').map(name => name[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Nome e apelidos</p>
              <p className="font-medium text-lg">{profileData.full_name}</p>
            </Card>

            <Card className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Cargo</p>
              <p className="font-medium text-lg">{profileData.role === 'directivo' ? 'Directivo' : 'Docente'}</p>
            </Card>

            <Card className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-lg">{profileData.email}</p>
            </Card>

            <Card className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Especialidade</p>
              <p className="font-medium text-lg">{profileData.specialty}</p>
            </Card>
          </div>

          <Card className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Centro educativo</p>
            <p className="font-medium text-lg">{profileData.school_name}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
