
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

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
          // Verificar si existe el perfil del usuario
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile data:', error);
            
            // Si el error es porque no hay filas, crear un perfil para el usuario
            if (error.code === 'PGRST116') {
              // Obtener datos de los metadatos del usuario para crear el perfil
              const userData = {
                id: user.id,
                full_name: user?.user_metadata?.full_name || '',
                email: user.email || '',
                role: user?.user_metadata?.role || 'docente',
                specialty: user?.user_metadata?.specialty || '',
                school_name: user?.user_metadata?.school_name || '',
                profile_image_url: user?.user_metadata?.avatar_url || '',
                // Convertir al usuario específico en directivo
                ...(user.id === 'e4e80ce8-ea43-4f3e-95fe-5a9ad57504df' && { role: 'directivo' })
              };
              
              // Crear el perfil en la base de datos
              const { error: insertError, data: newProfile } = await supabase
                .from('profiles')
                .insert(userData)
                .select()
                .single();
              
              if (insertError) {
                toast.error('Error al crear el perfil de usuario');
                console.error('Error creating user profile:', insertError);
              } else {
                console.log('Created new profile for user:', user.id);
                // Establecer el perfil con los datos creados
                setProfileData({
                  full_name: userData.full_name || '',
                  email: userData.email || user.email || '',
                  school_name: userData.school_name || '',
                  specialty: userData.specialty || '',
                  role: userData.role || 'docente',
                  profile_image_url: userData.profile_image_url || ''
                });
                
                // Sincronizar metadatos de usuario
                await supabase.auth.updateUser({
                  data: {
                    full_name: userData.full_name,
                    role: userData.role,
                    specialty: userData.specialty,
                    school_name: userData.school_name,
                    avatar_url: userData.profile_image_url
                  }
                });
              }
            } else {
              toast.error('Error al cargar la información del perfil');
            }
          } else if (data) {
            // Si se encuentra el perfil, actualizar el usuario especificado a directivo si es necesario
            if (user.id === 'e4e80ce8-ea43-4f3e-95fe-5a9ad57504df' && data.role !== 'directivo') {
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ role: 'directivo' })
                .eq('id', user.id);
              
              if (updateError) {
                console.error('Error updating user role:', updateError);
              } else {
                data.role = 'directivo';
                console.log('Updated user to directivo role:', user.id);
              }
            }
            
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
          toast.error('Error al cargar la información del perfil');
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
