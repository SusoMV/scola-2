import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Upload, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  date: Date;
  url: string;
}
const SchoolDocumentsPage = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([{
    id: '1',
    name: 'Proxecto educativo 2025-2026.pdf',
    size: 2584000,
    type: 'application/pdf',
    date: new Date('2025-03-22'),
    url: '#'
  }, {
    id: '2',
    name: 'Programación xeral anual.docx',
    size: 780000,
    type: 'application/docx',
    date: new Date('2025-03-18'),
    url: '#'
  }, {
    id: '3',
    name: 'Plan de atención á diversidade.pdf',
    size: 1250000,
    type: 'application/pdf',
    date: new Date('2025-03-10'),
    url: '#'
  }]);
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

      // Create a new document object
      const newDocument: UploadedDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        date: new Date(),
        url: URL.createObjectURL(file)
      };

      // Add to list of uploaded documents
      setUploadedDocuments(prev => [newDocument, ...prev]);

      // Show success toast
      toast({
        title: "Documento subido",
        description: `O documento ${file.name} foi subido correctamente.`
      });

      // Reset file input
      e.target.value = '';
    }
  };
  const handleDeleteDocument = (id: string) => {
    const documentToDelete = uploadedDocuments.find(doc => doc.id === id);
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
    toast({
      title: "Documento eliminado",
      description: `O documento ${documentToDelete?.name} foi eliminado correctamente.`
    });
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  return <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#0070C0]" />
            <h1 className="text-2xl font-bold">Documentos, plans e proxectos</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <div>Documentos do centro</div>
              <Button onClick={handleUploadClick} className="bg-[#0070C0] hover:bg-[#0070C0]/90">
                <Upload className="mr-2 h-4 w-4" /> Subir documento
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv" />
            
            {uploadedDocuments.length > 0 ? <div className="space-y-4">
                {uploadedDocuments.map(doc => <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors my-[13px] py-[10px]">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-[#0070C0]/10 p-2 rounded-lg">
                        <FileText className="h-6 w-6 text-[#0070C0]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)} • {doc.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-[#0070C0]" title="Descargar">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500" onClick={() => handleDeleteDocument(doc.id)} title="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>)}
              </div> : <div className="text-center py-10 text-gray-500">
                <p>Non hai documentos subidos</p>
                <p className="text-sm mt-2">Fai clic en "Subir documento" para engadir documentos</p>
              </div>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>;
};
export default SchoolDocumentsPage;