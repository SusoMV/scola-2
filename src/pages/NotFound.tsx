
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScolaLogo from '@/components/ScolaLogo';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-scola-gray flex flex-col items-center justify-center p-4 text-center">
      <ScolaLogo size="lg" className="mb-6" />
      <h1 className="text-4xl font-bold text-scola-primary mb-2">404</h1>
      <p className="text-xl text-gray-700 mb-8">Páxina non atopada</p>
      <p className="text-gray-600 max-w-md mb-8">
        A páxina que estás buscando non existe ou foi movida a outro enderezo.
      </p>
      <Link to="/">
        <Button className="bg-scola-primary hover:bg-scola-primary-light">
          Volver ao inicio
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
