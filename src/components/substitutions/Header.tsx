
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
      <div className="w-full h-[2px] mt-2 border-b border-dashed border-blue-300"></div>
    </div>
  );
};

export default Header;
