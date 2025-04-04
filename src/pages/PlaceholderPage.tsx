
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleOff } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        
        <Card className="border border-scola-gray-dark">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Páxina en desenvolvemento
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <CircleOff className="w-16 h-16 text-scola-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Esta sección está en desenvolvemento
            </h2>
            <p className="text-gray-600 max-w-md">
              Estamos traballando nesta funcionalidade. Pronto estará dispoñible para o seu uso.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
