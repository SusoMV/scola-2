
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ScheduleItem {
  time: string;
  subject: string;
  group: string;
  location: string;
}

const ScheduleSection = () => {
  // Mock data for the schedule
  const scheduleItems: ScheduleItem[] = [{
    time: '09:00 - 10:00',
    subject: 'Matemáticas',
    group: '5º Primaria',
    location: 'Aula 12'
  }, {
    time: '10:00 - 11:00',
    subject: 'Lingua Galega',
    group: '6º Primaria',
    location: 'Aula 12'
  }, {
    time: '11:30 - 12:30',
    subject: 'Ciencias Naturais',
    group: '5º Primaria',
    location: 'Laboratorio'
  }, {
    time: '12:30 - 13:30',
    subject: 'Educación Física',
    group: '3º Primaria',
    location: 'Ximnasio'
  }];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="h-5 w-5 mr-2 text-scola-primary" />
          Clases do día
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center border border-dashed border-scola-primary rounded-lg p-4 hover:border-solid hover:bg-scola-pastel transition-all duration-200"
            >
              <div className="bg-scola-pastel text-scola-primary px-3 py-1 rounded-md text-sm font-medium min-w-[120px] flex items-center justify-center">
                {item.time}
              </div>
              <div className="flex-grow px-6">
                <h3 className="text-lg font-medium text-gray-700">{item.subject}</h3>
                <p className="text-sm text-gray-500">{item.group}</p>
              </div>
              <div className="text-gray-500 text-sm">
                {item.location}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleSection;

