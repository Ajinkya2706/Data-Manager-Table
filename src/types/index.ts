export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: string | number;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  order: number;
}

export type SortOrder = 'asc' | 'desc';