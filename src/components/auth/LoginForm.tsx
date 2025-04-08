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
import { toast } from 'sonner';
const loginSchema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres')
});
type LoginFormValues = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const {
    signIn
  } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao iniciar sesión:', error);
      toast.error(error.message || 'Ocorreu un erro ao iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="flex items-center justify-center min-h-screen bg-scola-gray py-0 px-4 sm:px-6 md:px-8">
      <Card className="w-full max-w-2xl border border-blue-300 border-dashed rounded-none px-8 py-[18px] sm:px-[129px]">
        <CardHeader className="flex flex-col items-center space-y-2 px-0 pb-6">
          <ScolaLogo className="mb-4" size="lg" />
          <CardTitle className="text-2xl font-bold">
            <div className="flex space-x-10 border-b">
              <div className="pb-2 border-b-2 border-[#0070C0] font-medium text-base">
                Iniciar sesión
              </div>
              <Link to="/register" className="text-gray-500 font-medium text-base">
                Rexistrarse
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-0 mx-0 my-0 py-0">
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem className="px-0">
                    <FormLabel className="text-lg font-medium">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="nome@escola.edu" type="email" autoComplete="email" disabled={isLoading} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <FormField control={form.control} name="password" render={({
              field
            }) => <FormItem className="px-0">
                    <FormLabel className="text-lg font-medium">Contrasinal</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" autoComplete="current-password" disabled={isLoading} {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              <div className="flex justify-center">
                <Link to="/forgot-password" className="text-[#0070C0] hover:underline">
                  Esquecín o contrasinal
                </Link>
              </div>
              <Button type="submit" className="w-full bg-[#0070C0] hover:bg-[#0070C0]/90 h-12 text-lg" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>;
};
export default LoginForm;