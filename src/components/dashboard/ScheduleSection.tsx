import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import SectionTitle from '@/components/ui/section-title';

interface ScheduleItem {
  time: string;
  subject: string;
  group: string;
  location: string;
}

const ScheduleSection = () => {
  // Mock data for the schedule
  const scheduleItems: ScheduleItem[] = [
    {
      time: '09:00 - 10:00',
      subject: 'Matemáticas',
      group: '5º Primaria',
      location: 'Aula 12'
    },
    {
      time: '10:00 - 11:00',
      subject: 'Lingua Galega',
      group: '6º Primaria',
      location: 'Aula 14'
    },
    {
      time: '11:30 - 12:30',
      subject: 'Ciencias Naturais',
      group: '5º Primaria',
      location: 'Laboratorio'
    },
    {
      time: '12:30 - 13:30',
      subject: 'Educación Física',
      group: '3º Primaria',
      location: 'Ximnasio'
    }
  ];

  return (
    <Card className="mt-6 border border-scola-gray-dark">
      <CardHeader className="pb-2">
        <SectionTitle icon={Clock}>Clases do día</SectionTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div 
              key={index} 
              className="p-3 bg-white rounded-md border border-scola-gray-dark flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center">
                <div className="bg-scola-pastel text-scola-primary text-sm font-medium py-1 px-3 rounded-md w-32 text-center">
                  {item.time}
                </div>
                <div className="ml-4">
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-gray-500">{item.group}</p>
                </div>
              </div>
              <div className="mt-2 md:mt-0 md:ml-4 text-sm text-gray-500">
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
