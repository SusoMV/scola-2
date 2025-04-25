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
  onRemoveDocument
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAddDocument) {
      onAddDocument(deadline.id, file);
    }
  };
  return <div className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:border-solid transition-all duration-200 bg-scola-gray">
      <div className="text-scola-primary mb-2">
        <Paperclip className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-center text-gray-700 line-clamp-2 mb-1">{deadline.title}</span>
        <div className="text-xs text-gray-400">
          {format(new Date(deadline.startDate), 'dd/MM/yyyy')} - {format(new Date(deadline.endDate), 'dd/MM/yyyy')}
        </div>
        {deadline.isRequired && <span className="text-xs text-red-500 mt-1">Obrigatorio</span>}
      </div>
      
      {onAddDocument && <div className="mt-2">
          <Button variant="outline" size="sm" asChild>
            <label className="flex items-center cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Engadir documento
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </Button>
        </div>}

      {deadline.documents.length > 0 && <div className="mt-2 space-y-1">
          {deadline.documents.map(doc => <div key={doc.id} className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-700">{doc.name}</span>
              {onRemoveDocument && <Button variant="ghost" size="sm" onClick={() => onRemoveDocument(deadline.id, doc.id)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>}
            </div>)}
        </div>}
    </div>;
};