
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Save, X } from 'lucide-react';
import { useProfileImage } from '@/hooks/use-profile-image';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SCHOOLS } from '@/components/auth/complete-profile/constants';

const SPECIALTIES = [
  '597031 Infantil', 
  '597032 Inglés', 
  '597033 Francés', 
  '597034 Educación Física', 
  '597036 Pedagoxía Terapéutica', 
  '597035 Música', 
  '597037 Audición e Linguaxe', 
  '597038 Primaria', 
  '597939 Orientación', 
  '000000 Relixión'
];

const ProfileInfo = () => {
  const { user, updateUserMetadata } = useAuth();
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    school_name: '',
    specialty: '',
    role: '',
    profile_image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [searchSchool, setSearchSchool] = useState("");
  const [editFormData, setEditFormData] = useState({
    full_name: '',
    email: '',
    school_name: '',
    specialty: ''
  });
  
  // Use the profile image hook for image uploading
  const {
    previewUrl,
    handleFileChange,
    uploadProfileImage,
    isUploading,
    setPreviewUrl
  } = useProfileImage(user?.id);

  // Filter schools based on search input
  const filteredSchools = searchSchool.length > 0 
    ? SCHOOLS.filter(school => school.toLowerCase().includes(searchSchool.toLowerCase())) 
    : SCHOOLS;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile data:', error);
          }

          // Set profile data from database or fallback to user metadata
          const profileInfo = {
            full_name: data?.full_name || user?.user_metadata?.full_name || '',
            email: data?.email || user?.email || '',
            school_name: data?.school_name || user?.user_metadata?.school_name || '',
            specialty: data?.specialty || user?.user_metadata?.specialty || '',
            role: data?.role || user?.user_metadata?.role || 'docente',
            profile_image_url: data?.profile_image_url || user?.user_metadata?.avatar_url || ''
          };
          
          setProfileData(profileInfo);
          setEditFormData({
            full_name: profileInfo.full_name,
            email: profileInfo.email,
            school_name: profileInfo.school_name,
            specialty: profileInfo.specialty
          });
          
          // Set preview URL for the profile image
          if (profileInfo.profile_image_url) {
            setPreviewUrl(profileInfo.profile_image_url);
          }
          
          // Ensure metadata in auth is synchronized with profile if profile exists
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
          console.error('Error in fetchProfileData:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user, setPreviewUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);

      // Upload new profile image if selected
      let profileImageUrl = profileData.profile_image_url;
      const uploadedImageUrl = await uploadProfileImage();
      if (uploadedImageUrl) {
        profileImageUrl = uploadedImageUrl;
      }

      // Update profile data in database
      const { error } = await supabase.from('profiles').update({
        full_name: editFormData.full_name,
        email: editFormData.email,
        school_name: editFormData.school_name,
        specialty: editFormData.specialty,
        profile_image_url: profileImageUrl
      }).eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update auth user metadata
      await updateUserMetadata({
        full_name: editFormData.full_name,
        specialty: editFormData.specialty,
        school_name: editFormData.school_name,
        avatar_url: profileImageUrl
      });

      // Update local state
      setProfileData({
        ...profileData,
        full_name: editFormData.full_name,
        email: editFormData.email,
        school_name: editFormData.school_name,
        specialty: editFormData.specialty,
        profile_image_url: profileImageUrl
      });

      toast.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Error ao actualizar o perfil: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cancelEditing = () => {
    // Reset form data to current profile data
    setEditFormData({
      full_name: profileData.full_name,
      email: profileData.email,
      school_name: profileData.school_name,
      specialty: profileData.specialty
    });
    
    // Reset profile image preview
    setPreviewUrl(profileData.profile_image_url);
    
    // Exit edit mode
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Cargando información de perfil...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <Button 
            variant="outline"
            className="text-scola-primary border-scola-primary hover:bg-scola-pastel"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={cancelEditing}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              className="bg-scola-primary hover:bg-scola-primary/90"
              onClick={handleSaveProfile}
              disabled={loading || isUploading}
            >
              <Save className="h-4 w-4 mr-2" />
              Gardar cambios
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-2 border-scola-primary">
            <AvatarImage src={previewUrl || profileData.profile_image_url} alt="Foto de perfil" />
            <AvatarFallback className="text-2xl bg-scola-primary text-white">
              {profileData.full_name?.split(' ').map(name => name[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>

          {isEditing && (
            <div className="flex flex-col items-center">
              <Label htmlFor="profile_image" className="cursor-pointer py-1 px-3 text-sm bg-scola-primary hover:bg-scola-primary/90 text-white rounded-md my-[3px]">
                Cambiar foto
              </Label>
              <Input id="profile_image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. Máx 2MB.</p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <div>
                <Label htmlFor="full_name">Nome e apelidos</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={editFormData.full_name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="school_name">Centro educativo</Label>
                <Select
                  name="school_name"
                  value={editFormData.school_name}
                  onValueChange={(value) => handleSelectChange("school_name", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona o centro educativo" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input 
                        placeholder="Buscar centro por nome ou código" 
                        value={searchSchool} 
                        onChange={e => setSearchSchool(e.target.value)} 
                        className="mb-2" 
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredSchools.length > 0 ? (
                        filteredSchools.map(school => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-gray-500">
                          Non se atoparon resultados
                        </div>
                      )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialty">Especialidade</Label>
                <Select
                  name="specialty"
                  value={editFormData.specialty}
                  onValueChange={(value) => handleSelectChange("specialty", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona a túa especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
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

              <Card className="p-4 bg-white rounded-lg shadow-sm md:col-span-2">
                <p className="text-sm text-gray-500">Centro educativo</p>
                <p className="font-medium text-lg">{profileData.school_name}</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
