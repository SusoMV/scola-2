import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText } from 'lucide-react';
import DocumentUploader from '@/components/documents/DocumentUploader';
const SchoolInfoPage = () => {
  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Datos do centro</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        
      </div>
    </DashboardLayout>;
};
export default SchoolInfoPage;