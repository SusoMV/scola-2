import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileImage } from '@/hooks/use-profile-image';
interface ProfileImageSectionProps {
  userId?: string;
  fullName: string;
  profileImageUrl: string;
  isEditing: boolean;
  previewUrl: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}
const ProfileImageSection = ({
  userId,
  fullName,
  profileImageUrl,
  isEditing,
  previewUrl,
  handleFileChange,
  isUploading
}: ProfileImageSectionProps) => {
  return <div className="flex flex-col items-center space-y-4 px-0 my-0 mx-[21px] py-[59px]">
      <Avatar className="w-32 h-32 border-2 border-scola-primary">
        <AvatarImage src={previewUrl || profileImageUrl} alt="Foto de perfil" />
        <AvatarFallback className="text-2xl bg-scola-primary text-white px-0">
          {fullName?.split(' ').map(name => name[0]).join('') || 'U'}
        </AvatarFallback>
      </Avatar>

      {isEditing && <div className="flex flex-col items-center">
          <Label htmlFor="profile_image" className="cursor-pointer py-1 px-3 text-sm bg-scola-primary hover:bg-scola-primary/90 text-white rounded-md my-[3px]">
            Cambiar foto
          </Label>
          <Input id="profile_image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. Máx 2MB.</p>
        </div>}
    </div>;
};
export default ProfileImageSection;