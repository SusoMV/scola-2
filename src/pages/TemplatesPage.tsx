
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Upload, Trash2, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  size: number;
  type: string;
  date: Date;
  url: string;
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newTemplate: Template = {
        id: `template-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        date: new Date(),
        url: URL.createObjectURL(file)
      };

      setTemplates(prev => [newTemplate, ...prev]);
      toast({
        title: "Modelo subido",
        description: `O modelo ${file.name} foi subido correctamente.`
      });
      e.target.value = '';
    }
  };

  const handleDeleteTemplate = (id: string) => {
    const templateToDelete = templates.find(doc => doc.id === id);
    setTemplates(templates.filter(doc => doc.id !== id));
    toast({
      title: "Modelo eliminado",
      description: `O modelo ${templateToDelete?.name} foi eliminado correctamente.`
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#0070C0]" />
            <h1 className="text-2xl font-bold">Modelos</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <div>Modelos de documentos</div>
            <Button onClick={handleUploadClick} className="bg-[#0070C0] hover:bg-[#0070C0]/90">
              <Upload className="mr-2 h-4 w-4" /> Subir modelo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          />
          
          {templates.length > 0 ? (
            <div className="space-y-4">
              {templates.map(template => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-[#0070C0]/10 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-[#0070C0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{template.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(template.size)} • {template.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500 hover:text-[#0070C0]" 
                      onClick={() => window.open(template.url, '_blank')}
                      title="Ver"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500 hover:text-[#0070C0]" 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = template.url;
                        link.download = template.name;
                        link.click();
                      }}
                      title="Descargar"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500 hover:text-red-500" 
                      onClick={() => handleDeleteTemplate(template.id)}
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>Non hai modelos subidos</p>
              <p className="text-sm mt-2">Fai clic en "Subir modelo" para engadir documentos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TemplatesPage;
