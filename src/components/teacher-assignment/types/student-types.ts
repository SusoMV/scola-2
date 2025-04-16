
export interface Student {
  id: string;
  name: string;
  birthDate: string;
  parents: string;
  phone: string;
}

export interface GroupData {
  [course: string]: Student[];
}

// Sample data - in a real app, this would come from your database
export const initialGroups: GroupData = {
  '4º Infantil': [
    { id: '1', name: 'Alba Rodríguez Méndez', birthDate: '15/05/2020', parents: 'Ana Méndez / Carlos Rodríguez', phone: '666111222' },
    { id: '2', name: 'Bruno Sánchez López', birthDate: '23/06/2020', parents: 'Marta López / David Sánchez', phone: '666333444' },
    { id: '3', name: 'Carla Martínez García', birthDate: '12/04/2020', parents: 'Lucía García / Pedro Martínez', phone: '666555666' }
  ],
  '5º Infantil': [
    { id: '4', name: 'Daniel Pérez Fernández', birthDate: '04/08/2019', parents: 'Sofía Fernández / Javier Pérez', phone: '666777888' },
    { id: '5', name: 'Eva González Silva', birthDate: '17/09/2019', parents: 'María Silva / Antonio González', phone: '666999000' }
  ],
  '6º Infantil': [
    { id: '6', name: 'Fernando López Castro', birthDate: '30/11/2018', parents: 'Laura Castro / Marcos López', phone: '677111222' },
    { id: '7', name: 'Gloria Díaz Vázquez', birthDate: '25/10/2018', parents: 'Carmen Vázquez / Roberto Díaz', phone: '677333444' }
  ],
  '1º Primaria': [
    { id: '8', name: 'Hugo Fernández Gómez', birthDate: '14/02/2018', parents: 'Raquel Gómez / Alberto Fernández', phone: '677555666' },
    { id: '9', name: 'Irene Castro Blanco', birthDate: '09/03/2018', parents: 'Nuria Blanco / Luis Castro', phone: '677777888' }
  ],
  '2º Primaria': [
    { id: '10', name: 'Jorge Martín Álvarez', birthDate: '22/04/2017', parents: 'Paula Álvarez / Sergio Martín', phone: '677999000' },
    { id: '11', name: 'Lucía Torres Pérez', birthDate: '11/05/2017', parents: 'Silvia Pérez / José Torres', phone: '688111222' }
  ],
  '3º Primaria': [
    { id: '12', name: 'Mario Ruiz Díaz', birthDate: '07/06/2016', parents: 'Teresa Díaz / Francisco Ruiz', phone: '688333444' },
    { id: '13', name: 'Nuria Soto López', birthDate: '19/07/2016', parents: 'Isabel López / Miguel Soto', phone: '688555666' }
  ],
  '4º Primaria': [
    { id: '14', name: 'Óscar Gil Martínez', birthDate: '03/08/2015', parents: 'Beatriz Martínez / Juan Gil', phone: '688777888' },
    { id: '15', name: 'Paula Calvo Rico', birthDate: '29/09/2015', parents: 'Cristina Rico / Álvaro Calvo', phone: '688999000' }
  ],
  '5º Primaria': [
    { id: '16', name: 'Raúl Moreno Vega', birthDate: '13/10/2014', parents: 'Elena Vega / Iván Moreno', phone: '699111222' },
    { id: '17', name: 'Sara Ortiz Cano', birthDate: '08/11/2014', parents: 'Alicia Cano / Gabriel Ortiz', phone: '699333444' }
  ],
  '6º Primaria': [
    { id: '18', name: 'Tomás Ramos Bravo', birthDate: '24/12/2013', parents: 'Marina Bravo / Víctor Ramos', phone: '699555666' },
    { id: '19', name: 'Valentina Cruz Serrano', birthDate: '16/01/2014', parents: 'Natalia Serrano / Eduardo Cruz', phone: '699777888' }
  ]
};
