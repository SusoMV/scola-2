
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2 } from 'lucide-react';
import LinkCard from './links/LinkCard';
import EditWebUrlDialog from './links/EditWebUrlDialog';
import { useSchoolWebUrl } from './links/useSchoolWebUrl';
import { createQuickLinks } from './links/quickLinksData';

const QuickLinksSection = () => {
  const {
    schoolWebUrl,
    isEditingUrl,
    setIsEditingUrl,
    tempUrl,
    setTempUrl,
    handleEditUrl,
    handleSaveUrl
  } = useSchoolWebUrl();

  const quickLinks = createQuickLinks(schoolWebUrl);

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
              <LinkCard
                name={link.name}
                icon={link.icon}
                link={link.link}
                external={link.external}
                customAction={link.customAction}
                onEdit={link.customAction ? handleEditUrl : undefined}
              />
            </div>
          ))}
        </div>
      </CardContent>

      <EditWebUrlDialog
        isOpen={isEditingUrl}
        onOpenChange={setIsEditingUrl}
        tempUrl={tempUrl}
        onTempUrlChange={setTempUrl}
        onSave={handleSaveUrl}
      />
    </Card>
  );
};

export default QuickLinksSection;
