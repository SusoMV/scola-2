
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ icon: Icon, children, className }: SectionTitleProps) => {
  return (
    <h3 className={cn("flex items-center text-lg font-medium", className)}>
      <Icon className="h-5 w-5 mr-2 text-scola-primary" />
      <span>{children}</span>
    </h3>
  );
};

export default SectionTitle;
