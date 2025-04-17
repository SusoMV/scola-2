
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  full_name: string;
  avatar_url: string;
  role: string;
  specialty: string;
}

export function useSidebarProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    full_name: '',
    avatar_url: '',
    role: '',
    specialty: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          // Primero, comprobar si existe el perfil del usuario
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, profile_image_url, role, specialty, school_name')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
            
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
              const { error: insertError } = await supabase
                .from('profiles')
                .insert(userData);
              
              if (insertError) {
                console.error('Error creating user profile:', insertError);
              } else {
                console.log('Created new profile for user:', user.id);
                // Establecer el perfil con los datos creados
                setUserProfile({
                  full_name: userData.full_name || 'Usuario',
                  avatar_url: userData.profile_image_url || '',
                  role: userData.role || 'docente',
                  specialty: userData.specialty || ''
                });
              }
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
            
            setUserProfile({
              full_name: data.full_name || user?.user_metadata?.full_name || 'Usuario',
              avatar_url: data.profile_image_url || user?.user_metadata?.avatar_url || '',
              role: data.role || user?.user_metadata?.role || 'docente',
              specialty: data.specialty || user?.user_metadata?.specialization || ''
            });
            
            // Sincronizar metadatos de usuario si es necesario
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
          console.error('Error in fetchUserProfile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return userProfile;
}
