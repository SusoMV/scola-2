import React from 'react';
import { Calendar } from 'lucide-react';
import { Substitution } from '@/types/substitutions';
import { Button } from '@/components/ui/button';
interface UpcomingAbsencesSectionProps {
  upcomingAbsences: Substitution[];
  onDelete: (id: string) => void;
  isMobile?: boolean;
}
const UpcomingAbsencesSection: React.FC<UpcomingAbsencesSectionProps> = ({
  upcomingAbsences,
  onDelete,
  isMobile
}) => {
  if (!upcomingAbsences || upcomingAbsences.length === 0) return null;
  return;
};
export default UpcomingAbsencesSection;