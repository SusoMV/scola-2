
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import ScolaLogo from '@/components/ScolaLogo';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would authenticate with a backend
    console.log('Login attempt:', { email, password, rememberMe });
    
    // Mock authentication for demo purposes
    if (email && password) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <ScolaLogo size="lg" />
        <h2 className="mt-4 text-2xl font-bold text-scola-primary">Inicio de sesión</h2>
        <div className="w-32 h-1 mt-2 dotted-border"></div>
      </div>
      
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
            className="w-full p-2 border rounded-md focus:ring-scola-primary focus:border-scola-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contrasinal
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-scola-primary focus:border-scola-primary"
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Recordar usuario e contrasinal
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-scola-primary hover:bg-scola-primary-light"
        >
          Iniciar sesión
        </Button>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link 
            to="/forgot-password" 
            className="text-sm text-scola-primary hover:underline"
          >
            Recuperar contrasinal
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Non tes unha conta?
            </span>
            <Link 
              to="/register" 
              className="text-sm text-scola-primary hover:underline"
            >
              Ir a Rexistro
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
