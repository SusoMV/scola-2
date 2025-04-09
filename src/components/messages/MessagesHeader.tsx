
import React from 'react';
import { Mail } from 'lucide-react';

const MessagesHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold">Mensaxes</h1>
        </div>
      </div>
      <div className="dotted-border w-full h-1 mt-2"></div>
    </div>
  );
};

export default MessagesHeader;
