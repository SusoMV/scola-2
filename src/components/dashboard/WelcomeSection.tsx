
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const { user } = useAuth();
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const formattedDate = currentDate.toLocaleDateString('gl-ES', options)
    .replace(/^\w/, c => c.toUpperCase());

  const displayName = user?.user_metadata?.full_name || userName;
  const schoolName = user?.user_metadata?.school_name || '';

  return (
    <Card className="border-0 shadow-sm bg-scola-primary mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Benvido/a, {displayName}</h1>
            <p className="text-white/90 mt-1 capitalize">{formattedDate}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block py-2 px-4 rounded-full bg-white text-scola-primary text-sm font-medium">
              Centro: {schoolName}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;

