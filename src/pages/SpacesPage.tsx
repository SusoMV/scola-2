import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Building } from 'lucide-react';

const SpacesPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Espazos</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Reserva e xestiona os espazos do centro
        </p>
      </div>
      
      {/* Resto del contenido de la página */}
    </DashboardLayout>
  );
};

export default SpacesPage;
