
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ScolaLogo from '@/components/ScolaLogo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/integrations/supabase/types';

// Define a specific type for the school data we need
type SchoolBasic = Pick<Tables<'schools'>, 'id' | 'name'>;

const registerSchema = z.object({
  fullName: z.string().min(2, 'O nome debe ter polo menos 2 caracteres'),
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  school: z.string().min(1, 'Selecciona un centro educativo'),
  specialty: z.string().min(1, 'Selecciona unha especialidade'),
  role: z.string().default('docente')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Os contrasinais non coinciden',
  path: ['confirmPassword']
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const fetchSchools = async (): Promise<SchoolBasic[]> => {
  const { data, error } = await supabase
    .from('schools')
    .select('id, name');

  if (error) throw error;
  return data || [];
};

const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { data: schools = [], isLoading: isLoadingSchools } = useQuery({
    queryKey: ['schools'],
    queryFn: fetchSchools
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      school: '',
      specialty: '',
      role: 'docente'
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const selectedSchool = schools.find(s => s.id === data.school);
      
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        role: data.role,
        specialty: data.specialty,
        school_id: data.school,
        school_name: selectedSchool?.name || '',
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Erro ao rexistrarse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const specialties = [
    { id: 'matemáticas', name: 'Matemáticas' },
    { id: 'lingua_galega', name: 'Lingua Galega' },
    { id: 'lingua_castelá', name: 'Lingua Castelá' },
    { id: 'inglés', name: 'Inglés' },
    { id: 'ciencias_naturais', name: 'Ciencias Naturais' },
    { id: 'ciencias_sociais', name: 'Ciencias Sociais' },
    { id: 'educación_física', name: 'Educación Física' },
    { id: 'música', name: 'Música' },
    { id: 'plástica', name: 'Plástica' },
    { id: 'tecnoloxía', name: 'Tecnoloxía' },
    { id: 'informática', name: 'Informática' },
    { id: 'filosofía', name: 'Filosofía' },
    { id: 'latín', name: 'Latín' },
    { id: 'grego', name: 'Grego' },
    { id: 'economía', name: 'Economía' },
    { id: 'física_química', name: 'Física e Química' },
    { id: 'bioloxía_xeoloxía', name: 'Bioloxía e Xeoloxía' },
    { id: 'relixión', name: 'Relixión' },
    { id: 'pedagoxía_terapéutica', name: 'Pedagoxía Terapéutica' },
    { id: 'audición_linguaxe', name: 'Audición e Linguaxe' },
    { id: 'orientación', name: 'Orientación' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-scola-gray py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <ScolaLogo className="mb-4" />
          <CardTitle className="text-2xl font-bold">Rexístrate</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome e apelidos"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nome@escola.edu"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contrasinal</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contrasinal</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro educativo</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading || isLoadingSchools}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona o teu centro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schools.map((school) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona a túa especialidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol no centro</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona o teu rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="docente">Docente</SelectItem>
                        <SelectItem value="directivo">Directivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-scola-primary hover:bg-scola-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? 'Creando conta...' : 'Crear conta'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  ¿Xa tes unha conta?{' '}
                  <Link to="/login" className="text-scola-primary hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
