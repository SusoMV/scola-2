
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Survey, SurveyResponse } from '@/hooks/useSurveys';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

interface SurveyResponsesViewDialogProps {
  survey: Survey;
  isOpen: boolean;
  onClose: () => void;
}

const SurveyResponsesViewDialog: React.FC<SurveyResponsesViewDialogProps> = ({
  survey,
  isOpen,
  onClose,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('es-ES');
  };

  const renderResponseValue = (response: SurveyResponse) => {
    if (Array.isArray(response.answer)) {
      return response.answer.join(", ");
    }
    return response.answer;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Respostas para: {survey.title}</DialogTitle>
        </DialogHeader>
        
        {survey.responses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Non hai respostas para esta enquisa.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {!survey.isAnonymous && (
                  <TableHead>Usuario</TableHead>
                )}
                <TableHead>Resposta</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {survey.responses.map((response) => (
                <TableRow key={response.id}>
                  {!survey.isAnonymous && (
                    <TableCell>{response.userId === 'anonymous' ? 'Anónimo' : response.userId}</TableCell>
                  )}
                  <TableCell>{renderResponseValue(response)}</TableCell>
                  <TableCell>{formatDate(response.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <DialogFooter>
          <Button onClick={onClose}>Pechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyResponsesViewDialog;
