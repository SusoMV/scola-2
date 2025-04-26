
export interface Team {
  id: string;
  name: string;
  coordinator: string;
  members: string[];
  isDefault?: boolean;
}
