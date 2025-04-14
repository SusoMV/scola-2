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
      
    </Card>;
};
export default DocumentUploader;