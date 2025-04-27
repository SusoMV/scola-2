
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Shield } from 'lucide-react';
import SubstitutionDocumentsUploader from '@/components/documents/SubstitutionDocumentsUploader';

const DocumentsPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Gardas</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        <SubstitutionDocumentsUploader />
      </div>
    </DashboardLayout>
  );
};

export default DocumentsPage;
