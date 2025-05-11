
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { Survey } from '@/hooks/useSurveys';

interface CreateSurveyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (survey: Omit<Survey, 'id' | 'createdAt'>) => void;
}

const CreateSurveyDialog: React.FC<CreateSurveyDialogProps> = ({ 
  isOpen, 
  onClose,
  onSave 
}) => {
  const [title, setTitle] = useState('');
  const [responseType, setResponseType] = useState<'short' | 'multiple'>('short');
  const [options, setOptions] = useState<string[]>(['']);
  const [deadline, setDeadline] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!title) {
      return;
    }

    const filteredOptions = responseType === 'multiple'
      ? options.filter(option => option.trim() !== '')
      : undefined;

    onSave({
      title,
      responseType,
      options: filteredOptions,
      deadline: new Date(deadline)
    });
    
    // Reset form
    setTitle('');
    setResponseType('short');
    setOptions(['']);
    setDeadline('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova enquisa</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Tipo de resposta
            </Label>
            <div className="col-span-3">
              <RadioGroup 
                value={responseType} 
                onValueChange={(value) => {
                  setResponseType(value as 'short' | 'multiple');
                  if (value === 'multiple' && options.length === 0) {
                    setOptions(['']);
                  }
                }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Resposta curta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <Label htmlFor="multiple">Resposta múltiple</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {responseType === 'multiple' && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Opcións
              </Label>
              <div className="col-span-3 space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Opción ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                      disabled={options.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddOption}
                  size="sm"
                >
                  Engadir opción
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Data límite
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!title || !deadline}>
            Gardar enquisa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyDialog;
