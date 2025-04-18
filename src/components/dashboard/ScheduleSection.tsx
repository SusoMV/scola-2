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
    location: 'Aula 14'
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
  return <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="h-5 w-5 mr-2 text-scola-primary" />
          Clases do día
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item, index) => <div key={index} className="flex flex-col p-4 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200 cursor-pointer py-0 px-0 my-[7px] mx-0">
              <div className="text-center">
                <div className="bg-scola-pastel text-scola-primary text-sm font-medium py-1 px-3 rounded-md mb-2 inline-block">
                  {item.time}
                </div>
                <p className="font-medium text-gray-700 mb-1">{item.subject}</p>
                <p className="text-sm text-gray-500">{item.group}</p>
              </div>
              <div className="mt-2 text-sm text-gray-500 text-center">
                {item.location}
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};
export default ScheduleSection;