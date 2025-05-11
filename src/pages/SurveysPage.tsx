
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateSurveyDialog from '@/components/surveys/CreateSurveyDialog';
import SurveysList from '@/components/surveys/SurveysList';
import { useSurveys } from '@/hooks/useSurveys';

const SurveysPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { surveys, addSurvey, deleteSurvey, addResponse } = useSurveys();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Enquisas</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-scola-primary hover:bg-scola-primary-dark flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Realizar enquisa
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <SurveysList 
          surveys={surveys} 
          onDelete={deleteSurvey} 
          onAddResponse={addResponse}
        />
      </div>

      <CreateSurveyDialog 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={addSurvey}
      />
    </DashboardLayout>
  );
};

export default SurveysPage;
