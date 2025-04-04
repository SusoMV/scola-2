
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, MessageSquare, Clock } from 'lucide-react';

const SummaryCards = () => {
  // This would be data from an API in a real app
  const summaryData = {
    absences: 2,
    events: 3,
    unreadMessages: 5,
    dailyClasses: 4
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <Card className="border border-scola-gray-dark hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full w-12 h-12 bg-scola-pastel flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-scola-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Ausencias de hoxe</p>
            <p className="text-xl font-bold text-gray-800">{summaryData.absences}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-scola-gray-dark hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full w-12 h-12 bg-scola-pastel flex items-center justify-center mr-4">
            <Calendar className="h-6 w-6 text-scola-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Eventos do día</p>
            <p className="text-xl font-bold text-gray-800">{summaryData.events}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-scola-gray-dark hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full w-12 h-12 bg-scola-pastel flex items-center justify-center mr-4">
            <MessageSquare className="h-6 w-6 text-scola-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mensaxes sen ler</p>
            <p className="text-xl font-bold text-gray-800">{summaryData.unreadMessages}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-scola-gray-dark hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full w-12 h-12 bg-scola-pastel flex items-center justify-center mr-4">
            <Clock className="h-6 w-6 text-scola-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Clases do día</p>
            <p className="text-xl font-bold text-gray-800">{summaryData.dailyClasses}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
