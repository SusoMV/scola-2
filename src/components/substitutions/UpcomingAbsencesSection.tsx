
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

  return (
    <section
      className={`mb-6 rounded-lg border-2 border-dashed border-[#9b87f5] bg-[#E5DEFF] shadow-md ${
        isMobile ? 'p-2' : 'p-4'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className={isMobile ? "h-4 w-4 text-[#9b87f5]" : "h-5 w-5 text-[#9b87f5]"} />
        <h2 className={isMobile ? "text-base font-semibold" : "text-lg font-semibold"}>Próximas ausencias</h2>
      </div>
      <ul className="space-y-2">
        {upcomingAbsences.map((absence) => (
          <li key={absence.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-md px-3 py-2 shadow group">
            <div className="flex items-center gap-4 flex-1">
              <span className="font-bold text-[#1A1F2C]">{absence.absentTeacher}</span>
              <span className="text-[#8E9196]">{absence.date}</span>
              <span className="text-[#8E9196]">{absence.course}</span>
              <span className="text-[#8E9196] hidden md:inline">{absence.time}</span>
              <span className="text-[#8E9196] hidden md:inline">{absence.specialty}</span>
              <span className="ml-2 text-[#8E9196]">{absence.reason}</span>
              <span className="ml-2 font-semibold text-[#9b87f5]">{absence.substituteTeacher}</span>
            </div>
            <Button
              variant="destructive"
              className={`ml-0 md:ml-3 mt-2 md:mt-0 w-fit`}
              size="sm"
              onClick={() => onDelete(absence.id)}
            >
              Borrar
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingAbsencesSection;
