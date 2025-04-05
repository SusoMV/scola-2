
import React from 'react';
import { Button } from '@/components/ui/button';
import ScolaLogo from '@/components/ScolaLogo';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { CompleteProfileFormValues } from './types';

interface CompleteProfileFormLayoutProps {
  children: React.ReactNode;
  form: UseFormReturn<CompleteProfileFormValues>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const CompleteProfileFormLayout: React.FC<CompleteProfileFormLayoutProps> = ({
  children,
  form,
  isSubmitting,
  onSubmit
}) => {
  return (
    <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <ScolaLogo size="lg" />
        <h2 className="mt-4 text-2xl font-bold text-scola-primary">Completar perfil</h2>
        <div className="w-40 h-1 mt-2 dotted-border"></div>
      </div>
      
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
          
          <Button 
            type="submit" 
            className="w-full bg-scola-primary hover:bg-scola-primary-light"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Procesando...' : 'Completar rexistro'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompleteProfileFormLayout;
