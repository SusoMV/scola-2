
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Survey {
  id: string;
  title: string;
  responseType: 'short' | 'multiple';
  options?: string[];
  deadline: Date;
  createdAt: Date;
}

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>(() => {
    const savedSurveys = localStorage.getItem('surveys');
    return savedSurveys ? JSON.parse(savedSurveys) : [];
  });

  useEffect(() => {
    localStorage.setItem('surveys', JSON.stringify(surveys));
  }, [surveys]);

  const addSurvey = (survey: Omit<Survey, 'id' | 'createdAt'>) => {
    const newSurvey: Survey = {
      ...survey,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setSurveys(prev => [...prev, newSurvey]);
    toast.success('Enquisa creada con éxito');
    return newSurvey;
  };

  const deleteSurvey = (id: string) => {
    setSurveys(prev => prev.filter(survey => survey.id !== id));
    toast.success('Enquisa eliminada con éxito');
  };

  return {
    surveys,
    addSurvey,
    deleteSurvey
  };
};
