
export enum ViewType {
  TODAY = 'today',
  WEEKLY = 'weekly',
  OVERALL = 'overall'
}

export interface Habit {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  bgColor: string;
  frequency: string[]; // ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  completedDays: boolean[]; // 7 elements
  streak: number;
  successRate: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}
