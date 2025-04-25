
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Paperclip, Plus, Trash } from 'lucide-react';
import { Deadline, DeadlineDocument } from '@/types/deadlines';

interface DeadlineCardProps {
  deadline: Deadline;
  onAddDocument?: (deadlineId: string, file: File) => void;
  onRemoveDocument?: (deadlineId: string, documentId: string) => void;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({
  deadline,
  onAddDocument,
  onRemoveDocument,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAddDocument) {
      onAddDocument(deadline.id, file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{deadline.title}</span>
          {deadline.isRequired && (
            <span className="text-sm font-normal text-red-500">Obrigatorio</span>
          )}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {format(new Date(deadline.startDate), 'dd/MM/yyyy')} - {format(new Date(deadline.endDate), 'dd/MM/yyyy')}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{deadline.description}</p>
        
        {onAddDocument && (
          <div className="mb-4">
            <Button variant="outline" className="w-full" asChild>
              <label>
                <Plus className="mr-2 h-4 w-4" />
                Engadir documento
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        )}

        {deadline.documents.length > 0 && (
          <div className="space-y-2">
            {deadline.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doc.name}</span>
                </div>
                {onRemoveDocument && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveDocument(deadline.id, doc.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
