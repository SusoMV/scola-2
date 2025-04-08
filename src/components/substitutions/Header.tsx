
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsLeftRight, Plus } from 'lucide-react';

interface HeaderProps {
  openCreateDialog: () => void;
  isDirector: boolean;
}

const Header: React.FC<HeaderProps> = ({ openCreateDialog, isDirector }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronsLeftRight className="h-6 w-6 text-scola-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Substitucións</h1>
        </div>
        
        {isDirector && (
          <Button className="bg-scola-primary hover:bg-scola-primary/90" onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Crear Ausencia
          </Button>
        )}
      </div>
      <div className="dotted-border w-full h-1 mt-2"></div>
    </div>
  );
};

export default Header;
