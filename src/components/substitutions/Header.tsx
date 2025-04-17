
import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface HeaderProps {
  isDirector: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDirector }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <ArrowLeftRight className="h-6 w-6 text-[#0070C0]" />
        <h1 className="text-2xl font-bold text-gray-900">Substitucións</h1>
      </div>
      <div className="dotted-border w-full h-1 mt-2"></div>
    </div>
  );
};

export default Header;
