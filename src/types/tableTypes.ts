export interface Data {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tags: string;
  dueDate: string;
  createdAt: string;
  name: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data | 'action';
  label: string;
  numeric: boolean;
}