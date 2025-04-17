
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield } from 'lucide-react';
import { useProfileImage } from '@/hooks/use-profile-image';

// Lista de especialidades predefinidas
const SPECIALTIES = ['597031 Infantil', '597032 Inglés', '597033 Francés', '597034 Educación Física', '597036 Pedagoxía Terapéutica', '597035 Música', '597037 Audición e Linguaxe', '597038 Primaria', '597939 Orientación', '000000 Relixión', 'Matemáticas', 'Lingua e Literatura Galega', 'Lingua e Literatura Castelá', 'Ciencias Naturais', 'Física e Química', 'Xeografía e Historia', 'Tecnoloxía', 'Economía', 'Informática', 'Filosofía', 'Outro'];

// Lista de centros educativos
const SCHOOLS = ['15000016 - CEIP San Marcos', '15026637 - CEIP de Barouta', '15025220 - CEP Plurilingüe  de Ventín', '15032649 - EEI de Milladorio', '15020659 - EEI de Covas', '15000107 - CEIP A Maía', '15032625 - CEIP Agro do Muíño', '15019542 - EEI da Igrexa', '15021779 - CEIP da Castellana', '15000338 - CPI As Mirandas', '15020672 - EEI de Rorís', '15032716 - CEIP de Arteixo', '15000363 - CEIP Ponte dos Brozos', '15020714 - EEI de Larín de Arriba', '15023041 - CEIP de Galán', '15032376 - EEI de Vilarrodís-Oseiro', '15000569 - CEIP San Xosé Obreiro', '15020933 - EEI de Barrionovo', '15020775 - EEI da Lagoa', '15000612 - CEIP de Arzúa', '15019301 - CPI de San Vicente', '15001070 - CPI de Cruz do Sar', '15001124 - CEIP Francisco Vales Villamarín', '15001239 - CPI Armando Cotarelo Valledor', '15001367 - CEIP Plurilingüe de Abanqueiro', '15022085 - CEIP de Pazos-Comoxo', '15001471 - CEIP Praia Xardín', '15021500 - CEIP Santa Baia', '15023341 - CEIP Santa María do Castro', '15027149 - CEIP de Cespón', '15001616 - CEIP de Escarabote', '15001665 - CPI Plurilingüe Antonio Orza Couto', '15001811 - EEI de Sabaxáns', '15001847 - CEIP  Plurilingüe de Pedrouzos', '15001744 - EEI dos Ánxeles', '15001926 - CPI As Revoltas', '15002025 - CEIP Eladia Mariño', '15002086 - CEIP de Ponte do Porto', '15002050 - CEIP O Areal', '15002062 - CEIP de Camelle', '15025554 - CEIP Emilio González López', '15002165 - CEIP Wenceslao Fernández Flórez', '15032426 - CEIP Plurilingüe O Graxal', '15019608 - EEI de San Bartolomeu', '15023065 - CEIP Gonzalo Torrente Ballester', '15020969 - CEIP Plurilingüe Mosteiro de Caaveiro', '15021524 - CEIP Plurilingüe A Cristina', '15021354 - CEIP Bergantiños', '15002578 - CEIP Fogar', '15027393 - CEIP Xesús San Luís Romero', '15024896 - CEIP de Nétoma-Razo', '15023077 - CEIP de Gándara-Sofán', '15011661 - CEIP Manuel Fraga Iribarne', '15002852 - CEIP do Pindo', '15002761 - CEIP Plurilingüe de Carnota', '15003005 - CEIP Vicente Otero Valcárcel', '15003017 - CEIP de Tabeaio', '15003054 - CEIP Nicolás del Río', '15022139 - EEI da Pereiriña', '15022127 - CEIP da Igrexa', '15003248 - CEIP Plurilingüe Vila de Cee', '15003376 - CPI Plurilingüe O Cruce', '15020970 - CEIP Plurilingüe Celso Emilio Ferreiro', '15003534 - CEIP da Barqueira', '15022152 - EEI de Coirós de Arriba', '15003789 - CEIP Praia de Quenxe', '15003807 - CEIP de Bormoio- Agualada', '15002670 - CEIP Canosa-Rus', '15003881 - CPI Alcalde Xosé Pichel', '15019323 - CEIP Plurilingüe Alborada', '15004976 - CEIP Curros Enríquez', '15005038 - CEIP de Prácticas', '15021721 - CEIP de Zalaeta', '15021627 - CEIP Emilia Pardo Bazán', '15004988 - CEIP Eusebio da Guarda', '15023375 - CEIP José Cornide Saavedra', '15027241 - CEIP Juan Fernández Latorre', '15020568 - CEIP Plurilingüe Labaca', '15019311 - CEIP Plurilingüe María Barbeito e Cervino', '15005518 - CEIP María Pita', '15004991 - CEIP Cidade Vella', '15033228 - CEIP Novo Mesoiro', '15004745 - CEIP Plurilingüe Anxo da Garda', '15004964 - CEIP Plurilingüe Concepción Arenal', '15005521 - CEIP Ramón de la Sagra', '15005014 - CEIP Raquel Camacho', '15005361 - CEIP Rosalía de Castro', '15025037 - CEIP Sagrada Familia', '15021548 - CEIP Sal Lence', '15021792 - CEIP Salgado Torres', '15025025 - CEIP San Francisco Javier', '15005701 - CEIP Plurilingüe San Pedro de Visma', '15005026 - CEIP Torre de Hércules', '15021536 - CEIP Plurilingüe Víctor López Seoane', '15024902 - CEIP Plurilingüe Wenceslao Fernández Flórez', '15023363 - CEIP Plurilingüe  Manuel Murguía', '15027253 - CEIP Isaac Díaz Pardo', '15005828 - CEIP Plurilingüe de Tarrío', '15027708 - CEIP Plurilingüe Ría do Burgo', '15021809 - CEIP Sofía Casanova', '15033149 - CEIP Vila de Rutis', '15005877 - CEIP de Teixeiro', '15005932 - CEIP de Curtis', '15023399 - CPI Eusebio Lorenzo Baleirón', '15021810 - CEIP Plurilingüe Santa Eulalia de Dumbría', '15020982 - CEIP Plurilingüe O Ramo', '15025633 - CEIP Plurilingüe Os Casais', '15022981 - CEIP Plurilingüe de Centieiras', '15023405 - CPI A Xunqueira', '15024941 - CEIP Plurilingüe A Laxe', '15021858 - CEIP Almirante Juan de Lángara y Huarte', '15006663 - CEIP Cruceiro de Canido', '15024938 - CEIP de Esteiro', '15026960 - CEIP de Ponzos', '15006845 - CEIP Isaac Peral', '15021834 - CEIP Manuel Masdías', '15006699 - CEIP Plurilingüe Ángela Ruiz Robles', '15021846 - CEIP  Plurilingüe San Xoán de Filgueira', '15024227 - CEIP de Pazos', '15007242 - CEIP Mar de Fóra', '15007266 - CEIP Areouta', '15007400 - CPI de Ponte Carreira', '15007655 - CEIP de Caión', '15025256 - CEIP Alfredo Brañas', '15007886 - CEIP Ramón Otero Pedrayo', '15007621 - CPI Plurilingüe Cabo da Area', '15021160 - EEI de Traba', '15008039 - CPI Plurilingüe Cernadas de Castro', '15021861 - CEIP Joaquín Rodríguez Otero', '15026765 - CEIP Milladoiro', '15008398 - CEIP Francisco López Estrada', '15008490 - CEIP Víctor Sáenz', '15008714 - CPI Plurilingüe da Picota', '15008805 - CEIP de Melide Nº 1', '15023910 - CEIP Martagona', '15027526 - CEIP Mestre Pastor Barral', '15008982 - EEI de Olas', '15009007 - EEI Visantoña', '15020854 - CPI de Xanceda', '15023223 - CEIP de Bemantes', '15009071 - CPI Castro Baxoi', '15009081 - CEIP de San Ramón', '15009241 - CPI Plurilingüe Virxe da Cela', '15009391 - CEIP Santiago Apóstolo', '15009445 - CEIP Plurilingüe Unión Mugardesa', '15009810 - CEIP Plurilingüe Ricardo Tobío', '15024951 - CEIP  Plurilingüe de Louro', '15023727 - EEI de Muros', '15009998 - CEIP Ramón de Artaza y Malvárez', '15021214 - EEI de Tal de Abaixo', '15009597 - CEIP de Vilarmide- Eduardo Noya', '15024239 - CEIP dos Muíños', '15009676 - CEIP Virxe da Barca', '15019499 - CEIP de Piñeiros', '15023508 - CEIP Plurilingüe Virxe do Mar', '15022310 - CEIP A Gándara', '15023740 - CEIP A Solaina', '15010162 - CEIP Plurilingüe  Ponte de Xubia', '15010058 - CPI do Feal', '15022577 - CEIP de Maciñeira', '15010307 - CEIP San Isidro', '15022826 - EEI de Aro', '15010575 - CEIP O Coto', '15010681 - CEIP Plurilingüe Alexandre Rodríguez Cadarso', '15010848 - CEIP Felipe de Castro', '15025670 - CEIP Plurilingüe Isidro Parga Pondal', '15023089 - CEIP Luís Seoane', '15011026 - CEIP Plurilingüe de Rabadeira', '15025050 - CEIP Ramón María del Valle- Inclán', '15011105 - CEIP de Mesón do Vento', '15011336 - CEIP Alfonso D. Rodríguez Castelao', '15025487 - CEIP Campomaior', '15032868 - CEIP Plurilíngue do Camiño Inglés', '15011567 - CEIP Plurilingüe de Sigüeiro', '15011981 - CEIP José María Lage', '15033101 - CEIP Plurilingüe de Outes', '15021780 - CEIP Plurilingüe Bragade', '15012420 - CEIP de Oza dos Ríos', '15024045 - EEI de Areas', '15021603 - EEI de Viñas', '15022322 - EEI da Escravitude', '15021056 - EEI de Arretén', '15012626 - EEI de Pontecesures', '15012742 - CEIP Flavia', '15012717 - CEIP Rosalía de Castro', '15020374 - EEI de Extramundi de Arriba', '15019347 - CPI Camiño de Santiago', '15020611 - EEI Gonzar', '15013072 - EEI da Granxa', '15013059 - EEI de Vilariño', '15013199 - CEP Salustiano Rey Eiras', '15013163 - EEI Fernández Varela', '15023417 - CEP Pilar Maestu Sierra', '15026236 - EEI da Angustia', '15013230 - CEIP As Forcadas', '15013291 - CEIP Eduardo Pondal', '15024963 - CEIP Plurilingüe de Andrade', '15013412 - CEIP de Ombre', '15013503 - CEIP Couceiro Freijomil', '15026194 - CEIP Plurilingüe A Fraga', '15013643 - CEIP Plurilingüe A Magdalena', '15013591 - CEIP Plurilingüe Santa María', '15013761 - CEIP de Campanario', '15013783 - EEI de Caamaño', '15025062 - CEIP de Portosín', '15013928 - CEIP Plurilingüe de Sobrado- Nebra', '15013977 - CEIP Santa Irene', '15013989 - EEI de Queiruga', '15013898 - CEIP de Seráns', '15024756 - EEI de Carballosa', '15025542 - CEIP Xuño', '15027401 - CEIP Ana María Diéguez', '15014180 - CEIP Alfonso D. Rodríguez Castelao', '15023430 - CEP Xosé María Brea Segade', '15014261 - CEIP Heroínas de Sálvora', '15014271 - CEIP Plurilingüe de Artes', '15021731 - CEIP Plurilingüe de Frións', '15024771 - CEP Plurilingüe de Carreira', '15014295 - EEI Capela-Carreira', '15025281 - CEIP de Olveira', '15014465 - CEIP Plurilingüe de Palmeira', '15014571 - EEI Deán Grande', '15014544 - CEIP Plurilingüe O Grupo', '15014738 - CPI Plurilingüe dos Dices', '15014799 - CEIP de Pumar-Urdilde', '15014829 - CEIP Pedro Barrié de la Maza', '15032686 - CEIP Plurilingüe O Mosteirón', '15014881 - CEIP Sada y sus contornos', '15014957 - CPI de San Sadurniño', '15015238 - CEIP Plurilingüe Barrié de la Maza', '15026777 - CEIP Plurilingüe Pepe de Xan Baña'];

const ProfileForm = () => {
  const { user, updateUserMetadata } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 
    isUploading, 
    previewUrl, 
    selectedFile, 
    handleFileChange, 
    uploadProfileImage: uploadImage, 
    resetProfileImage 
  } = useProfileImage(user?.id);
  
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    specialty: '',
    school_name: '',
    profile_image_url: ''
  });

  // Schema de validación para el formulario
  const formSchema = z.object({
    full_name: z.string().min(3, "O nome debe ter polo menos 3 caracteres"),
    role: z.string().min(1, "Debes seleccionar un cargo"),
    specialty: z.string().min(1, "Debes seleccionar unha especialidade"),
    school_name: z.string().min(1, "Debes seleccionar un centro educativo"),
    profile_image_url: z.string().optional()
  });

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      role: '',
      specialty: '',
      school_name: '',
      profile_image_url: ''
    }
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          // Verificar si existe el perfil del usuario
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile data:', error);
            
            // Si el error es porque no hay filas, crear un perfil para el usuario
            if (error.code === 'PGRST116') {
              // Get school id from school name
              const schoolName = user?.user_metadata?.school_name || '';
              const schoolId = schoolName.split(' - ')[0] || '';

              // Obtener datos de los metadatos del usuario para crear el perfil
              const userData = {
                id: user.id,
                full_name: user?.user_metadata?.full_name || '',
                email: user.email || '',
                role: user?.user_metadata?.role || 'docente',
                specialty: user?.user_metadata?.specialty || '',
                school_name: schoolName,
                school_id: schoolId,
                profile_image_url: user?.user_metadata?.avatar_url || '',
                // Convertir al usuario específico en directivo
                ...(user.id === 'e4e80ce8-ea43-4f3e-95fe-5a9ad57504df' && { role: 'directivo' })
              };
              
              // Crear el perfil en la base de datos
              const { error: insertError } = await supabase
                .from('profiles')
                .insert(userData);
              
              if (insertError) {
                toast.error('Error al crear el perfil de usuario');
                console.error('Error creating user profile:', insertError);
              } else {
                console.log('Created new profile for user:', user.id);
                // Establecer el formulario con los datos creados
                setFormData({
                  full_name: userData.full_name || '',
                  role: userData.role || 'docente',
                  specialty: userData.specialty || '',
                  school_name: userData.school_name || '',
                  profile_image_url: userData.profile_image_url || ''
                });
                
                form.reset({
                  full_name: userData.full_name || '',
                  role: userData.role || 'docente',
                  specialty: userData.specialty || '',
                  school_name: userData.school_name || '',
                  profile_image_url: userData.profile_image_url || ''
                });
              }
            } else {
              toast.error('Error al cargar la información del perfil');
            }
          } else if (data) {
            setFormData({
              full_name: data.full_name || '',
              role: data.role || 'docente',
              specialty: data.specialty || '',
              school_name: data.school_name || '',
              profile_image_url: data.profile_image_url || ''
            });
            
            form.reset({
              full_name: data.full_name || '',
              role: data.role || 'docente',
              specialty: data.specialty || '',
              school_name: data.school_name || '',
              profile_image_url: data.profile_image_url || ''
            });
          }
        } catch (error) {
          console.error('Error in fetchUserProfile:', error);
          toast.error('Error al cargar la información del perfil');
        }
      }
    };

    fetchUserProfile();
  }, [user, form]);

  // Function to upload the profile image
  const uploadProfileImage = async () => {
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        form.setValue('profile_image_url', imageUrl);
        toast.success('Imaxe subida correctamente');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error ao subir a imaxe');
    }
  };

  // Manejar el envío del formulario
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get school id from school name
      const schoolId = data.school_name.split(' - ')[0] || '';

      // Actualizar el perfil en la base de datos
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          role: data.role === 'directivo' ? 'directivo' : 'docente', // Asegurar que el role es válido
          specialty: data.specialty,
          school_name: data.school_name,
          school_id: schoolId,
          profile_image_url: data.profile_image_url || formData.profile_image_url
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Actualizar los metadatos del usuario en auth
      await updateUserMetadata({
        full_name: data.full_name,
        role: data.role,
        specialty: data.specialty,
        school_name: data.school_name,
        avatar_url: data.profile_image_url || formData.profile_image_url
      });

      toast.success('Perfil actualizado correctamente');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Erro ao actualizar o perfil');
      toast.error('Erro ao actualizar o perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sección de imagen de perfil */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-2 border-scola-primary">
                <AvatarImage src={previewUrl || form.watch('profile_image_url') || formData.profile_image_url} alt="Foto de perfil" />
                <AvatarFallback className="text-2xl bg-scola-primary text-white">
                  {formData.full_name?.split(' ').map(name => name[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-image"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="profile-image" className="w-full">
                  <Button type="button" variant="outline" className="w-full" onClick={() => document.getElementById('profile-image')?.click()}>
                    Seleccionar foto
                  </Button>
                </label>
                {selectedFile && (
                  <Button type="button" variant="default" onClick={uploadProfileImage} className="w-full" disabled={isUploading}>
                    {isUploading ? 'Subindo...' : 'Subir foto'}
                  </Button>
                )}
              </div>
            </div>

            {/* Formulario de datos */}
            <div className="flex-1 space-y-4">
              {/* Nombre completo */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome e apelidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome e apelidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rol o cargo - Solo administradores pueden cambiar a directivo */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                          disabled={field.value === 'directivo' && user?.id !== 'e4e80ce8-ea43-4f3e-95fe-5a9ad57504df'}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un cargo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="docente">Docente</SelectItem>
                            {(user?.id === 'e4e80ce8-ea43-4f3e-95fe-5a9ad57504df') && (
                              <SelectItem value="directivo">Directivo</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        {field.value === 'directivo' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Shield className="h-4 w-4 text-amber-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Permisos de directivo</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Os directivos teñen acceso a funcionalidades adicionais na plataforma, 
                                  incluíndo a xestión de usuarios e a configuración de centro.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Pechar</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Especialidad */}
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona unha especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALTIES.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Centro educativo */}
              <FormField
                control={form.control}
                name="school_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro educativo</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un centro educativo" />
                        </SelectTrigger>
                        <SelectContent>
                          {SCHOOLS.map((school) => (
                            <SelectItem key={school} value={school}>
                              {school}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="bg-scola-primary hover:bg-scola-primary/90">
              {loading ? 'Gardando...' : 'Gardar cambios'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
