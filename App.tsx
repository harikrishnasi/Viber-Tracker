
import React, { useState, useEffect } from 'react';
import { Habit, HabitType, IconKey } from './types';
import { STOIC_QUOTES } from './constants';
import * as StorageService from './services/storage';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import InterventionModal from './components/InterventionModal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Intervention State
  const [interventionHabitId, setInterventionHabitId] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState(STOIC_QUOTES[0]);

  // Initial Load
  useEffect(() => {
    const loadedHabits = StorageService.loadHabits();
    setHabits(loadedHabits);

    const loadedTheme = StorageService.loadTheme();
    setIsDarkMode(loadedTheme);
  }, []);

  // Theme Effect
  useEffect(() => {
    StorageService.saveTheme(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#121212';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FDF8F6';
    }
  }, [isDarkMode]);

  // Save Habits on change
  useEffect(() => {
    StorageService.saveHabits(habits);
  }, [habits]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const addHabit = (title: string, type: HabitType, iconName: IconKey) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      type,
      currentStreak: 0,
      bestStreak: 0,
      lastLogDate: null,
      iconName,
      creationDate: new Date().toISOString()
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  const importHabits = (importedHabits: Habit[]) => {
    setHabits(importedHabits);
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;

      const isDoneToday = h.lastLogDate === today;
      if (isDoneToday) return h; 

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const isContinuous = h.lastLogDate === yesterdayStr;
      
      let newStreak = isContinuous || h.lastLogDate === null ? h.currentStreak + 1 : 1;

      return {
        ...h,
        currentStreak: newStreak,
        bestStreak: Math.max(h.bestStreak, newStreak),
        lastLogDate: today
      };
    }));
  };

  const initiateResetIntervention = (id: string) => {
    const quote = STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];
    setRandomQuote(quote);
    setInterventionHabitId(id);
  };

  const confirmReset = () => {
    if (!interventionHabitId) return;

    setHabits(prev => prev.map(h => {
      if (h.id !== interventionHabitId) return h;
      return {
        ...h,
        currentStreak: 0,
        lastLogDate: new Date().toISOString().split('T')[0] 
      };
    }));
    setInterventionHabitId(null);
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative bg-[#FDF8F6] dark:bg-[#121212] transition-colors duration-300">
      {/* Header */}
      <header className="px-6 py-8 sticky top-0 z-10 bg-[#FDF8F6]/80 dark:bg-[#121212]/80 backdrop-blur-md flex justify-between items-start transition-colors duration-300">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Vibe Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm transition-colors">Design your lifestyle.</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all"
            aria-label="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Habit List */}
      <main className="px-6">
        {habits.length === 0 ? (
          <div className="text-center mt-20 opacity-50 dark:text-gray-400">
            <div className="text-6xl mb-4">🌱</div>
            <p>No vibes yet.</p>
            <p className="text-sm mt-2">Add a habit to get started.</p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              onToggle={toggleHabit}
              onResetAttempt={initiateResetIntervention}
            />
          ))
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-6 h-14 w-14 bg-m3-primary dark:bg-m3-dark-primary text-white dark:text-m3-onPrimary rounded-2xl shadow-xl shadow-m3-primary/30 dark:shadow-none flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
        aria-label="Add Habit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>

      {/* Modals */}
      <AddHabitModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={addHabit} 
      />

      <InterventionModal
        isOpen={!!interventionHabitId}
        quote={randomQuote}
        onCancel={() => setInterventionHabitId(null)}
        onConfirmReset={confirmReset}
      />
      
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        habits={habits}
        onImport={importHabits}
      />
    </div>
  );
};

export default App;
