
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  // Get current date in Galician format
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  // Galician locale might not be supported in all browsers, so we'll use Spanish as a fallback
  const formattedDate = currentDate.toLocaleDateString('es-ES', options);

  return (
    <Card className="border border-scola-gray-dark bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Benvido/a, {userName}</h1>
            <p className="text-gray-600 mt-1 capitalize">{formattedDate}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block py-1 px-3 rounded-full bg-scola-pastel text-scola-primary text-sm font-medium">
              Centro: CEIP San Marcos
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
