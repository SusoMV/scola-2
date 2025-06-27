
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { RegisterFormValues, registerSchema } from './types';
import { createUserInBackend } from '@/utils/backendApi';
import { toast } from 'sonner';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Use React Hook Form with Zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      full_name: '',
      role: 'docente',
      specialty: '',
      school_code: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      // Only create user in backend
      await createUserInBackend({
        email: values.email,
        password: values.password,
        name: values.full_name
      });

      // Only show success if we reach this point (no error thrown)
      toast.success('Rexistro completado correctamente');
      
      // Navigate to login after successful registration
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Houbo un erro ao rexistrarse. Téntao de novo máis tarde.');
      toast.error(error.message || 'Houbo un erro ao rexistrarse. Téntao de novo máis tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get role value to determine if speciality should be shown
  const watchRole = form.watch('role');
  const showSpecialty = watchRole === 'docente';

  return {
    form,
    isSubmitting,
    serverError,
    showSpecialty,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
