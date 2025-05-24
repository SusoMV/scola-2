
export interface Absence {
  id: number;
  studentId: number;
  studentName: string;
  date: Date;
  startTime: string;
  endTime: string;
  justified: boolean;
}
