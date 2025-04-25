
import { useState } from 'react';
import { Deadline, DeadlineDocument } from '@/types/deadlines';

export const useDeadlines = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  const addDeadline = (deadline: Omit<Deadline, 'id' | 'documents'>) => {
    const newDeadline: Deadline = {
      ...deadline,
      id: Date.now().toString(),
      documents: [],
    };
    setDeadlines([...deadlines, newDeadline]);
  };

  const addDocument = (deadlineId: string, document: Omit<DeadlineDocument, 'id' | 'deadlineId' | 'uploadedAt'>) => {
    setDeadlines(deadlines.map(deadline => {
      if (deadline.id === deadlineId) {
        return {
          ...deadline,
          documents: [...deadline.documents, {
            ...document,
            id: Date.now().toString(),
            deadlineId,
            uploadedAt: new Date(),
          }],
        };
      }
      return deadline;
    }));
  };

  const removeDocument = (deadlineId: string, documentId: string) => {
    setDeadlines(deadlines.map(deadline => {
      if (deadline.id === deadlineId) {
        return {
          ...deadline,
          documents: deadline.documents.filter(doc => doc.id !== documentId),
        };
      }
      return deadline;
    }));
  };

  const getOpenDeadlines = () => 
    deadlines.filter(deadline => new Date(deadline.endDate) > new Date());

  const getClosedDeadlines = () => 
    deadlines.filter(deadline => new Date(deadline.endDate) <= new Date());

  return {
    deadlines,
    addDeadline,
    addDocument,
    removeDocument,
    getOpenDeadlines,
    getClosedDeadlines,
  };
};
