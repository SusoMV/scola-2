
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Survey } from '@/hooks/useSurveys';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SurveyResponseDialogProps {
  survey: Survey;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (response: { userId: string; answer: string | string[] }) => void;
}

const SurveyResponseDialog: React.FC<SurveyResponseDialogProps> = ({
  survey,
  isOpen,
  onClose,
  onSubmit,
}) => {
  // For short answer
  const [shortAnswer, setShortAnswer] = useState('');
  // For multiple choice
  const [selectedOption, setSelectedOption] = useState('');
  
  // Mock user ID - in a real app, this would come from authentication
  // For anonymous surveys, use "anonymous" as the userId
  const mockUserId = survey.isAnonymous ? 'anonymous' : 'user-1';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (survey.responseType === 'short') {
      if (!shortAnswer.trim()) return;
      onSubmit({ userId: mockUserId, answer: shortAnswer });
    } else {
      if (!selectedOption) return;
      onSubmit({ userId: mockUserId, answer: selectedOption });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{survey.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {survey.isAnonymous && (
            <div className="bg-blue-50 text-blue-700 p-2 rounded-md text-sm mb-4">
              Esta é unha enquisa anónima. As súas respostas serán anónimas.
            </div>
          )}
          
          {survey.responseType === 'short' ? (
            <div className="space-y-2">
              <Label htmlFor="response">A súa resposta</Label>
              <Input 
                id="response" 
                value={shortAnswer} 
                onChange={(e) => setShortAnswer(e.target.value)} 
                placeholder="Escriba a súa resposta aquí"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Seleccione unha opción</Label>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {survey.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-scola-primary hover:bg-scola-primary-dark">
              Enviar resposta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyResponseDialog;
