
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useProfileImage = (userId: string | undefined) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Función para xestionar a selección dun arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Comprobar tamaño do arquivo (máx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('A imaxe non pode superar os 2MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Crear unha URL para a vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Subir a imaxe a Supabase Storage
  const uploadProfileImage = async (): Promise<string | null> => {
    if (!userId || !selectedFile) {
      return null;
    }

    try {
      setIsUploading(true);
      
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      // Verificar se o bucket existe, e senón crealo
      const { data: bucketData, error: bucketError } = await supabase.storage
        .getBucket('profile_images');
      
      if (bucketError && bucketError.message.includes('not found')) {
        // O bucket non existe, hai que crealo
        await supabase.storage.createBucket('profile_images', {
          public: true
        });
      }

      // Subir a imaxe a Supabase Storage
      const { data, error } = await supabase.storage
        .from('profile_images')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Obter a URL pública da imaxe
      const { data: publicUrl } = supabase.storage
        .from('profile_images')
        .getPublicUrl(fileName);

      return publicUrl.publicUrl;
    } catch (error: any) {
      console.error('Error ao subir a imaxe:', error);
      toast.error(`Error ao subir a imaxe: ${error.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Resetear os datos da imaxe
  const resetProfileImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return {
    isUploading,
    previewUrl,
    selectedFile,
    handleFileChange,
    uploadProfileImage,
    resetProfileImage,
    setPreviewUrl
  };
};
