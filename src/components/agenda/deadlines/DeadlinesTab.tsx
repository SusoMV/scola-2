
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeadlineCard } from './DeadlineCard';
import { CreateDeadlineDialog } from './CreateDeadlineDialog';
import { useDeadlines } from '@/hooks/useDeadlines';
import { Plus } from 'lucide-react';

export const DeadlinesTab: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addDeadline, addDocument, removeDocument, getOpenDeadlines, getClosedDeadlines } = useDeadlines();

  const handleAddDocument = (deadlineId: string, file: File) => {
    addDocument(deadlineId, {
      name: file.name,
      url: URL.createObjectURL(file),
    });
  };

  const openDeadlines = getOpenDeadlines();
  const closedDeadlines = getClosedDeadlines();

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg"> {/* Added white background and padding */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Prazos</h2>
        <Button 
          className="bg-[#0070C0] hover:bg-[#0070C0]/90" 
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Crear prazo
        </Button>
      </div>

      <div className="space-y-6">
        {openDeadlines.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Prazos abertos</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {openDeadlines.map((deadline) => (
                <DeadlineCard
                  key={deadline.id}
                  deadline={deadline}
                  onAddDocument={handleAddDocument}
                  onRemoveDocument={removeDocument}
                />
              ))}
            </div>
          </section>
        )}

        {closedDeadlines.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Prazos pechados</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {closedDeadlines.map((deadline) => (
                <DeadlineCard
                  key={deadline.id}
                  deadline={deadline}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <CreateDeadlineDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateDeadline={addDeadline}
      />
    </div>
  );
};
