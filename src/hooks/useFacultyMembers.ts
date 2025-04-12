
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface FacultyMember {
  id: string;
  name: string;
  role: 'directivo' | 'docente';
  specialty: string;
  email: string;
}

// Sample data for fallback
const sampleFacultyMembers: FacultyMember[] = [
  {
    id: '1',
    name: 'Ana García Martínez',
    role: 'directivo',
    specialty: 'Matemáticas',
    email: 'anagarcia@example.com'
  },
  {
    id: '2',
    name: 'Manuel López Fernández',
    role: 'docente',
    specialty: 'Lengua y Literatura',
    email: 'manuellopez@example.com'
  },
  {
    id: '3',
    name: 'Carmen Rodríguez Vázquez',
    role: 'docente',
    specialty: 'Ciencias Naturales',
    email: 'carmenrodriguez@example.com'
  },
  {
    id: '4',
    name: 'David Pérez Santos',
    role: 'docente',
    specialty: 'Inglés',
    email: 'davidperez@example.com'
  },
  {
    id: '5',
    name: 'Elena Sánchez Gómez',
    role: 'directivo',
    specialty: 'Historia',
    email: 'elenasanchez@example.com'
  }
];

export function useFacultyMembers() {
  const { user } = useAuth();
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyMembers = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('school_id, role')
            .eq('id', user.id);
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            setUserRole('directivo');
            setFacultyMembers(sampleFacultyMembers);
            toast.error('Error ao cargar o perfil, usando datos de proba');
          } 
          else if (profileData && profileData.length > 0) {
            setUserRole(profileData[0].role);
            
            const { data, error } = await supabase
              .from('profiles')
              .select('id, full_name, role, specialty, email')
              .eq('school_id', profileData[0].school_id);
            
            if (error) {
              console.error('Error fetching faculty members:', error);
              toast.error('Error ao cargar os membros do claustro, usando datos de proba');
              setFacultyMembers(sampleFacultyMembers);
            } 
            else if (data && data.length > 0) {
              const formattedData: FacultyMember[] = data.map(item => ({
                id: item.id,
                name: item.full_name,
                role: item.role as 'directivo' | 'docente',
                specialty: item.specialty,
                email: item.email
              }));
              setFacultyMembers(formattedData);
            } 
            else {
              toast.info('Non hai membros do claustro, usando datos de proba');
              setFacultyMembers(sampleFacultyMembers);
            }
          } 
          else {
            setUserRole('directivo');
            setFacultyMembers(sampleFacultyMembers);
            toast.info('Perfil non atopado, usando datos de proba');
          }
        } 
        catch (error) {
          console.error('Error in fetchFacultyMembers:', error);
          setUserRole('directivo');
          setFacultyMembers(sampleFacultyMembers);
          toast.error('Erro inesperado, usando datos de proba');
        }
      } 
      else {
        setUserRole('directivo');
        setFacultyMembers(sampleFacultyMembers);
      }
      setIsLoading(false);
    };

    fetchFacultyMembers();
  }, [user]);

  return {
    facultyMembers,
    setFacultyMembers,
    isLoading,
    userRole,
    isDirector: userRole === 'directivo'
  };
}
