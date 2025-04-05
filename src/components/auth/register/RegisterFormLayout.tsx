
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
    <Card className="w-full max-w-md shadow-md border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <ScolaLogo size="lg" />
        </div>
        <CardTitle className="text-xl text-center text-scola-primary">Crear conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          
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
      </CardContent>
    </Card>
  );
};

export default RegisterFormLayout;
