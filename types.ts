
export enum HabitType {
  GOOD = 'GOOD',
  BAD = 'BAD'
}

export interface Habit {
  id: string;
  title: string;
  type: HabitType;
  currentStreak: number;
  bestStreak: number;
  lastLogDate: string | null; // ISO Date String YYYY-MM-DD
  iconName: string;
  creationDate: string;
}

export interface Quote {
  text: string;
  author: string;
}

export type IconKey = 'gym' | 'water' | 'book' | 'sun' | 'moon' | 'smoke' | 'phone' | 'fastfood' | 'game' | 'beer' | 'social' | 'brain' | 'money' | 'clean' | 'code';
