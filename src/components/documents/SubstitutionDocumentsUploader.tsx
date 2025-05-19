import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useDocuments } from '@/hooks/useDocuments';
const SubstitutionDocumentsUploader = () => {
  const {
    documents,
    isLoading,
    addDocument,
    deleteDocument,
    downloadDocument
  } = useDocuments('substitutions');
  const {
    toast
  } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      addDocument({
        name: file.name,
        size: file.size,
        category: 'substitutions'
      });
      e.target.value = '';
    }
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  return <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div>Gardas de transporte</div>
          <Button onClick={handleUploadClick} className="bg-scola-primary hover:bg-scola-primary/90">
            <Upload className="mr-2 h-4 w-4" /> Subir documento
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        
        {isLoading ? <div className="text-center py-10">
            <p>Cargando...</p>
          </div> : documents.length > 0 ? <div className="space-y-4">
            {documents.map(doc => <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors my-[13px] py-[10px]">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-scola-pastel p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-scola-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(doc.size)} • {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-scola-primary" onClick={() => downloadDocument(doc.id, doc.name)} title="Descargar">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500" onClick={() => deleteDocument(doc.id)} title="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>)}
          </div> : <div className="text-center py-10 text-gray-500">
            <p>Non hai documentos subidos</p>
            <p className="text-sm mt-2">Fai clic en "Subir documento" para engadir documentos</p>
          </div>}
      </CardContent>
    </Card>;
};
export default SubstitutionDocumentsUploader;