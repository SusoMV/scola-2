
import { useState } from 'react';
import { format } from 'date-fns';
import { Substitution } from '@/types/substitutions';

export const useSubstitutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [substitutions, setSubstitutions] = useState<Substitution[]>([
    {
      id: '1',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-04-04',
      status: 'active',
      specialty: 'Matemáticas'
    },
    {
      id: '2',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: false,
      date: '2025-04-04',
      status: 'active',
      specialty: 'Lingua'
    },
    {
      id: '3',
      absentTeacher: 'David Martínez',
      substituteTeacher: 'Pablo Sánchez',
      course: '5º Primaria',
      time: '12:30 - 14:30',
      reason: 'Persoal',
      seen: false,
      date: '2025-04-04',
      status: 'active',
      specialty: 'Inglés'
    }
  ]);
  
  const [historicalSubstitutions, setHistoricalSubstitutions] = useState<Substitution[]>([
    {
      id: '4',
      absentTeacher: 'Carlos Rodríguez',
      substituteTeacher: 'María López',
      course: '4º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-30',
      status: 'completed',
      specialty: 'Matemáticas'
    },
    {
      id: '5',
      absentTeacher: 'Lucía Fernández',
      substituteTeacher: 'Ana García',
      course: '2º Primaria',
      time: '11:30 - 13:30',
      reason: 'Formación',
      seen: true,
      date: '2025-03-28',
      status: 'completed',
      specialty: 'Lingua'
    },
    {
      id: '6',
      absentTeacher: 'Manuel Torres',
      substituteTeacher: 'Elena Rivas',
      course: '1º Primaria',
      time: '10:00 - 12:00',
      reason: 'Enfermidade',
      seen: true,
      date: '2025-03-25',
      status: 'completed',
      specialty: 'Relixión'
    },
    {
      id: '7',
      absentTeacher: 'Sara López',
      substituteTeacher: 'Pablo Sánchez',
      course: '6º Primaria',
      time: '09:00 - 11:00',
      reason: 'Cita médica',
      seen: true,
      date: '2025-03-20',
      status: 'completed',
      specialty: 'Educación Física'
    }
  ]);

  const handleToggleSeen = (id: string) => {
    setSubstitutions(substitutions.map(sub => 
      sub.id === id ? { ...sub, seen: !sub.seen } : sub
    ));
  };

  const handleSubmitSubstitution = (data: any) => {
    const newSubstitution: Substitution = {
      id: Date.now().toString(),
      absentTeacher: data.absentTeacher,
      substituteTeacher: data.substituteTeacher,
      course: data.course,
      time: `${data.startTime} - ${data.endTime}`,
      reason: data.reason,
      seen: false,
      date: data.date,
      status: data.date === format(new Date(), 'yyyy-MM-dd') ? 'active' : 'completed',
      specialty: data.specialty
    };

    if (data.date === format(new Date(), 'yyyy-MM-dd')) {
      setSubstitutions([...substitutions, newSubstitution]);
    } else {
      setHistoricalSubstitutions([...historicalSubstitutions, newSubstitution]);
    }
  };

  const getFilteredHistoricalSubstitutions = () => {
    return historicalSubstitutions.filter(sub => {
      const searchLower = searchQuery.toLowerCase();
      return (
        sub.absentTeacher.toLowerCase().includes(searchLower) || 
        sub.substituteTeacher.toLowerCase().includes(searchLower) || 
        sub.course.toLowerCase().includes(searchLower) || 
        sub.date.includes(searchQuery) || 
        sub.reason.toLowerCase().includes(searchLower) ||
        (sub.specialty && sub.specialty.toLowerCase().includes(searchLower))
      );
    });
  };

  // Sample data for the form
  const absentTeachers = ['Carlos Rodríguez', 'Lucía Fernández', 'David Martínez', 'Sara López', 'Manuel Torres'];
  const substituteTeachers = ['María López', 'Ana García', 'Pablo Sánchez', 'Elena Rivas'];

  return {
    substitutions,
    historicalSubstitutions,
    searchQuery,
    setSearchQuery,
    handleToggleSeen,
    handleSubmitSubstitution,
    getFilteredHistoricalSubstitutions,
    absentTeachers,
    substituteTeachers
  };
};
