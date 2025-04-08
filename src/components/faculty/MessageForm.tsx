
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define emoji categories and common emojis
const emojiOptions = [
  { emoji: '😊', category: 'smileys' },
  { emoji: '😂', category: 'smileys' },
  { emoji: '❤️', category: 'symbols' },
  { emoji: '👍', category: 'people' },
  { emoji: '👋', category: 'people' },
  { emoji: '🎉', category: 'celebration' },
  { emoji: '👏', category: 'people' },
  { emoji: '🙏', category: 'people' },
  { emoji: '😍', category: 'smileys' },
  { emoji: '🤔', category: 'smileys' },
  { emoji: '👀', category: 'people' },
  { emoji: '🔥', category: 'symbols' },
  { emoji: '✅', category: 'symbols' },
  { emoji: '⭐', category: 'symbols' },
  { emoji: '😎', category: 'smileys' },
  { emoji: '🤗', category: 'smileys' },
];

const MAX_MESSAGE_LENGTH = 500;

interface MessageFormProps {
  recipient: {
    id: string;
    name: string;
  } | null;
  onSubmit: (data: { content: string }) => void;
  onCancel: () => void;
}

const MessageForm = ({ recipient, onSubmit, onCancel }: MessageFormProps) => {
  const [characterCount, setCharacterCount] = useState(0);
  
  const form = useForm({
    defaultValues: {
      content: ''
    }
  });

  const content = form.watch('content') || '';

  const handleEmojiClick = (emoji: string) => {
    const currentValue = form.getValues('content') || '';
    const newValue = currentValue + emoji;
    
    if (newValue.length <= MAX_MESSAGE_LENGTH) {
      form.setValue('content', newValue);
      setCharacterCount(newValue.length);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharacterCount(value.length);
    
    if (value.length <= MAX_MESSAGE_LENGTH) {
      form.setValue('content', value);
    }
  };

  const handleSubmit = (data: { content: string }) => {
    onSubmit(data);
    form.reset();
    setCharacterCount(0);
  };

  const isOverLimit = characterCount > MAX_MESSAGE_LENGTH;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Para:</p>
          <p className="font-medium">{recipient?.name}</p>
        </div>
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaxe</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Escribe a túa mensaxe..." 
                    className="min-h-[100px] pr-10"
                    onChange={handleContentChange}
                    value={content.substring(0, MAX_MESSAGE_LENGTH)}
                  />
                </FormControl>
                <div className="absolute bottom-2 right-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                      >
                        <Smile className="h-5 w-5 text-gray-500 hover:text-scola-primary" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2" align="end">
                      <div className="grid grid-cols-6 gap-2">
                        {emojiOptions.map((option) => (
                          <button
                            key={option.emoji}
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer text-lg"
                            onClick={() => handleEmojiClick(option.emoji)}
                          >
                            {option.emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className={`text-xs text-right mt-1 ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                {characterCount}/{MAX_MESSAGE_LENGTH}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={content.trim() === '' || isOverLimit}
          >
            Enviar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MessageForm;
