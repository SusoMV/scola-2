
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const { user } = useAuth();
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
  
  // Format the date to match the design (Day, DD Month Year)
  const day = currentDate.getDate();
  const month = currentDate.toLocaleDateString('es-ES', { month: 'long' });
  const year = currentDate.getFullYear();
  const weekday = currentDate.toLocaleDateString('es-ES', { weekday: 'long' });
  const formattedDateCustom = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} De ${month.charAt(0).toUpperCase() + month.slice(1)} De ${year}`;

  // Use the actual user name from auth context if available
  const displayName = user?.user_metadata?.full_name || userName;
  
  // Get the school name from user metadata
  const schoolName = user?.user_metadata?.school_name || '';

  return (
    <Card className="border-0 shadow-sm bg-white mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Benvido/a, {displayName}</h1>
            <p className="text-gray-600 mt-1 capitalize">{formattedDateCustom}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block py-2 px-4 rounded-full bg-scola-pastel text-scola-primary text-sm font-medium">
              Centro: {schoolName}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
