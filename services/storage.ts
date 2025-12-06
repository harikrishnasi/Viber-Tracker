import { Habit } from '../types';

const STORAGE_KEY = 'vibe_tracker_habits_v1';
const THEME_KEY = 'vibe_tracker_theme_v1';

export const saveHabits = (habits: Habit[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (e) {
    console.error("Failed to save habits", e);
  }
};

export const loadHabits = (): Habit[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load habits", e);
    return [];
  }
};

export const saveTheme = (isDark: boolean) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
  } catch (e) {
    console.error("Failed to save theme", e);
  }
};

export const loadTheme = (): boolean => {
  try {
    const data = localStorage.getItem(THEME_KEY);
    // Default to false (light mode) if nothing saved
    // Or we could check window.matchMedia('(prefers-color-scheme: dark)').matches
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false;
  }
};