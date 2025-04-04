
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import ScolaLogo from '@/components/ScolaLogo';
import { toast } from "@/components/ui/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would connect to a backend service
    console.log('Password recovery for:', email);
    
    // Show success message
    toast({
      title: "Correo enviado",
      description: "Revisa o teu correo para recibir instrucións para recuperar o contrasinal.",
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-scola-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <ScolaLogo size="lg" />
          <h2 className="mt-4 text-2xl font-bold text-scola-primary">Recuperar contrasinal</h2>
          <div className="w-48 h-1 mt-2 dotted-border"></div>
        </div>
        
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              Enviamos instrucións a <strong>{email}</strong> para restablecer o teu contrasinal.
            </p>
            <p className="text-gray-700">
              Por favor, revisa o teu correo e segue as instrucións.
            </p>
            <div className="mt-6">
              <Link to="/login">
                <Button 
                  className="bg-scola-primary hover:bg-scola-primary-light"
                >
                  Volver ao inicio de sesión
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.com"
                className="w-full"
                required
              />
              <p className="text-sm text-gray-500">
                Recibirás un correo con instrucións para restablecer o teu contrasinal.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-scola-primary hover:bg-scola-primary-light"
            >
              Recuperar contrasinal
            </Button>
            
            <div className="flex items-center justify-center">
              <Link 
                to="/login" 
                className="text-sm text-scola-primary hover:underline"
              >
                Volver ao inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
