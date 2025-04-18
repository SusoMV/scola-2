import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield } from 'lucide-react';
import { useProfileImage } from '@/hooks/use-profile-image';

// Lista de especialidades predefinidas limitada a las especificadas
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

// Lista de centros educativos
// ... keep existing code (SCHOOLS array definition)

// Definimos o esquema de validación
const profileSchema = z.object({
  full_name: z.string().min(2, 'O nome debe ter polo menos 2 caracteres'),
  email: z.string().email('Introduce un email válido'),
  school_name: z.string().min(2, 'O nome do centro debe ter polo menos 2 caracteres'),
  specialty: z.string().min(1, 'Selecciona unha especialidade'),
  profile_image_url: z.string().optional()
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const {
    user,
    updateUserMetadata
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDirectorRequestOpen, setIsDirectorRequestOpen] = useState(false);
  const [isUserDirector, setIsUserDirector] = useState(false);
  const [searchSchool, setSearchSchool] = useState("");

  // Usar o hook personalizado para xestionar a imaxe de perfil
  const {
    previewUrl,
    handleFileChange,
    uploadProfileImage,
    isUploading,
    setPreviewUrl
  } = useProfileImage(user?.id);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      email: '',
      school_name: '',
      specialty: '',
      profile_image_url: ''
    }
  });

  // Filtrar escolas baseado na búsqueda
  const filteredSchools = searchSchool.length > 0 ? SCHOOLS.filter(school => school.toLowerCase().includes(searchSchool.toLowerCase())) : SCHOOLS;

  // Cargar datos do usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const {
            data,
            error
          } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (error) {
            throw error;
          }

          // Actualizar o formulario cos datos do usuario
          form.reset({
            full_name: data.full_name || '',
            email: data.email || user.email || '',
            school_name: data.school_name || '',
            specialty: data.specialty || '',
            profile_image_url: data.profile_image_url || ''
          });

          // Comprobar se o usuario é director
          setIsUserDirector(data.role === 'directivo');

          // Establecer a URL da imaxe de perfil
          if (data.profile_image_url) {
            setPreviewUrl(data.profile_image_url);
          }
        } catch (error) {
          console.error('Error ao cargar o perfil:', error);
          toast.error('Error ao cargar os datos do perfil');
        }
      }
    };
    fetchUserProfile();
  }, [user, form, setPreviewUrl]);

  // Xestionar a solicitude para ser director
  const handleDirectorRequest = async () => {
    if (!user) return;
    try {
      setIsLoading(true);

      // Obter os directores do mesmo centro
      const {
        data: userProfile
      } = await supabase.from('profiles').select('school_id').eq('id', user.id).single();
      if (!userProfile?.school_id) {
        throw new Error('Non se atopou o centro educativo');
      }

      // Obter os directores do centro
      const {
        data: directors,
        error: directorsError
      } = await supabase.from('profiles').select('id, full_name').eq('school_id', userProfile.school_id).eq('role', 'directivo');
      if (directorsError) {
        throw directorsError;
      }

      // Simular o envío de notificacións aos directores
      console.log('Enviando solicitude aos directores:', directors);
      toast.success('Solicitude enviada aos directores do centro');
      setIsDirectorRequestOpen(false);
    } catch (error: any) {
      console.error('Error ao solicitar ser director:', error);
      toast.error(`Error ao enviar a solicitude: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Gardar os cambios do perfil
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);

      // Subir a nova imaxe se se seleccionou unha
      let profileImageUrl = data.profile_image_url;
      const uploadedImageUrl = await uploadProfileImage();
      if (uploadedImageUrl) {
        profileImageUrl = uploadedImageUrl;
      }

      // Actualizar o perfil na base de datos
      const {
        error
      } = await supabase.from('profiles').update({
        full_name: data.full_name,
        email: data.email,
        school_name: data.school_name,
        specialty: data.specialty,
        profile_image_url: profileImageUrl
      }).eq('id', user?.id);
      if (error) {
        throw error;
      }

      // Actualizar os metadatos do usuario para sincronizar co sidebar
      await updateUserMetadata({
        full_name: data.full_name,
        specialty: data.specialty,
        school_name: data.school_name,
        avatar_url: profileImageUrl
      });
      toast.success('Perfil actualizado correctamente');
    } catch (error: any) {
      console.error('Error ao actualizar o perfil:', error);
      toast.error(`Error ao actualizar o perfil: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar perfil</h1>
      </div>

      <Card className="p-6 bg-white rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Área de imaxe de perfil */}
              <div className="flex flex-col items-center space-y-4 my-[44px]">
                <Avatar className="w-32 h-32 border-2 border-scola-primary">
                  <AvatarImage src={previewUrl || ''} alt="Foto de perfil" />
                  <AvatarFallback className="text-2xl bg-scola-primary text-white">
                    {form.getValues().full_name?.split(' ').map(name => name[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center">
                  <Label htmlFor="profile_image" className="cursor-pointer py-1 px-3 text-sm bg-scola-primary hover:bg-scola-primary/90 text-white rounded-md my-[3px]">
                    Cambiar foto
                  </Label>
                  <Input id="profile_image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. Máx 2MB.</p>
                </div>

                {!isUserDirector && <AlertDialog open={isDirectorRequestOpen} onOpenChange={setIsDirectorRequestOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="mt-4 border-scola-primary text-scola-primary hover:bg-scola-pastel">
                        <Shield className="h-4 w-4 mr-2" />
                        Solicitar ser directivo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Solicitar rol de directivo</AlertDialogTitle>
                        <AlertDialogDescription>
                          Enviarase unha solicitude aos directores do teu centro educativo. Se é aprobada, 
                          cambiarase o teu rol a directivo e terás acceso ás funcionalidades adicionais.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-scola-primary hover:bg-scola-primary/90" onClick={handleDirectorRequest} disabled={isLoading}>
                          {isLoading ? 'Enviando...' : 'Enviar solicitude'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>}
              </div>

              {/* Campos do formulario */}
              <div className="flex-1 space-y-4">
                <FormField control={form.control} name="full_name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome e apelidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="school_name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Centro educativo</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona o centro educativo" />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="p-2">
                              <Input placeholder="Buscar centro por nome ou código" value={searchSchool} onChange={e => setSearchSchool(e.target.value)} className="mb-2" />
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                              {filteredSchools.length > 0 ? filteredSchools.map(school => <SelectItem key={school} value={school}>
                                    {school}
                                  </SelectItem>) : <div className="p-2 text-center text-gray-500">
                                  Non se atoparon resultados
                                </div>}
                            </div>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="specialty" render={({
                field
              }) => <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona a túa especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {SPECIALTIES.map(specialty => <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-scola-primary hover:bg-scola-primary/90" disabled={isLoading || isUploading}>
                {isLoading ? 'Gardando...' : 'Gardar cambios'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>;
};

export default ProfileForm;
