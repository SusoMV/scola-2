
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const SchoolInfoPage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'IES Exemplo',
    address: 'Rúa Principal, 12',
    postalCode: '15001',
    province: 'A Coruña',
    email: 'exemplo@edu.xunta.gal',
    phone: '981123456',
    nif: 'Q1500123A'
  });

  const handleInputChange = (field: string, value: string) => {
    setSchoolInfo({ ...schoolInfo, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(null);
    // In a real application, this would save to a database
    toast({
      title: "Datos gardados",
      description: "Os datos do centro foron gardados correctamente."
    });
  };

  const InfoField = ({ 
    label, 
    field, 
    value 
  }: { 
    label: string; 
    field: string; 
    value: string; 
  }) => {
    return (
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
        {isEditing === field ? (
          <div className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleSave} className="bg-scola-primary">
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => setIsEditing(field)}
          >
            {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-scola-primary" />
            <h1 className="text-2xl font-bold">Datos do centro</h1>
          </div>
        </div>
        <div className="dotted-border w-full h-1 mt-2"></div>
      </div>
      
      <div className="space-y-6">
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Información do centro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Fai clic en calquera campo para editalo. Prema en gardar despois de realizar cambios.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InfoField label="Nome do centro" field="name" value={schoolInfo.name} />
                <InfoField label="Dirección" field="address" value={schoolInfo.address} />
                <InfoField label="Código postal" field="postalCode" value={schoolInfo.postalCode} />
                <InfoField label="Provincia" field="province" value={schoolInfo.province} />
              </div>
              <div>
                <InfoField label="Correo electrónico" field="email" value={schoolInfo.email} />
                <InfoField label="Teléfono" field="phone" value={schoolInfo.phone} />
                <InfoField label="NIF" field="nif" value={schoolInfo.nif} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchoolInfoPage;
