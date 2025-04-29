import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SCHOOLS } from '@/components/auth/complete-profile/constants';
import { useProfileImage } from '@/hooks/use-profile-image';
import { SPECIALTIES } from './constants';

// Import the new components
import ProfileImageSection from './ProfileImageSection';
import ProfileDataSection from './ProfileDataSection';
import ProfileActionButtons from './ProfileActionButtons';
const ProfileInfo = () => {
  const {
    user,
    updateUserMetadata
  } = useAuth();
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
  const filteredSchools = searchSchool.length > 0 ? SCHOOLS.filter(school => school.toLowerCase().includes(searchSchool.toLowerCase())) : SCHOOLS;
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const {
            data,
            error
          } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
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
          if (data && user && (user.user_metadata?.full_name !== data.full_name || user.user_metadata?.role !== data.role || user.user_metadata?.specialty !== data.specialty || user.user_metadata?.school_name !== data.school_name || user.user_metadata?.avatar_url !== data.profile_image_url)) {
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
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  const handleSelectChange = (name, value) => {
    setEditFormData({
      ...editFormData,
      [name]: value
    });
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
      const {
        error
      } = await supabase.from('profiles').update({
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
    return <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Cargando información de perfil...</div>
      </div>;
  }
  return <div className="w-full">
      <ProfileActionButtons isEditing={isEditing} setIsEditing={setIsEditing} cancelEditing={cancelEditing} handleSaveProfile={handleSaveProfile} loading={loading} isUploading={isUploading} />

      <div className="flex flex-col md:flex-row gap-8 px-0">
        <ProfileImageSection userId={user?.id} fullName={profileData.full_name} profileImageUrl={profileData.profile_image_url} isEditing={isEditing} previewUrl={previewUrl} handleFileChange={handleFileChange} isUploading={isUploading} />

        <ProfileDataSection isEditing={isEditing} profileData={profileData} editFormData={editFormData} specialties={SPECIALTIES} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} searchSchool={searchSchool} setSearchSchool={setSearchSchool} filteredSchools={filteredSchools} />
      </div>
    </div>;
};
export default ProfileInfo;