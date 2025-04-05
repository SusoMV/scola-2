
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CompleteProfileFormValues, completeProfileSchema } from './types';
import { toast } from 'sonner';

export const useCompleteProfileForm = () => {
  const { user, updateUserMetadata } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use React Hook Form with Zod validation
  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      full_name: user?.user_metadata?.full_name || '',
      school: user?.user_metadata?.school_name || '',
      role: user?.user_metadata?.role || 'docente',
      specialization: user?.user_metadata?.specialty || '',
    },
  });

  const onSubmit = async (values: CompleteProfileFormValues) => {
    setIsSubmitting(true);
    
    if (!values.full_name || !values.school || !values.role || !values.specialization) {
      toast.error('Por favor, completa todos os campos');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Extract school code and name from the selected school
      const schoolCode = values.school.split(' - ')[0] || '';
      const schoolName = values.school.split(' - ')[1] || values.school;
      
      // Prepare metadata update
      const metadata = {
        full_name: values.full_name,
        school_code: schoolCode,
        school_name: schoolName,
        role: values.role,
        specialty: values.specialization
      };
      
      // Update user metadata
      await updateUserMetadata(metadata);
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Ocorreu un erro ao actualizar o perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    searchQuery,
    setSearchQuery,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
