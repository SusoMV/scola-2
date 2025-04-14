import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
interface DocumentUploaderProps {
  title: string;
  category: string;
}
interface Document {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadDate: Date;
  file: File;
}
const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  title,
  category
}) => {
  const [documents, setDocuments] = useState<Document[]>(() => {
    const savedDocs = localStorage.getItem(`documents-${category}`);
    return savedDocs ? JSON.parse(savedDocs) : [];
  });
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    toast
  } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        category,
        size: formatFileSize(file.size),
        uploadDate: new Date(),
        file: file
      };
      const updatedDocs = [...documents, newDoc];
      setDocuments(updatedDocs);

      // Save to localStorage (without the actual file data)
      const docsToSave = updatedDocs.map(doc => ({
        ...doc,
        file: undefined // Don't try to save the file object
      }));
      localStorage.setItem(`documents-${category}`, JSON.stringify(docsToSave));
      toast({
        title: "Documento engadido",
        description: `O documento "${file.name}" foi engadido correctamente`
      });
    }
  };
  const handleDelete = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);

    // Update localStorage
    const docsToSave = updatedDocs.map(doc => ({
      ...doc,
      file: undefined
    }));
    localStorage.setItem(`documents-${category}`, JSON.stringify(docsToSave));
    toast({
      title: "Documento eliminado",
      description: "O documento foi eliminado correctamente"
    });

    // Close preview if the deleted document was being previewed
    if (previewDoc && previewDoc.id === id) {
      handleClosePreview();
    }
  };
  const handlePreview = (doc: Document) => {
    setPreviewDoc(doc);

    // Create object URL for preview
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      setPreviewUrl(url);
    }
  };
  const handleClosePreview = () => {
    // Revoke object URL to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewDoc(null);
    setPreviewUrl(null);
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';else return (bytes / 1073741824).toFixed(1) + ' GB';
  };
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('gl-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const openInNewWindow = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };
  return <Card className="border-0 shadow-sm">
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Input type="file" id="document-upload" className="hidden" onChange={handleFileChange} />
            
          </div>
        </div>

        {documents.length > 0 ? <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamaño
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accións
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map(doc => <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(doc.uploadDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900" onClick={() => handlePreview(doc)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900" onClick={() => handleDelete(doc.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div> : <div className="text-center py-10 border rounded-md">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Aínda non hai documentos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comeza subindo o teu primeiro documento
            </p>
          </div>}
        
        {/* Document Preview Dialog */}
        <Dialog open={previewDoc !== null} onOpenChange={() => previewDoc && handleClosePreview()}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{previewDoc?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              {previewUrl && <div className="h-full flex flex-col">
                  <div className="flex justify-end mb-2">
                    <Button variant="outline" onClick={openInNewWindow}>
                      Abrir nunha nova ventá
                    </Button>
                  </div>
                  <iframe src={previewUrl} className="w-full h-full border rounded" title={previewDoc?.name || "Document preview"} />
                </div>}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>;
};
export default DocumentUploader;