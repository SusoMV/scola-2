
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Survey } from '@/hooks/useSurveys';

interface CreateSurveyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (survey: Omit<Survey, 'id' | 'createdAt' | 'responses'>) => Survey;
}

const CreateSurveyDialog: React.FC<CreateSurveyDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [responseType, setResponseType] = useState<'short' | 'multiple'>('short');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [deadlineStr, setDeadlineStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const addOption = () => {
    setOptions([...options, '']);
  };
  
  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const newSurvey = {
      title: title.trim(),
      responseType,
      options: responseType === 'multiple' ? options.filter(opt => opt.trim() !== '') : undefined,
      deadline: new Date(deadlineStr),
      isAnonymous,
      responses: []
    };
    
    onSave(newSurvey);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setTitle('');
    setResponseType('short');
    setOptions(['', '']);
    setDeadline(new Date());
    setDeadlineStr(new Date().toISOString().split('T')[0]);
    setIsAnonymous(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nova enquisa</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da enquisa</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Escriba o título da enquisa aquí"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tipo de resposta</Label>
            <RadioGroup value={responseType} onValueChange={(value) => setResponseType(value as 'short' | 'multiple')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="short" />
                <Label htmlFor="short">Resposta curta</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple">Resposta múltiple (escoller unha opción)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {responseType === 'multiple' && (
            <div className="space-y-2">
              <Label>Opcións de resposta</Label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      value={option} 
                      onChange={(e) => handleOptionChange(index, e.target.value)} 
                      placeholder={`Opción ${index + 1}`}
                      required
                    />
                    {options.length > 2 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeOption(index)}
                      >
                        X
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addOption}
                  className="w-full mt-2"
                >
                  Engadir opción
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="deadline">Data límite</Label>
            <Input 
              id="deadline" 
              type="date" 
              value={deadlineStr} 
              onChange={(e) => setDeadlineStr(e.target.value)} 
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            />
            <Label htmlFor="anonymous" className="cursor-pointer">
              Enquisa anónima
            </Label>
          </div>
          
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-scola-primary hover:bg-scola-primary-dark">
              Gardar enquisa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyDialog;
