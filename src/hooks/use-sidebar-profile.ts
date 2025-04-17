
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
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, profile_image_url, role, specialty, school_name, school_id')
            .eq('id', user.id)
            .maybeSingle(); // Use maybeSingle instead of single to handle when no profile exists

          if (error && error.code !== 'PGRST116') {
            // Only log errors that aren't "no rows returned"
            console.error('Error fetching user profile:', error);
          }

          // If we have data, use it. Otherwise use user metadata or defaults
          setUserProfile({
            full_name: data?.full_name || user?.user_metadata?.full_name || 'Usuario',
            avatar_url: data?.profile_image_url || user?.user_metadata?.avatar_url || '',
            role: data?.role || user?.user_metadata?.role || 'docente',
            specialty: data?.specialty || user?.user_metadata?.specialization || ''
          });
          
          // Only attempt to update user metadata if we have profile data and user metadata differs
          if (data && user && (
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
        } catch (error) {
          console.error('Error in fetchUserProfile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return userProfile;
}
