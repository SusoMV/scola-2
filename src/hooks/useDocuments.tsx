
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface Document {
  id: string;
  name: string;
  size: number;
  created_at: string;
  category: string;
}

// This is a mock implementation. In a real app, this would connect to your API
export const useDocuments = (category: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load documents on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, fetch from API
        const mockDocuments = localStorage.getItem(`documents-${category}`);
        if (mockDocuments) {
          const parsedDocuments = JSON.parse(mockDocuments);
          
          // Validate that each document has a valid created_at date
          const validDocuments = parsedDocuments.map((doc: Document) => {
            // If created_at is invalid, set it to current date
            if (!doc.created_at || isNaN(new Date(doc.created_at).getTime())) {
              return {
                ...doc,
                created_at: new Date().toISOString()
              };
            }
            return doc;
          });
          
          setDocuments(validDocuments);
          
          // Update localStorage with validated documents if needed
          if (JSON.stringify(validDocuments) !== mockDocuments) {
            localStorage.setItem(`documents-${category}`, JSON.stringify(validDocuments));
          }
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
        toast({
          title: 'Error',
          description: 'Non se puideron cargar os documentos',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, [category]);

  // Function to add a new document
  const addDocument = (document: Omit<Document, 'id' | 'created_at'>) => {
    const newDocument = {
      ...document,
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };

    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    localStorage.setItem(`documents-${category}`, JSON.stringify(updatedDocuments));

    toast({
      title: 'Documento subido',
      description: 'O documento foi subido correctamente',
    });
  };

  // Function to delete a document
  const deleteDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem(`documents-${category}`, JSON.stringify(updatedDocuments));

    toast({
      title: 'Documento eliminado',
      description: 'O documento foi eliminado correctamente',
    });
  };

  // Function to download a document
  const downloadDocument = (id: string, name: string) => {
    // In a real app, this would trigger a file download from your API
    toast({
      title: 'Descargando documento',
      description: `Descargando ${name}...`,
    });
  };

  return {
    documents,
    isLoading,
    addDocument,
    deleteDocument,
    downloadDocument,
  };
};
