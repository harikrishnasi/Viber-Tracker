import React from 'react';
import { Habit, HabitType } from '../types';
import { AVAILABLE_ICONS } from '../constants';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onResetAttempt: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onResetAttempt }) => {
  const isGood = habit.type === HabitType.GOOD;
  const iconData = AVAILABLE_ICONS.find(i => i.key === habit.iconName) || AVAILABLE_ICONS[0];
  
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.lastLogDate === today;

  // Visual Styles
  const cardBg = isGood 
    ? 'bg-m3-good text-m3-onGood dark:bg-m3-dark-goodContainer dark:text-m3-dark-onGoodContainer' 
    : 'bg-m3-bad text-m3-onBad dark:bg-m3-dark-badContainer dark:text-m3-dark-onBadContainer';
    
  const buttonBg = isGood 
    ? (isCompletedToday 
        ? 'bg-m3-onGood text-white dark:bg-m3-dark-onGoodContainer dark:text-m3-dark-goodContainer' 
        : 'bg-white/50 text-m3-onGood hover:bg-white/80 dark:bg-black/20 dark:text-m3-dark-onGoodContainer dark:hover:bg-black/40')
    : (isCompletedToday 
        ? 'bg-m3-good text-m3-onGood dark:bg-zinc-500 dark:text-white' 
        : 'bg-white/10 text-white hover:bg-white/20 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10');

  const iconBg = isGood
    ? 'bg-white/20 dark:bg-black/20'
    : 'bg-white/20 dark:bg-white/10';

  return (
    <div className={`p-5 rounded-3xl shadow-sm mb-4 transition-all duration-300 ${cardBg} flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className={`text-3xl p-3 rounded-2xl backdrop-blur-sm ${iconBg}`}>
          {iconData.emoji}
        </div>
        <div>
          <h3 className="font-semibold text-lg leading-tight">{habit.title}</h3>
          <div className="flex items-center gap-1 opacity-80 text-sm mt-1">
            <span>🔥 {habit.currentStreak} day streak</span>
            {habit.bestStreak > 0 && <span className="text-xs ml-2">(Best: {habit.bestStreak})</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* For BAD habits, we need a separate "Relapse" button if the user has a streak > 0 */}
        {!isGood && habit.currentStreak > 0 && !isCompletedToday && (
           <button
             onClick={() => onResetAttempt(habit.id)}
             className="p-3 rounded-xl bg-red-500/20 text-red-200 dark:text-red-300 hover:bg-red-500/40 transition-colors"
             aria-label="I Slipped Up"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
           </button>
        )}

        {/* Main Check-in Button */}
        <button
          onClick={() => isCompletedToday ? null : onToggle(habit.id)}
          disabled={isCompletedToday}
          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${buttonBg} ${isCompletedToday ? 'opacity-90 cursor-default scale-95' : 'active:scale-90 shadow-md'}`}
        >
          {isCompletedToday ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default HabitCard;