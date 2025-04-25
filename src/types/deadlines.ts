
export interface Deadline {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isRequired: boolean;
  documents: DeadlineDocument[];
}

export interface DeadlineDocument {
  id: string;
  name: string;
  url: string;
  deadlineId: string;
  uploadedAt: Date;
}
