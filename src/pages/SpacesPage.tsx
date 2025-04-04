import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ScrollArea } from '@/components/ui/scroll-area';

const SpacesPage = () => {
  // Here we'll just add some styling to indicate this is the SpacesPage
  // In a real implementation, this would have all the functionality described
  return (
    <DashboardLayout>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Espazos</h1>
          <div className="w-32 h-1 mt-2 dotted-border"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Aulas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={`aula-${item}`} 
                  className="border border-scola-gray-dark rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-blue-50"
                >
                  <div className="h-24 bg-gradient-to-r from-blue-400 to-blue-500 p-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">Aula {item}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Capacidade:</span>
                      <span className="font-medium">{20 + item} alumnos</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Andar:</span>
                      <span className="font-medium">{item <= 3 ? '1º' : '2º'}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        Detalles
                      </button>
                      <button className="flex-1 border border-blue-600 text-blue-600 py-1 px-2 rounded text-sm hover:bg-blue-50 transition-colors">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Salas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3].map((item) => (
                <div 
                  key={`sala-${item}`} 
                  className="border border-scola-gray-dark rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-blue-50"
                >
                  <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">Sala {item}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Tipo:</span>
                      <span className="font-medium">
                        {item === 1 ? 'Reunións' : item === 2 ? 'Profesorado' : 'Multimedia'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Capacidade:</span>
                      <span className="font-medium">{10 + item * 5} persoas</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        Detalles
                      </button>
                      <button className="flex-1 border border-blue-600 text-blue-600 py-1 px-2 rounded text-sm hover:bg-blue-50 transition-colors">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Instalacións</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Biblioteca', capacity: 50, features: ['Wifi', 'Ordenadores', 'Impresora'] },
                { name: 'Ximnasio', capacity: 80, features: ['Material deportivo', 'Vestiarios'] },
                { name: 'Salón de actos', capacity: 120, features: ['Proxector', 'Son', 'Escenario'] }
              ].map((item, i) => (
                <div 
                  key={`instalacion-${i}`} 
                  className="border border-scola-gray-dark rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-blue-50"
                >
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{item.name}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Capacidade:</span>
                      <span className="font-medium">{item.capacity} persoas</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Características:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.features.map((feature, j) => (
                          <span 
                            key={j} 
                            className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        Detalles
                      </button>
                      <button className="flex-1 border border-blue-600 text-blue-600 py-1 px-2 rounded text-sm hover:bg-blue-50 transition-colors">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
};

export default SpacesPage;
