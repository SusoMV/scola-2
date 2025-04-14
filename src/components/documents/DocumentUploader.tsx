
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Trash2, Download, Eye } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { Skeleton } from '@/components/ui/skeleton';

interface DocumentUploaderProps {
  title: string;
  category: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ title, category }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { documents, isLoading, addDocument, deleteDocument, downloadDocument } = useDocuments(category);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Create a new document object
      addDocument({
        name: file.name,
        size: file.size,
        category
      });
      
      // Reset file input
      e.target.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return "Data descoñecida";
    }
  };

  const handleViewDocument = (id: string, name: string) => {
    setViewingDocument(name);
    // In a real app, this would open the document in a viewer
    window.open(`https://example.com/documents/${id}`, '_blank');
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div>{title}</div>
          <Button onClick={handleUploadClick} className="bg-scola-primary hover:bg-scola-primary/90">
            <Upload className="mr-2 h-4 w-4" /> Subir documento
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv" 
        />
        
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-scola-primary/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-scola-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(doc.size)} • {formatDate(doc.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-500 hover:text-scola-primary" 
                    title="Ver"
                    onClick={() => handleViewDocument(doc.id, doc.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-500 hover:text-scola-primary" 
                    title="Descargar"
                    onClick={() => downloadDocument(doc.id, doc.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-500 hover:text-red-500" 
                    title="Eliminar"
                    onClick={() => deleteDocument(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>Non hai documentos subidos</p>
            <p className="text-sm mt-2">Fai clic en "Subir documento" para engadir documentos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
