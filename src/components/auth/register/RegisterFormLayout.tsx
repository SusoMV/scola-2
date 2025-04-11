
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScolaLogo from '@/components/ScolaLogo';
import { Button } from '@/components/ui/button';

interface RegisterFormLayoutProps {
  children: React.ReactNode;
  isSubmitting: boolean;
  serverError: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterFormLayout: React.FC<RegisterFormLayoutProps> = ({
  children,
  isSubmitting,
  serverError,
  onSubmit
}) => {
  return (
    <Card className="border border-blue-300 border-dashed rounded-lg overflow-hidden">
      <CardHeader className="flex flex-col items-center justify-center pt-8 pb-6 px-6">
        <div className="flex justify-center w-full mb-6">
          <ScolaLogo className="w-full" size="lg" />
        </div>
        <div className="w-full flex border-b mx-0 px-[64px] py-0">
          <Link to="/login" className="pb-2 px-6 text-gray-500 font-medium">
            Iniciar sesión
          </Link>
          <div className="pb-2 px-6 border-b-2 border-[#0070C0] font-medium">
            Rexistrarse
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            {children}
          </div>
          
          {serverError && (
            <div className="text-destructive text-sm font-medium">{serverError}</div>
          )}
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="bg-[#0070C0] hover:bg-[#0070C0]/90 h-12 px-8 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Rexistrando...' : 'Crear conta'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterFormLayout;
