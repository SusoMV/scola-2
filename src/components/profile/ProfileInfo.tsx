
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProfileInfo = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            throw error;
          }

          setProfileData(data);
        } catch (error) {
          console.error('Error ao cargar o perfil:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Cargando datos do perfil...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Non se atoparon datos do perfil.</p>
      </div>
    );
  }

  return (
    <Card className="p-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center">
          <Avatar className="w-32 h-32 border-2 border-[#0070C0]">
            <AvatarImage src={profileData.profile_image_url || ''} alt="Foto de perfil" />
            <AvatarFallback className="text-2xl bg-[#0070C0] text-white">
              {profileData.full_name?.split(' ').map((name: string) => name[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          
          {profileData.role === 'directivo' && (
            <div className="mt-4 flex items-center gap-1 text-[#0070C0]">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Directivo</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Información personal</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Nome completo</p>
                  <p className="font-medium">{profileData.full_name || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Correo electrónico</p>
                  <p className="font-medium">{profileData.email || user?.email || '-'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Información profesional</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Centro educativo</p>
                  <p className="font-medium">{profileData.school_name || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Especialidade</p>
                  <p className="font-medium">{profileData.specialty || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;
