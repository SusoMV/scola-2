
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

// Lista de especialidades
const SPECIALTIES = [
  '597031 Infantil',
  '597032 Inglés',
  '597033 Francés',
  '597034 Educación Física',
  '597035 Música',
  '597036 Pedagoxía Terapéutica',
  '597037 Audición e Linguaxe',
  '597038 Primaria',
  '597939 Orientación'
];

// Lista de centros educativos
const SCHOOLS = [
  '15000016 - CEIP San Marcos',
  '15026637 - CEIP de Barouta',
  '15025220 - CEP Plurilingüe  de Ventín',
  '15032649 - EEI de Milladorio',
  '15020659 - EEI de Covas',
  '15000107 - CEIP A Maía',
  '15032625 - CEIP Agro do Muíño',
  '15019542 - EEI da Igrexa',
  '15021779 - CEIP da Castellana',
  '15000338 - CPI As Mirandas',
  '15020672 - EEI de Rorís',
  '15032716 - CEIP de Arteixo',
  '15000363 - CEIP Ponte dos Brozos',
  '15020714 - EEI de Larín de Arriba',
  '15023041 - CEIP de Galán',
  '15032376 - EEI de Vilarrodís-Oseiro',
  '15000569 - CEIP San Xosé Obreiro',
  '15020933 - EEI de Barrionovo',
  '15020775 - EEI da Lagoa',
  '15000612 - CEIP de Arzúa',
  '15019301 - CPI de San Vicente',
  '15001070 - CPI de Cruz do Sar',
  '15001124 - CEIP Francisco Vales Villamarín',
  '15001239 - CPI Armando Cotarelo Valledor',
  '15001367 - CEIP Plurilingüe de Abanqueiro',
  '15022085 - CEIP de Pazos-Comoxo',
  '15001471 - CEIP Praia Xardín',
  '15021500 - CEIP Santa Baia',
  '15023341 - CEIP Santa María do Castro',
  '15027149 - CEIP de Cespón',
  '15001616 - CEIP de Escarabote',
  '15001665 - CPI Plurilingüe Antonio Orza Couto',
  '15001811 - EEI de Sabaxáns',
  '15001847 - CEIP  Plurilingüe de Pedrouzos',
  '15001744 - EEI dos Ánxeles',
  '15001926 - CPI As Revoltas',
  '15002025 - CEIP Eladia Mariño',
  '15002086 - CEIP de Ponte do Porto',
  '15002050 - CEIP O Areal',
  '15002062 - CEIP de Camelle',
  '15025554 - CEIP Emilio González López',
  '15002165 - CEIP Wenceslao Fernández Flórez',
  '15032426 - CEIP Plurilingüe O Graxal',
  '15023053 - CEIP Portofaro',
  '15019608 - EEI de San Bartolomeu',
  '15023065 - CEIP Gonzalo Torrente Ballester',
  '15020969 - CEIP Plurilingüe Mosteiro de Caaveiro',
  '15021524 - CEIP Plurilingüe A Cristina',
  '15021354 - CEIP Bergantiños',
  '15002578 - CEIP Fogar',
  '15027393 - CEIP Xesús San Luís Romero',
  '15024896 - CEIP de Nétoma-Razo',
  '15023077 - CEIP de Gándara-Sofán',
  '15011661 - CEIP Manuel Fraga Iribarne',
  '15002852 - CEIP do Pindo',
  '15002761 - CEIP Plurilingüe de Carnota',
  '15003005 - CEIP Vicente Otero Valcárcel',
  '15003017 - CEIP de Tabeaio',
  '15003054 - CEIP Nicolás del Río',
  '15022139 - EEI da Pereiriña',
  '15022127 - CEIP da Igrexa',
  '15003248 - CEIP Plurilingüe Vila de Cee',
  '15003376 - CPI Plurilingüe O Cruce',
  '15020970 - CEIP Plurilingüe Celso Emilio Ferreiro',
  '15003534 - CEIP da Barqueira',
  '15022152 - EEI de Coirós de Arriba',
  '15003789 - CEIP Praia de Quenxe',
  '15003807 - CEIP de Bormoio- Agualada',
  '15002670 - CEIP Canosa-Rus',
  '15003881 - CPI Alcalde Xosé Pichel',
  '15019323 - CEIP Plurilingüe Alborada',
  '15004976 - CEIP Curros Enríquez',
  '15005038 - CEIP de Prácticas',
  '15021721 - CEIP de Zalaeta',
  '15021627 - CEIP Emilia Pardo Bazán',
  '15004988 - CEIP Eusebio da Guarda',
  '15023375 - CEIP José Cornide Saavedra',
  '15027241 - CEIP Juan Fernández Latorre',
  '15020568 - CEIP Plurilingüe Labaca',
  '15019311 - CEIP Plurilingüe María Barbeito e Cervino',
  '15005518 - CEIP María Pita',
  '15004991 - CEIP Cidade Vella',
  '15033228 - CEIP Novo Mesoiro',
  '15004745 - CEIP Plurilingüe Anxo da Garda',
  '15004964 - CEIP Plurilingüe Concepción Arenal',
  '15005521 - CEIP Ramón de la Sagra',
  '15005014 - CEIP Raquel Camacho',
  '15005361 - CEIP Rosalía de Castro',
  '15025037 - CEIP Sagrada Familia',
  '15021548 - CEIP Sal Lence',
  '15021792 - CEIP Salgado Torres',
  '15025025 - CEIP San Francisco Javier',
  '15005701 - CEIP Plurilingüe San Pedro de Visma',
  '15005026 - CEIP Torre de Hércules',
  '15021536 - CEIP Plurilingüe Víctor López Seoane',
  '15024902 - CEIP Plurilingüe Wenceslao Fernández Flórez',
  '15023363 - CEIP Plurilingüe  Manuel Murguía',
  '15027253 - CEIP Isaac Díaz Pardo',
  '15005828 - CEIP Plurilingüe de Tarrío',
  '15027708 - CEIP Plurilingüe Ría do Burgo',
  '15021809 - CEIP Sofía Casanova',
  '15033149 - CEIP Vila de Rutis',
  '15005877 - CEIP de Teixeiro',
  '15005932 - CEIP de Curtis',
  '15023399 - CPI Eusebio Lorenzo Baleirón',
  '15021810 - CEIP Plurilingüe Santa Eulalia de Dumbría',
  '15020982 - CEIP Plurilingüe O Ramo',
  '15025633 - CEIP Plurilingüe Os Casais',
  '15022981 - CEIP Plurilingüe de Centieiras',
  '15023405 - CPI A Xunqueira'
];

// Roles que un usuario puede tener
const ROLES = [
  'docente',
  'alumnado',
  'directivo'
];

// Define the form schema using Zod
const registerSchema = z.object({
  email: z.string().email('O correo electrónico é obrigatorio'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  confirmPassword: z.string(),
  full_name: z.string().min(3, 'O nome completo é obrigatorio'),
  phone: z.string().min(9, 'O teléfono é obrigatorio'),
  role: z.string({
    required_error: 'Selecciona un rol',
  }),
  specialty: z.string().optional(),
  school_code: z.string({
    required_error: 'Selecciona un centro educativo',
  }),
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Os contrasinais non coinciden',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');

  // Use React Hook Form with Zod validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      full_name: '',
      phone: '',
      role: 'docente',
      specialty: '',
      school_code: '',
    },
  });

  // Filter schools based on search query
  const filteredSchools = schoolSearchQuery.length > 0
    ? SCHOOLS.filter(school => 
        school.toLowerCase().includes(schoolSearchQuery.toLowerCase()))
    : SCHOOLS;

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      // Extract school name from the selected code
      const schoolSelection = values.school_code;
      const schoolName = schoolSelection.split(' - ')[1] || schoolSelection;
      
      // Prepare user metadata
      const userData = {
        full_name: values.full_name,
        phone: values.phone,
        role: values.role,
        specialty: values.specialty || null,
        school_code: values.school_code.split(' - ')[0] || null,
        school_name: schoolName
      };
      
      // Register the user
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

  const watchRole = form.watch('role');
  const showSpecialty = watchRole === 'docente';

  return (
    <Card className="w-full max-w-md shadow-md border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <ScolaLogo size="lg" />
        </div>
        <CardTitle className="text-xl text-center text-scola-primary">Crear conta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="nome@exemplo.gal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasinal</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Contrasinal" {...field} />
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
                    <Input type="password" placeholder="Confirmar contrasinal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome e apelidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona o teu rol no centro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showSpecialty && (
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona a túa especialidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SPECIALTIES.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="school_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro educativo</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona o teu centro educativo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="p-2">
                        <Input
                          placeholder="Buscar por código ou nome"
                          value={schoolSearchQuery}
                          onChange={(e) => setSchoolSearchQuery(e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {filteredSchools.length > 0 ? (
                          filteredSchools.map((school) => (
                            <SelectItem key={school} value={school}>
                              {school}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-center text-gray-500">
                            Non se atoparon resultados
                          </div>
                        )}
                      </div>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {serverError && (
              <div className="text-destructive text-sm font-medium">{serverError}</div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-scola-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Rexistrando...' : 'Crear conta'}
            </Button>
            
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">Xa tes unha conta?</span>
              <Link to="/login" className="text-scola-primary hover:underline ml-1 font-medium">
                Inicia sesión
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
