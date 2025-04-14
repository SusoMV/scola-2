
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Book } from 'lucide-react';
import DocumentUploader from '@/components/documents/DocumentUploader';

const ClassroomPlanningPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Planificación de aula</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        <DocumentUploader title="Documentos de planificación" category="classroom-planning" />
      </div>
    </DashboardLayout>
  );
};

export default ClassroomPlanningPage;
