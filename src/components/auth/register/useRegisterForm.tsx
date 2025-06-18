
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterFormValues, registerSchema } from './types';
import { createUserInBackend } from '@/utils/backendApi';

export const useRegisterForm = () => {
  const { signUp } = useAuth();
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
      // First, create user in your backend using the generic API function
      await createUserInBackend({
        email: values.email,
        password: values.password
      });

      // Extract school name from the selected code
      const schoolSelection = values.school_code;
      const schoolName = schoolSelection.split(' - ')[1] || schoolSelection;
      
      // Prepare user metadata
      const userData = {
        full_name: values.full_name,
        role: values.role,
        specialty: values.specialty || null,
        school_code: values.school_code.split(' - ')[0] || null,
        school_name: schoolName
      };
      
      // Register the user in Supabase
      await signUp(values.email, values.password, userData);
      
      // Navigate to login after successful registration
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Houbo un erro ao rexistrarse. Téntao de novo máis tarde.');
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
