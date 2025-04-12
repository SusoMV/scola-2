
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Book } from 'lucide-react';
import DocumentUploader from '@/components/documents/DocumentUploader';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/hooks/useDocuments';

const ClassroomPlanningPage = () => {
  const { 
    documents, 
    isLoading, 
    deleteDocument,
    downloadDocument
  } = useDocuments('classroom-planning');

  // Helper function to safely format dates
  const safeFormatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Data non válida';
      }
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data non válida';
    }
  };

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
        <DocumentUploader title="Subir documentos de planificación" category="classroom-planning" />
        
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-lg font-medium mb-4">Documentos subidos</h2>
          
          {isLoading ? (
            <p className="text-center py-4">Cargando documentos...</p>
          ) : documents.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Non hai documentos subidos</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de carga</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead className="text-right">Accións</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{safeFormatDate(doc.created_at)}</TableCell>
                    <TableCell>{(doc.size / 1024).toFixed(2)} KB</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => downloadDocument(doc.id, doc.name)}
                        >
                          Descargar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClassroomPlanningPage;
