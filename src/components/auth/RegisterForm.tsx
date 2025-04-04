
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import ScolaLogo from '@/components/ScolaLogo';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value || value === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    // In a real implementation, this would register with a backend
    console.log('Registration attempt:', { email, password });
    
    // Mock registration success for demo purposes
    if (email && password && password === confirmPassword) {
      window.location.href = '/complete-profile';
    }
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <ScolaLogo size="lg" />
        <h2 className="mt-4 text-2xl font-bold text-scola-primary">Rexistro</h2>
        <div className="w-24 h-1 mt-2 dotted-border"></div>
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
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Repetir contrasinal
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full p-2 border rounded-md focus:ring-scola-primary focus:border-scola-primary ${
              !passwordsMatch ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
            required
          />
          {!passwordsMatch && (
            <p className="mt-1 text-sm text-red-500">Os contrasinais non coinciden</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-scola-primary hover:bg-scola-primary-light"
          disabled={!passwordsMatch}
        >
          Continuar
        </Button>
        
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-600">
            Xa tes unha conta?
          </span>
          <Link 
            to="/login" 
            className="text-sm text-scola-primary hover:underline"
          >
            Iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
