
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ExternalLink, CalendarDays, Globe, FileText, Clock, Link2, Brain, ChevronsLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const QuickLinksSection = () => {
  const [schoolWebUrl, setSchoolWebUrl] = useState('https://www.edu.xunta.gal/centros/ceipsanmarcos/');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const { toast } = useToast();

  // Load saved URL from localStorage on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('schoolWebUrl');
    if (savedUrl) {
      setSchoolWebUrl(savedUrl);
    }
  }, []);

  const handleSaveUrl = () => {
    if (tempUrl.trim()) {
      setSchoolWebUrl(tempUrl);
      localStorage.setItem('schoolWebUrl', tempUrl);
      setIsEditingUrl(false);
      
      toast({
        title: "URL actualizada",
        description: "A URL da web do centro foi actualizada correctamente",
      });
    }
  };

  const quickLinks = [
    {
      name: 'Portal Educativo',
      icon: <Globe className="h-6 w-6 text-scola-primary" />,
      link: 'https://www.edu.xunta.gal/portal/',
      external: true,
    },
    {
      name: 'Web do centro',
      icon: <Globe className="h-6 w-6 text-scola-primary" />,
      link: schoolWebUrl,
      external: true,
      editable: true,
    },
    {
      name: 'Gardas',
      icon: <ChevronsLeftRight className="h-6 w-6 text-scola-primary" />,
      link: '/documents',
    },
    {
      name: 'Datos do centro',
      icon: <FileText className="h-6 w-6 text-scola-primary" />,
      link: '/school-info',
    },
    {
      name: 'Horarios',
      icon: <Clock className="h-6 w-6 text-scola-primary" />,
      link: '/schedules',
    },
    {
      name: 'Documentos',
      icon: <FileText className="h-6 w-6 text-scola-primary" />,
      link: '/documents',
    },
    {
      name: 'IA',
      icon: <Brain className="h-6 w-6 text-scola-primary" />,
      link: '/ai',
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Link2 className="h-5 w-5 mr-2 text-scola-primary" />
          Enlaces rápidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <div key={index}>
              {link.external ? (
                <a 
                  href={link.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
                  onClick={(e) => {
                    if (link.editable) {
                      e.preventDefault();
                      setTempUrl(schoolWebUrl);
                      setIsEditingUrl(true);
                    }
                  }}
                >
                  <div className="text-scola-primary mb-2">
                    {link.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 line-clamp-2">{link.name}</span>
                  {link.external && <ExternalLink className="h-3 w-3 text-gray-400 mt-1" />}
                  {link.editable && (
                    <span className="text-xs text-gray-400 mt-1">(Clic para editar)</span>
                  )}
                </a>
              ) : (
                <Link 
                  to={link.link}
                  className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
                >
                  <div className="text-scola-primary mb-2">
                    {link.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 line-clamp-2">{link.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isEditingUrl} onOpenChange={setIsEditingUrl}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar URL da web do centro</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="url" className="text-right">
                URL:
              </label>
              <Input
                id="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingUrl(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveUrl}>
              Gardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QuickLinksSection;
