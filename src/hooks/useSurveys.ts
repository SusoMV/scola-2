
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface SurveyResponse {
  id: string;
  userId: string;
  answer: string | string[];
  createdAt: Date;
}

export interface Survey {
  id: string;
  title: string;
  responseType: 'short' | 'multiple';
  options?: string[];
  deadline: Date;
  createdAt: Date;
  isAnonymous: boolean;
  responses: SurveyResponse[];
}

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>(() => {
    const savedSurveys = localStorage.getItem('surveys');
    return savedSurveys ? JSON.parse(savedSurveys) : [];
  });

  useEffect(() => {
    localStorage.setItem('surveys', JSON.stringify(surveys));
  }, [surveys]);

  const addSurvey = (survey: Omit<Survey, 'id' | 'createdAt' | 'responses'>) => {
    const newSurvey: Survey = {
      ...survey,
      id: Date.now().toString(),
      createdAt: new Date(),
      isAnonymous: survey.isAnonymous || false,
      responses: []
    };
    
    setSurveys(prev => [...prev, newSurvey]);
    toast.success('Enquisa creada con éxito');
    return newSurvey;
  };

  const deleteSurvey = (id: string) => {
    setSurveys(prev => prev.filter(survey => survey.id !== id));
    toast.success('Enquisa eliminada con éxito');
  };

  const addResponse = (surveyId: string, response: Omit<SurveyResponse, 'id' | 'createdAt'>) => {
    setSurveys(prev => 
      prev.map(survey => {
        if (survey.id === surveyId) {
          const newResponse = {
            ...response,
            id: Date.now().toString(),
            createdAt: new Date()
          };
          return {
            ...survey,
            responses: [...survey.responses, newResponse]
          };
        }
        return survey;
      })
    );
    toast.success('Resposta enviada con éxito');
  };

  return {
    surveys,
    addSurvey,
    deleteSurvey,
    addResponse
  };
};
