export interface Task {
  completed: boolean;
  id: number;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  created_at: string;
}

export enum priorityLabels {
  lowest = 'Lowest',
  low = 'Low',
  medium = 'Medium',
  high = 'High',
  highest = 'Highest'
}