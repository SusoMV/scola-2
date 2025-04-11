
import React from 'react';
import { ExternalLink, Edit, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface LinkCardProps {
  name: string;
  icon: React.ReactNode;
  link: string;
  external?: boolean;
  customAction?: boolean;
  onEdit?: () => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ 
  name, 
  icon, 
  link, 
  external = false, 
  customAction = false,
  onEdit
}) => {
  if (external) {
    if (customAction) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200 cursor-pointer">
              <div className="text-scola-primary mb-2">
                {icon}
              </div>
              <span className="text-xs text-center text-gray-700 line-clamp-2">{name}</span>
              <div className="flex items-center mt-1">
                <ExternalLink className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-400">Opcións</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => window.open(link, '_blank')} className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              <span>Ir á web</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar URL</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
        >
          <div className="text-scola-primary mb-2">
            {icon}
          </div>
          <span className="text-xs text-center text-gray-700 line-clamp-2">{name}</span>
          <ExternalLink className="h-3 w-3 text-gray-400 mt-1" />
        </a>
      );
    }
  } else {
    return (
      <Link 
        to={link}
        className="h-28 flex flex-col items-center justify-center p-2 border border-dashed border-scola-primary rounded-md hover:bg-scola-pastel hover:border-solid transition-all duration-200"
      >
        <div className="text-scola-primary mb-2">
          {icon}
        </div>
        <span className="text-xs text-center text-gray-700 line-clamp-2">{name}</span>
      </Link>
    );
  }
};

export default LinkCard;
