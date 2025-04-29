
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';

interface ProfileActionButtonsProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  cancelEditing: () => void;
  handleSaveProfile: () => void;
  loading: boolean;
  isUploading: boolean;
}

const ProfileActionButtons = ({
  isEditing,
  setIsEditing,
  cancelEditing,
  handleSaveProfile,
  loading,
  isUploading
}: ProfileActionButtonsProps) => {
  return (
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
  );
};

export default ProfileActionButtons;
