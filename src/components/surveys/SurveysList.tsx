import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Survey } from '@/hooks/useSurveys';
import SurveyResponseDialog from './SurveyResponseDialog';
import SurveyResponsesViewDialog from './SurveyResponsesViewDialog';
interface SurveysListProps {
  surveys: Survey[];
  onDelete: (id: string) => void;
  onAddResponse: (surveyId: string, response: {
    userId: string;
    answer: string | string[];
  }) => void;
}
const SurveysList: React.FC<SurveysListProps> = ({
  surveys,
  onDelete,
  onAddResponse
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [viewResponsesSurvey, setViewResponsesSurvey] = useState<Survey | null>(null);
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES');
  };
  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
  };
  const handleViewResponses = (survey: Survey, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewResponsesSurvey(survey);
  };
  if (surveys.length === 0) {
    return <div className="text-center py-8 text-gray-500">
        Non hai enquisas creadas aínda.
      </div>;
  }
  return <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título da enquisa</TableHead>
            <TableHead>Tipo de resposta</TableHead>
            <TableHead>Data límite</TableHead>
            <TableHead>Respostas</TableHead>
            <TableHead className="w-[80px]">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.map(survey => <TableRow key={survey.id}>
              <TableCell className="font-medium cursor-pointer hover:text-scola-primary hover:underline" onClick={() => handleSurveyClick(survey)}>
                {survey.title}
              </TableCell>
              <TableCell>
                {survey.responseType === 'short' ? 'Resposta curta' : 'Resposta múltiple'}
              </TableCell>
              <TableCell>{formatDate(survey.deadline)}</TableCell>
              <TableCell className="font-medium">
                <span className="cursor-pointer hover:text-scola-primary hover:underline" onClick={e => handleViewResponses(survey, e)}>
                  {survey.responses.length}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(survey.id)} className="hover:bg-red-100 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
      
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Seguro que queres eliminar esta enquisa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción non se pode desfacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedSurvey && <SurveyResponseDialog survey={selectedSurvey} isOpen={!!selectedSurvey} onClose={() => setSelectedSurvey(null)} onSubmit={response => {
      onAddResponse(selectedSurvey.id, response);
      setSelectedSurvey(null);
    }} />}

      {viewResponsesSurvey && <SurveyResponsesViewDialog survey={viewResponsesSurvey} isOpen={!!viewResponsesSurvey} onClose={() => setViewResponsesSurvey(null)} />}
    </>;
};
export default SurveysList;