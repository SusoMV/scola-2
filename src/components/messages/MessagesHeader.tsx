
import React from 'react';
import { Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MessagesHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Mensaxes</h1>
        </div>
      </div>
      <div className="w-full h-px mt-4 bg-gray-200" style={{
        backgroundImage: 'repeating-linear-gradient(to right, #0070C0, #0070C0 8px, transparent 8px, transparent 16px)'
      }}></div>
    </div>
  );
};

export default MessagesHeader;
