
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
    <Card className="w-full max-w-lg border border-blue-300 border-dashed rounded-none px-8 py-6">
      <CardHeader className="flex flex-col items-center space-y-2 px-0 pb-6">
        <ScolaLogo className="mb-4" size="lg" />
        <CardTitle className="text-2xl font-bold">
          <div className="flex space-x-10 border-b">
            <Link to="/login" className="text-gray-500 font-semibold text-base">
              Iniciar sesión
            </Link>
            <div className="pb-2 border-b-2 border-[#0070C0] font-semibold">
              Rexistrarse
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            {children}
          </div>
          
          {serverError && (
            <div className="text-destructive text-sm font-medium">{serverError}</div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-[#0070C0] hover:bg-[#0070C0]/90 h-12 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Rexistrando...' : 'Crear conta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterFormLayout;
