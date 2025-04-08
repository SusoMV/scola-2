
import React from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface HeaderProps {
  isDirector: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDirector }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronsLeftRight className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Substitucións</h1>
        </div>
      </div>
      <div className="dotted-border w-full h-1 mt-2"></div>
    </div>
  );
};

export default Header;
