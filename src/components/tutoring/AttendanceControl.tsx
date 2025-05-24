
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AddAbsenceDialog from './attendance/AddAbsenceDialog';
import AbsencesTable from './attendance/AbsencesTable';
import { Absence } from './attendance/types';

const AttendanceControl = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);

  const handleAddAbsence = (newAbsence: Absence) => {
    setAbsences([...absences, newAbsence]);
  };

  const toggleJustified = (absenceId: number) => {
    setAbsences(absences.map(absence => 
      absence.id === absenceId 
        ? { ...absence, justified: !absence.justified }
        : absence
    ));
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Control de asistencia</h2>
          <AddAbsenceDialog onAddAbsence={handleAddAbsence} />
        </div>

        <AbsencesTable 
          absences={absences} 
          onToggleJustified={toggleJustified} 
        />
      </CardContent>
    </Card>
  );
};

export default AttendanceControl;
