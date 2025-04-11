
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AiDevelopmentPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">IA</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Brain className="h-16 w-16 text-scola-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Funcionalidade en desenvolvemento</h2>
            <p className="text-gray-500 text-center max-w-md">
              Esta sección de Intelixencia Artificial está actualmente en desenvolvemento. 
              Estamos traballando para ofrecer ferramentas de IA que axuden na xestión educativa.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AiDevelopmentPage;
