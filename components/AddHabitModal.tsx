import React, { useState } from 'react';
import { HabitType, IconKey } from '../types';
import { AVAILABLE_ICONS } from '../constants';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, type: HabitType, icon: IconKey) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<HabitType>(HabitType.GOOD);
  const [selectedIcon, setSelectedIcon] = useState<IconKey>('gym');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, type, selectedIcon);
    // Reset form
    setTitle('');
    setType(HabitType.GOOD);
    setSelectedIcon('gym');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl animate-[slideUp_0.3s_ease-out] transition-colors duration-300">
        <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">New Habit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Run"
              autoFocus
              className="w-full text-lg border-b-2 border-gray-200 dark:border-gray-700 py-2 focus:outline-none focus:border-m3-primary dark:focus:border-m3-dark-primary bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Type</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setType(HabitType.GOOD)}
                className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
                  type === HabitType.GOOD 
                    ? 'border-m3-good bg-m3-good/30 text-m3-onGood dark:border-m3-dark-goodContainer dark:bg-m3-dark-goodContainer dark:text-m3-dark-onGoodContainer' 
                    : 'border-gray-100 dark:border-zinc-800 text-gray-400 dark:text-zinc-600'
                }`}
              >
                Good Habit
              </button>
              <button
                type="button"
                onClick={() => setType(HabitType.BAD)}
                className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
                  type === HabitType.BAD 
                    ? 'border-m3-bad bg-m3-bad/10 text-m3-bad dark:border-m3-dark-badContainer dark:bg-m3-dark-badContainer dark:text-m3-dark-onBadContainer' 
                    : 'border-gray-100 dark:border-zinc-800 text-gray-400 dark:text-zinc-600'
                }`}
              >
                Bad Habit
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Icon</label>
            <div className="grid grid-cols-5 gap-3">
              {AVAILABLE_ICONS.map((icon) => (
                <button
                  key={icon.key}
                  type="button"
                  onClick={() => setSelectedIcon(icon.key)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedIcon === icon.key
                      ? 'bg-m3-primary dark:bg-m3-dark-primary text-white scale-110 shadow-lg'
                      : 'bg-gray-50 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  {icon.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!title.trim()}
              className="w-full py-4 rounded-xl bg-m3-primary dark:bg-m3-dark-primary text-white dark:text-black font-bold shadow-lg hover:bg-m3-primary/90 dark:hover:bg-m3-dark-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;