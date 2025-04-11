
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useSchoolWebUrl() {
  const [schoolWebUrl, setSchoolWebUrl] = useState('https://www.edu.xunta.gal/centros/ceipsanmarcos/');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedUrl = localStorage.getItem('schoolWebUrl');
    if (savedUrl) {
      setSchoolWebUrl(savedUrl);
    }
  }, []);

  const handleEditUrl = () => {
    setTempUrl(schoolWebUrl);
    setIsEditingUrl(true);
  };

  const handleSaveUrl = () => {
    if (tempUrl.trim()) {
      setSchoolWebUrl(tempUrl);
      localStorage.setItem('schoolWebUrl', tempUrl);
      setIsEditingUrl(false);
      
      toast({
        title: "URL actualizada",
        description: "A URL da web do centro foi actualizada correctamente",
      });
    }
  };

  return {
    schoolWebUrl,
    isEditingUrl,
    setIsEditingUrl,
    tempUrl,
    setTempUrl,
    handleEditUrl,
    handleSaveUrl
  };
}
