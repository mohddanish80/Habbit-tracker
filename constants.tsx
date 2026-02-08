
import { Category, Habit } from './types';

export const CATEGORIES: Category[] = [
  { id: 'health', name: 'Health', icon: 'favorite', color: '#ff8fa3', bgColor: '#ffebef' },
  { id: 'mind', name: 'Mind', icon: 'self_improvement', color: '#60A5FA', bgColor: '#e3f2fd' },
  { id: 'growth', name: 'Growth', icon: 'eco', color: '#86EFAC', bgColor: '#f1f8e9' },
  { id: 'social', name: 'Social', icon: 'group', color: '#FDBA74', bgColor: '#fff3e0' },
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Meditation',
    category: 'mind',
    icon: 'self_improvement',
    color: '#7c3aed',
    bgColor: '#e9d5ff',
    frequency: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    completedDays: [true, true, true, true, true, true, true],
    streak: 63,
    successRate: 100,
  },
  {
    id: '2',
    name: 'Water Intake',
    category: 'health',
    icon: 'water_drop',
    color: '#0284c7',
    bgColor: '#bae6fd',
    frequency: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    completedDays: [true, true, false, true, true, false, true],
    streak: 5,
    successRate: 85,
  },
  {
    id: '3',
    name: 'Gym Session',
    category: 'health',
    icon: 'fitness_center',
    color: '#ea580c',
    bgColor: '#ffedd5',
    frequency: ['M', 'W', 'F'],
    completedDays: [true, false, true, false, false, false, false],
    streak: 2,
    successRate: 66,
  },
];
